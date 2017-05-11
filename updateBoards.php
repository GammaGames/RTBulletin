<?php
    require_once('database.php');
    require_once('model/boardUpdater.php');

    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

    echo "begin\r\n";

    $updater = new BoardUpdater();

    echo "inserting videos\r\n";
    $updater->insertVideos($db);

    $queryVideos = 'SELECT videoId, videoLength, redditLink, channelId FROM Video
            WHERE videoLength is NULL or redditLink is NULL or DATE(postedDate) = CURDATE();';
    $statement = $db->prepare($queryVideos);
    $statement->execute();
    $result = $statement->fetchAll();
    $statement->closeCursor();

    echo "getting length and reddit\r\n";
    $query = '';
    foreach($result as $entry) {
        if($entry['videoLength'] == NULL) {
            $length = $updater->getLength($entry['videoId']);
            $query.="UPDATE Video SET videoLength='$length' WHERE videoId = '".$entry['videoId']."';\n\r";
        }
        if($entry['redditLink'] == NULL || $entry['redditLink'] == "" || $entry['redditLink'] == "-1") {
            $reddit = $updater->getRedditLink($entry['videoId'], $entry['channelId']);
            $query.="UPDATE Video SET redditLink='$reddit' WHERE videoId = '".$entry['videoId']."';\n\r";
        }
    }
    $statement = $db->prepare($query);
    $statement->execute();
    $statement->closeCursor();
    echo "done\r\n";
?>
