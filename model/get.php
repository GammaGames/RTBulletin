<?php
    require_once('../database.php');
    $chId = $_POST["chId"];

    $queryVideos = "SELECT * FROM Video
            WHERE postedDate > DATE_SUB(NOW(), INTERVAL 1 WEEK)
            AND channelId = '$chId'
            ORDER BY postedDate DESC;";
    $statement = $db->prepare($queryVideos);
    $statement->execute();
    $result = serialize($statement->fetchAll());
    $statement->closeCursor();

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "http://csdept19.mtech.edu/rtb/view/build.php");
    curl_setopt($ch, CURLOPT_POST, 1);
    $post = array('result' => $result);
    curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec ($ch);
    curl_close ($ch);

    echo $response;
?>