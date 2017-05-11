<?php
    $function = $_POST['FUNCTION'];

    switch($function) {
        case 'GET':
            $chId = $_POST["CHANNEL_ID"];

            $ch = curl_init();
            curl_setopt($ch, CURLOPT_URL, "http://csdept19.mtech.edu/rtb/model/get.php");
            curl_setopt($ch, CURLOPT_POST, 1);
            $post = array('chId' => $chId);
            curl_setopt($ch, CURLOPT_POSTFIELDS, http_build_query($post));
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

            $response = curl_exec ($ch);
            curl_close ($ch);

            echo $response;
            break;
        case 'SAVE':
            break;
    }
?>
