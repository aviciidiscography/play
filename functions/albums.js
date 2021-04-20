function createAlbumDivs(){
	var contents = "";
	
	if (currentAlbum>0){
		contents +="<div onclick=changeCurrentAlbum(-1) class=\"Album arrow\"><h1><span id=\"arrow\">"+leftAviciiSymbol+"</span></h1></div>";
	} 
	else{
		contents +="<div class=\"Album arrow\"> </div>";
	}
	
	contents += "<div class=\"Album info\" id=\"albuminfo\"></div>";
	
	if (currentAlbum<ALBUMS.length-1){
		contents += "<div onclick=changeCurrentAlbum(1) class=\"Album arrow\"><h1><span id=\"arrow\">"+rightAviciiSymbol+"</span></h1></div>";
	}
	else{
		contents += "<div class=\"Album arrow\"> </div>";
	}
	
	contents += "<div class=\"cover\" id=\"cover\"></div>";
	
	document.getElementById('content').innerHTML = contents
	document.getElementById('content').innerHTML += "<div class=\"indicator\" id=\"indicator\" ></div>";
}
	

function fillAlbumIndicator(){
	var width = document.getElementById("indicator").offsetWidth;
	width = width / ALBUMS.length*.9;
	for (var i=0; i<ALBUMS.length; i++){
		document.getElementById("indicator").innerHTML += 
		"<div class=\"indi\" onclick=selectAlbum("+i+") id="+i+" style=\"width:"+width+"px\"></div>";
	}
}

function loadAlbum(){
	var data = ALBUMS[currentAlbum];
	var title = data[1];
	var date = data[2].toString();
	var albumArt = data[5];
	var alias = getAlias(data[4]);
	
	if (date!=null){
		date = date.slice(0, 4);
		date = '('+date+')';
	}
	else{
		date = "";
	}
	
	document.getElementById('albuminfo').innerHTML = 
	"<h1>"+title+" - "+alias+" " +date +"</h1>" +
	"<img class=\"albumart\" src=\"" + albumArt + "\">"
	
	if (data[3]!=null){
		document.getElementById('albuminfo').innerHTML += 
			"<img id=\"overlay\" onclick=playSpotify("+
			currentAlbum+
			") src=\"UI/play-button.png\">";
	}
	
	document.getElementById(currentAlbum.toString()).style.backgroundColor = "red";
}

function changeCurrentAlbum(step){
	document.getElementById("indicator").outerHTML="";
	if (!(step<0 && currentAlbum == 0)&& !(step > 0 && currentAlbum == ALBUMS.length -1 )){
		currentAlbum+=step;
	}
	showAlbums();
}

function selectAlbum(id){
	document.getElementById("indicator").outerHTML="";
	currentAlbum = id;
	showAlbums();
}

function showAlbums(){
	createAlbumDivs();
	fillAlbumIndicator();
	loadAlbum();
	
}