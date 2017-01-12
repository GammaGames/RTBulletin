var titleFonts = ["amatic", "lengineer", "kohicle; font-weight: 600;"];
var descriptionFonts = ["billy", "lengineer; font-weight: 500;", "rabiohead; font-weight: 500; font-size: 20px;"];
function randomFont(str) {
	if(str == 'title')
		return titleFonts[Math.floor(Math.random() * titleFonts.length)];
	else if(str == 'description')	
		return descriptionFonts[Math.floor(Math.random() * descriptionFonts.length)];
}

function randomAngle() {
	return Math.floor(Math.random() * 15 - 7.5);    
}

function randomNum(num) {
	return Math.floor(Math.random() * num);    
}

function descriptionSplit(str, channel) {
	var result = "";
	if(channel === 'letsplay' || channel === 'funhaus') {
		str = str.replace(/"/g, '');
		var sentences = str.replace(/([.?!])\s*/g, "$1|").replace(/\(@.{1,20}\)/g, '').split("|");
		
		for( i = 0; i < sentences.length; i++) {
			if(( sentences[i].indexOf("Store") == -1 && sentences[i].indexOf("http") == -1 && sentences[i].indexOf("Sponsor") == -1 && sentences[i].indexOf("ly/") == -1 ) && (result.length + sentences[i].length < 150 || i == 0)) {
				result += sentences[i] + " ";
			}
		}
	}
	else if(channel == 'rooster teeth' || channel == 'the slow mo guys') {
		str = str.replace(/"/g, '');
		var sentences = str.replace(/([.?!])\s+/g, "$1|").replace(/\(@.{1,20}\)/g, '').split("|");
		
		for( i = 0; i < sentences.length; i++) {
			if(( sentences[i].indexOf("Store") == -1 && sentences[i].indexOf("http") == -1 && sentences[i].indexOf("Sponsor") == -1 && sentences[i].indexOf("aired on") == -1 && sentences[i].indexOf("SPOILER WARNING") == -1 && sentences[i].indexOf("Podcast is back in video form") == -1 && sentences[i].indexOf("ly/") == -1  && sentences[i].indexOf("com/") == -1  && sentences[i].indexOf("youtube") == -1  && sentences[i].indexOf("steampowered") == -1 ) && (result.length + sentences[i].length < 200 || i == 0)) {
				result += sentences[i] + " "; 
			}
		}
	}
	else if(channel == 'the know') {	
	str = str.replace(/"/g, '');
		var sentences = str.replace(/([.?!])\s+/g, "$1|").replace(/\(@.{1,20}\)/g, '').split("|");
		
		for( i = 0; i < sentences.length; i++) {
			if(( sentences[i].indexOf("Store") == -1 && sentences[i].indexOf("http") == -1 && sentences[i].indexOf("Sponsor") == -1 && sentences[i].indexOf("aired on") == -1 && sentences[i].indexOf("SPOILER WARNING") == -1 && sentences[i].indexOf("Podcast is back in video form") == -1 && sentences[i].indexOf("ly/") == -1  && sentences[i].indexOf("com/") == -1  && sentences[i].indexOf("youtube") == -1  && sentences[i].indexOf("steampowered") == -1 ) && (result.length + sentences[i].length < 100)) {
				result += sentences[i] + " "; 
			}
		}
	}
	else if(channel === 'game kids') {
		str = str.replace(/"/g, '');
		var sentences = str.replace(/([.?!])\s*/g, "$1|").replace(/\(@.{1,20}\)/g, '').split("|");
		
		for( i = 0; i < sentences.length; i++) {		
			if((sentences[i].indexOf("Store") == -1 && sentences[i].indexOf("http") == -1 && sentences[i].indexOf("Sponsor") == -1 && sentences[i].indexOf("/") == -1 ) && ((sentences[i].length > 5 && result.length + sentences[i].length < 150) || i == 0)) {
				result += sentences[i] + " ";
			}
		}
	}
	return result;
}

function titleSplit(str, channel) {
	if(channel === 'letsplay') {
		str = str.replace("Let's Play", "");
		if(str.toLowerCase().indexOf("gta") > -1) {
			return str.trim();
		}
		else if(str.toLowerCase().indexOf("minecraft") > -1) {
			if(str.toLowerCase().indexOf("episode") > -1)
				{
				return str.split("-")[1].trim().replace("Episode ", "Minecraft #") + " - " + str.split("-")[2].trim(); }
			else
			{
				return "Let's Build - " + str.split("-")[1].trim(); }
		}
		else if(str.toLowerCase().indexOf("vs") > -1) { 
			return str.trim();
		}
		else if(str.toLowerCase().indexOf("go!") > -1) { 
			return "GO! # " + str.split("#")[1];
		}
		else if(str.toLowerCase().indexOf("full play") > -1) {
			return str;
		}
		else if(str.toLowerCase().indexOf("game kids") > -1) { 
			return str.split("--")[1].trim();
		}
		else
			return str.replace("-", "").trim();
	}
	else if(channel === 'rooster teeth') {
		if(str.toLowerCase().indexOf("animated adventures") > -1) { 
			return str.replace("Rooster Teeth Animated Adventures", "RTAA").replace("-", "").trim();
		}
		else if(str.toLowerCase().indexOf("hunt #") > -1) { 
			return str.replace("Achievement", "").trim();
		}
		else if(str.toLowerCase().indexOf("weekly update") > -1) { 
			return str.replace("Achievement Hunter Weekly Update", "AHWU").split('(')[0].trim();
		}
		else if(str.toLowerCase().indexOf("red vs. blue") > -1) { 
			var rvb =  '<span style="color:#ff0000;">R</span><span style="color:#FFFFF2;">v</span><span style="color:#0000B3;">B</span> ';	
			return rvb + str.replace("Red vs. Blue", "").split('(')[0].trim();
		}
		else if(str.toLowerCase().indexOf("podcast") > -1) { 
			return str.replace("Rooster Teeth Video Podcast ", "RT Podcast ").split('(')[0].trim();
		}
		else if(str.toLowerCase().indexOf("presents") > -1) { 
			return str.replace(" Presents", "").split('(')[0].trim();
		}		
		else if(str.toLowerCase().indexOf("fails of the weak") > -1) { 
			return str.replace("# ", "#");
		}
		else if(str.toLowerCase().indexOf("rwby") > -1) { 
			var rwby =  '<span style="color:#ff0000;">R</span><span style="color:#FFFFFF;">W</span><span style="color:#000000;">B</span><span style="color:#FFFF00;">Y</span> ';			
			return rwby + str.replace("RWBY", "").split('(')[0].trim();
		}
		else
			return str;
	}
	else if(channel === 'the slow mo guys') {
		return "SMG " + str.split('-')[0].trim();
	}
	else if(channel === 'the know') {
		if((str.indexOf("The Patch") > -1 || str.indexOf("Screen Play") > -1 || str.indexOf("Leaderboard") > -1))
			return str.split(':')[0].trim();
		else
			return str.split('-')[0].trim();
	}
	else 
		return str;
}

function dateSplit(str, current) {
	var nums = str.split("T")[0];
	var diffDays = Math.abs(new Date(nums).getTime() - current) / (1000 * 3600 * 24);
	return diffDays;
}

function getTime(time) {
	var hour = Math.floor(time / 3600)
	var min = Math.round(time % 3600 / 60);
		
	if(hour >= 1)
		return hour + " hour " + min + " min";
	else
		return min + " min";
}
	
function getGame(str, name) {
	if(name === "game kids")
		return "kids";
	else if(name === "funhaus")
	{
		return "other";
	}
	else
	{
		if(str.indexOf("five facts") > -1) { return "5facts"; }	
		else if(str.indexOf("things to do") > -1) { return "ttd"; }	
		else if(str.indexOf("gta") > -1) { return "gta"; }
		else if(str.indexOf("slow mo guys") > -1) { return "smg"; }
		else if(str.indexOf("minecraft") > -1) { 
			if(str.indexOf("episode") > -1) { return "mclp"; }
			else { return "mclb"; } }
		else if(str.indexOf("animated adventures") > -1) { return "rtaa"; }	
		else if(str.indexOf("achievement hunt ") > -1) { return "hunt"; }
		else if(str.indexOf("red vs. blue") > -1) { return "rvb"; }
		else if(str.indexOf("vs") > -1) { return "vs"; }
		else if(str.indexOf("go!") > -1) { return "go"; }
		else if(str.indexOf("full play") > -1) { return "micoo"; }
		else if(str.indexOf("game kids") > -1) { return "kids"; }
		else if(str.indexOf("podcast") > -1) { return "podcast"; }
		else if(str.indexOf("worms") > -1) { return "worms"; }	
		else if(str.indexOf("happy hour") > -1) { return "hh"; }	
		else if(str.indexOf("guide") > -1 || str.indexOf("easter egg") > -1) { return "guide"; }
		else if(str.indexOf("rwby") > -1) { return "rwby"; }
		else if(str.indexOf("fails of the") > -1) { return "weak"; }
		else if(str.indexOf("patch") > -1) { return "patch"; }
		else if(str.indexOf("screen play") > -1) { return "screen"; }
		else if(str.indexOf("how to:") > -1) { return "how"; }
		else if(str.indexOf("rage quit") > -1) { return "rage"; }
		else if(str.indexOf("countdown") > -1) { return "countdown"; }
		else if(str.indexOf("achievement hunter weekly update") > -1) { return "ahwu"; }
		else if(str.indexOf("achievement hunt ") > -1) { return "hunt"; }
		else if(str.indexOf("recap") > -1) { return "recap"; }
		else if(str.indexOf("coming soon") > -1) {return "coming"; }
		else if(str.indexOf("trials files") > -1) {return "tfiles"; }
		else if(str.indexOf("play pals") > -1) {return "pals"; }
		else if(str.indexOf("the know") > -1) {return "know"; }
		else if(str.indexOf("megacraft") > -1) {return "mega"; }
		else if(str.indexOf("imaginary achievements") > -1) {return "achieve"; }
		else if(str.indexOf("x-ray & vav") > -1) {return "x-vav"; }
	}
	return "other";
}	

function getCard(video) {
	var card = '<card class=' + video.game + '><p id="title" style="font-family:' + randomFont('title') + ';">' + video.title + '<br><span style="font-size: 20px;">' + video.length +'</span></p><p id="desc" style="font-family:' + randomFont('description') +';">' + video.description +'</p><div id="flair" class="' + getFlair(video.game) + '"></div><div id="thumb" title="Watch on YouTube"><a href="' + video.id + '"target="_blank"><img src="'+ video.thumbnail+'" alt="Thumbnail" width="96px" height="72px"></a></div>';	
	
	if(video.reddit !==  "")
		card += '<a href="' + video.reddit + '" target="_blank"><div id="reddit" class="reddit-flair"></div></a>';
	else
		card += '</card>';
	return card;
}

function rotateCards(cards) {	
		if(cards[i].innerHTML !== "") {		
		var thumbAngle = randomAngle();
		var cardAngle = thumbAngle * -0.2;
		cards[i].style.transform = 'rotate(' + cardAngle + 'deg)';
		cards[i].getElementsByTagName('div')[1].style.transform = 'rotate(' + thumbAngle + 'deg)';
		cards[i].style.webkitTransform = 'rotate(' + cardAngle + 'deg)';
		cards[i].getElementsByTagName('div')[1].style.webkitTransform = 'rotate(' + thumbAngle + 'deg)';
		cards[i].style.mozTransform = 'rotate(' + cardAngle + 'deg)';
		cards[i].getElementsByTagName('div')[1].style.mozTransform  = 'rotate(' + thumbAngle + 'deg)';
		cards[i].style.msTransform ='rotate(' + cardAngle + 'deg)'; 
		cards[i].getElementsByTagName('div')[1].style.msTransform ='rotate(' + thumbAngle + 'deg)'; 
		cards[i].style.oTransform = 'rotate(' + cardAngle + 'deg)';	
		cards[i].getElementsByTagName('div')[1].style.oTransform = 'rotate(' + thumbAngle + 'deg)';	
		}
}

function getFlair(game) {
	if(game !== "other" && game !== "countdown" && game !== "micoo" && game !== "ttd" && game !== "recap" && game !== "hh"  && game !== "kids")
		return game + '-flair';
	else
		return '';
}

function addVideo(video) {
	<!-- add 7 days and under -->
	if(video.published <= 8) {
		if(video.name === 'the know' && (video.title.indexOf("Patch") > -1 || video.title.indexOf("Screen Play") > -1 || video.title.indexOf("Leaderboard") > -1))
			rtvideos.push(video);
		else if(video.name === 'funhaus')
			fhvideos.push(video);
		else if(video.name === 'the know')
			knowvideos.push(video);
		else if(video.name !== 'the know') { 
			if(video.name === 'letsplay' || video.name === 'game kids')
				ahvideos.push(video);
			else {
				if(video.game === '5facts' ||  video.game === 'ahwu' ||  video.game === 'hunt' ||  video.game === 'ahwu' ||  video.game === 'coming' ||  video.game === 'tfiles' ||  video.game === 'weak' ||  video.game === 'countdown' ||  video.game === 'pals' ||  video.game === 'ttd') {
					ahvideos.push(video);
				}
				else
					rtvideos.push(video);
			}
		}
	}	
}

function rotateLeft() {
	//snowStorm.randomizeWind();
	if(display === "ah") {
		document.getElementById("board").className = "border_fh";		
		document.getElementById("label").className = "label_fh";
		document.getElementById("label").innerHTML = "Funhaus";	
		display = "fh";
		document.getElementById("board").innerHTML = document.getElementById("fhboard").innerHTML;
		$(left).attr("src", "images/knowlogo.png");
		$(right).attr("src", "images/ahlogo.png");
		window.scrollTo(0,0);		
	}
	else if(display === "fh") {
		document.getElementById("board").className = "border_know";		
		document.getElementById("label").className = "label_know";
		document.getElementById("label").innerHTML = "The Know";	
		display = "know";
		document.getElementById("board").innerHTML = document.getElementById("knowboard").innerHTML;
		$(left).attr("src", "images/rtlogo.png");
		$(right).attr("src", "images/fhlogo.png");
		window.scrollTo(0,0);		
	}
	else if(display === "rt") {
		document.getElementById("board").className = "border_ah";		
		document.getElementById("label").className = "label_ah";
		document.getElementById("label").innerHTML = "Achievement Hunter";	
		display = "ah";
		document.getElementById("board").innerHTML = document.getElementById("ahboard").innerHTML;
		$(left).attr("src", "images/fhlogo.png");
		$(right).attr("src", "images/rtlogo.png");
		window.scrollTo(0,0);		
	}
	else if(display === "know") {
		document.getElementById("board").className = "border_rt";		
		document.getElementById("label").className = "label_rt";
		document.getElementById("label").innerHTML = "Rooster Teeth";	
		display = "rt";
		document.getElementById("board").innerHTML = document.getElementById("rtboard").innerHTML;
		$(left).attr("src", "images/ahlogo.png");
		$(right).attr("src", "images/knowlogo.png");
		window.scrollTo(0,0);		
	}
}

function rotateRight() {
	//snowStorm.randomizeWind();
	if(display === "ah") {
		document.getElementById("board").className = "border_rt";		
		document.getElementById("label").className = "label_rt";
		document.getElementById("label").innerHTML = "Rooster Teeth";	
		display = "rt";
		document.getElementById("board").innerHTML = document.getElementById("rtboard").innerHTML;
		$(left).attr("src", "images/ahlogo.png");
		$(right).attr("src", "images/knowlogo.png");
		window.scrollTo(0,0);		
	}
	else if(display === "fh") {
		document.getElementById("board").className = "border_ah";		
		document.getElementById("label").className = "label_ah";
		document.getElementById("label").innerHTML = "Achievement Hunter";	
		display = "ah";
		document.getElementById("board").innerHTML = document.getElementById("ahboard").innerHTML;
		$(left).attr("src", "images/fhlogo.png");
		$(right).attr("src", "images/rtlogo.png");
		window.scrollTo(0,0);		
	}
	else if(display === "rt") {
		document.getElementById("board").className = "border_know";		
		document.getElementById("label").className = "label_know";
		document.getElementById("label").innerHTML = "The Know";	
		display = "know";
		document.getElementById("board").innerHTML = document.getElementById("knowboard").innerHTML;
		$(left).attr("src", "images/rtlogo.png");
		$(right).attr("src", "images/fhlogo.png");
		window.scrollTo(0,0);		
	}
	else if(display === "know") {
		document.getElementById("board").className = "border_fh";		
		document.getElementById("label").className = "label_fh";
		document.getElementById("label").innerHTML = "Funhaus";
		display = "fh";
		document.getElementById("board").innerHTML = document.getElementById("fhboard").innerHTML;
		$(left).attr("src", "images/knowlogo.png");
		$(right).attr("src", "images/ahlogo.png");
		window.scrollTo(0,0);		
	}
}

function compare(video1,video2) {
  if (video1.published < video2.published)
     return -1;
  if (video1.published > video2.published)
    return 1;
  return 0;
}