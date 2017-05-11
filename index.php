<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta name="author" content="Jesse Lieberg">
        <meta name="viewport" content="width = device-width, initial-scale = 1, user-scalable = no">
		<title>RTBulletin</title>	
        <link rel="shortcut icon" href="img/favicon.ico">
		<link rel="stylesheet" type="text/css" href="stylesheet.css">
        <script type="text/javascript" src="jquery-3.2.1.min.js"></script>
        <script type="text/javascript">
            var loading;
            var ajaxTable = {
                GET: function(result) {
                    setTimeout(function() {$("#board").html(result);}, 10);
                    
                },
                SAVE: function(result) {
                    console.log(result);
                }
            }

            function ajaxCallback(value, result) {
                ajaxTable[value](result);
            }

            function getBoard() {
                if(loading == null) {
                $.get("/rtb/view/load.html", post).done(
                    function(result) {
                        loading = result;
                    });
                }
                $("#board").html(loading);
                

                var chId = $("select[id=channelSelector]").val();
                $("#channelSelector").toggleClass($("#channelSelector").attr('class'));
                $("#board").toggleClass($("#board").attr('class'));
                switch(chId) {
                    case 'UCzH3iADRIq1IJlIXjfNgTpA':
                        $("#channelSelector").toggleClass("rt");
                        $("#board").toggleClass("rt_board");
                        break;
                    case 'UCkxctb0jr8vwa4Do6c6su0Q':
                        $("#channelSelector").toggleClass("lp");
                        $("#board").toggleClass("lp_board");
                        break;
                    case 'UCsB0LwkHPWyjfZ-JwvtwEXw':
                        $("#channelSelector").toggleClass("ah");
                        $("#board").toggleClass("ah_board");
                        break;
                    case 'UCboMX_UNgaPBsUOIgasn3-Q':
                        $("#channelSelector").toggleClass("fh");
                        $("#board").toggleClass("fh_board");
                        break;
                    case 'UC4w_tMnHl6sw5VD93tVymGw':
                        $("#channelSelector").toggleClass("know");
                        $("#board").toggleClass("know_board");
                        break;
                    case 'UCmYBTQilY7p8EQ9IsyA3oLw':
                        $("#channelSelector").toggleClass("cc");
                        $("#board").toggleClass("cc_board");
                        break;
                }

                var post = {FUNCTION: "GET",
                            CHANNEL_ID: chId};
                $.post("/rtb/controller.php", post).done(
                    function(result) {
                        ajaxCallback("GET", result);
                    });
            }

            $(document).ready(function() {
                getBoard();
            });
        </script>
	</head>
	<body>
        <?php
            require_once('view/header.html');
        ?>
        <select id="channelSelector" onchange="getBoard()">
            <option value="UCzH3iADRIq1IJlIXjfNgTpA">Rooster Teeth</option>
            <option value="UCkxctb0jr8vwa4Do6c6su0Q">LetsPlay</option>
            <option value="UCsB0LwkHPWyjfZ-JwvtwEXw">Achievement Hunter</option>
            <option value="UCboMX_UNgaPBsUOIgasn3-Q">Funhaus</option>
            <option value="UCmYBTQilY7p8EQ9IsyA3oLw">Cow Chop</option>
            <option value="UC4w_tMnHl6sw5VD93tVymGw">The Know</option>
        </select>

        <div id="board">
        </div>
    </body>
</html>
