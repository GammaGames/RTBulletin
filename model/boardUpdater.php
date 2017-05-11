<?php
    class BoardUpdater
    {
        const key = 'GET_YOUR_OWN_KEY';
        const channels = [['UCzH3iADRIq1IJlIXjfNgTpA', 'Rooster Teeth'],
                    ['UCkxctb0jr8vwa4Do6c6su0Q', 'LetsPlay'],
                    ['UCsB0LwkHPWyjfZ-JwvtwEXw', 'Achievement Hunter'],
                    ['UCboMX_UNgaPBsUOIgasn3-Q', 'Funhaus'],
                    ['UC4w_tMnHl6sw5VD93tVymGw', 'The Know'],
                    ['UCmYBTQilY7p8EQ9IsyA3oLw', 'Cow Chop']/*,
                    ['UCWDIL65Y3kHmLjfp_0ZrpfQ', 'Game Attack'],
                    ['UCB9_VH_CNbbH4GfKu8qh63w', 'ScrewAttack']*/
                    ];
        public $ytresults;
        public $redditResultsRT;
        public $redditResultsCC;

        function getLength($videoId) {
                $length = '';
                $ch = curl_init("https://www.googleapis.com/youtube/v3/videos?part=contentDetails&id=$videoId&key=".self::key);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                $youtube = curl_exec($ch);
                curl_close($ch);
                $result = json_decode($youtube, true);

                $str = $result['items'][0]['contentDetails']['duration'];
                $hr = "00";
                $min = "00";
                $sec = "00";
                $time = substr($str, 2);

                if(strpos($time, "H")) {
                    $tmp = preg_split("/H/", $time); 
                    $hr = $tmp[0];
                    $time = $tmp[1];
                }
                if(strpos($time, "M")) {
                    $tmp = preg_split("/M/", $time); 
                    $min = $tmp[0];
                    $time = $tmp[1];
                }
                if(strpos($time, "S")) {
                    $tmp = preg_split("/S/", $time);
                    if((int)$tmp[0] > 30)
                        $min++;
                }
                if($hr != 0)
                    return $hr.'hr, '.$min.'min';
                else
                    return $min.'min';
        }

        function getRedditJson() {
            $ch = curl_init("https://www.reddit.com/user/rt_video_bot/submitted.json?limit=100&t=week");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $reddit = curl_exec($ch);
            curl_close($ch);
            $this->redditResultsRT = json_decode($reddit, true)['data']['children'];

            $ch = curl_init("https://www.reddit.com/user/cowchopbot/submitted.json?limit=100&t=week");
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
            $reddit = curl_exec($ch);
            curl_close($ch);
            $this->redditResultsCC = json_decode($reddit, true)['data']['children'];
        }

        function getRedditLink($videoId, $channelId) {
            if($this->redditResultsRT == NULL)
                $this->getRedditJson();

            $url = 'https://www.reddit.com';

            switch($channelId) {
                case 'UC4w_tMnHl6sw5VD93tVymGw': //know
                    return '-1';
                    break;
                case 'UCboMX_UNgaPBsUOIgasn3-Q': //fh
                    foreach($this->redditResultsRT as $submission) {
                        if($submission['data']['subreddit'] == 'funhaus' && preg_match("/.*$videoId/", $submission['data']['url'])) {
                                return $url.$submission['data']['permalink'];
                            }
                        }
                    break;
                case 'UCmYBTQilY7p8EQ9IsyA3oLw': //cc
                    foreach($this->redditResultsCC as $submission) {
                        if(preg_match("/.*$videoId/", $submission['data']['url'])) {
                                return $url.$submission['data']['permalink'];
                            }
                        }
                    break;
                default:
                    foreach($this->redditResultsRT as $submission) {
                        if($submission['data']['subreddit'] == 'roosterteeth' && preg_match("/.*$videoId/", $submission['data']['url'])) {
                                return $url.$submission['data']['permalink'];
                            }
                        }
                    return '-1';
                    break;
            }
        }

        function insertChannels() {
            $query = '';
            foreach(self::channels as $channel) {
                $query.="INSERT INTO Channel(channelId, channelName) VALUES('$channel[0]', '$channel[1]');";
            }
            $db->exec($query);
            
            /*CREATE TABLE `Video` (
                `videoId` varchar(32) NOT NULL DEFAULT '',
                `channelId` varchar(64) DEFAULT NULL,
                `videoTitle` varchar(128) DEFAULT NULL,
                `videoDesc` varchar(512) DEFAULT NULL,
                `postedDate` date DEFAULT NULL,
                `videoLength` varchar(16) DEFAULT NULL,
                `redditLink` varchar(1024) DEFAULT NULL,
                PRIMARY KEY (`videoId`),
                KEY `channelId` (`channelId`),
                CONSTRAINT `Video_ibfk_1` FOREIGN KEY (`channelId`) REFERENCES `Channel` (`channelId`);

                CREATE TABLE `Channel` (
                `channelId` varchar(64) NOT NULL DEFAULT '',
                `channelName` varchar(32) DEFAULT NULL,
                PRIMARY KEY (`channelId`)
                    */
        }

        function insertVideos($db) {
            foreach(self::channels as $index=>$channelId ) {
                $ch = curl_init("https://www.googleapis.com/youtube/v3/search?order=date&part=snippet&channelId=$channelId[0]&time=this_week&key=".self::key);
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
                $youtube = curl_exec($ch); 
                curl_close($ch);
                $ytresults[$channelId[0]][$index] = json_decode($youtube, true);
            }
            
            $query = '';
            foreach(self::channels as $channelId) {
                foreach($ytresults[$channelId[0]] as $channel) {
                    foreach($channel['items'] as $index=>$item) {
						if($item['snippet']['liveBroadcastContent'] == "none") {
							$videoId = $item['id']['videoId'];
							$videoTitle = str_replace('"', "'", $item['snippet']['title']);
							$videoDesc = str_replace('"', "'", $item['snippet']['description']);
							$posted = $item['snippet']['publishedAt'];
							$reddit = "";
							$query.="INSERT INTO Video(videoId, channelId, videoTitle, videoDesc, postedDate) 
								VALUES('$videoId', '$channelId[0]', \"$videoTitle\", \"$videoDesc\", 
								STR_TO_DATE(substring_index('$posted', 'T', 1), '%Y-%m-%d'));\n\r";
						}
                    }
                    $statement = $db->prepare($query);
                    $statement->execute();
                    $statement->closeCursor();
                    //$db->exec($query);
                    $query = '';
                }
            }
        }
    }
?>