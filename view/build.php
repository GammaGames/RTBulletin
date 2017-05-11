<?php
    require_once('../Video.php');

    $result = unserialize($_POST["result"]);
    $videos;
    foreach($result as $index=>$video) {
        $videoId = $video['videoId'];
        $videoTitle = $video['videoTitle'];
        $videoDesc = $video['videoDesc'];
        $videoLength = $video['videoLength'];
        $posted = $video['postedDate'];
        $reddit = $video['redditLink'];

        $videos[$index] = new Video($videoId, $videoTitle, $videoDesc, $videoLength, $posted, $reddit);
        echo $videos[$index]->getCard();
    }
?>