var leftAviciiSymbol = "\u25e2";
var rightAviciiSymbol = "\u25e4";
var leftArrow = "&#8249;";
var rightArrow = "&#8250;";
TYPE = ""
currentAlbum = 0;
currentEP = 0;

var tableconfig = {
		showRowNumber: false,
		width: '100%',
		height: '100%',
		allowHtml: true,
		sortColumn: 0
}

function getAlias(id){
	for (var i=0; i<ALIASES.length; i++){
		if (ALIASES[i][0] == id){
			return ALIASES[i][1];
		}
	}
}

function getArtist(id){
	for (var i=0; i<ARTISTS.length; i++){
		if (ARTISTS[i][0] == id){
			return ARTISTS[i][1];
		}
	}
}
	
function playSpotify(id){
	var embedding = "";
	if (TYPE=="songs"){
		embedding = SONGS[id][10];
	}
	else if (TYPE=="remixes"){
		embedding = REMIXES[id][6];
	}
	else if (TYPE=="albums"){
		embedding = ALBUMS[id][3];
	}
	else if (TYPE=="EPs"){
		embedding = EPs[id][4]
	}
	embedding=embedding.replace("300", "100%");

	document.getElementById("media").innerHTML=embedding;
}

function playYouTube(id){
	var YTID = "";
	if (TYPE=="songs"){
		YTID = SONGS[id][9];
	}
	else if (TYPE=="remixes"){
		YTID = REMIXES[id][7];
	}
	else if (TYPE=="unreleased"){
		YTID = UNRELEASED[id][7];
	}
	var embedding="<iframe src=\"https://www.youtube.com/embed/"+YTID+"?autoplay=1\"frameborder=\"0\"></iframe>";
	document.getElementById("media").innerHTML=embedding;
}

function playGoogleDrive(id){
	var embedding = ""
	if (TYPE=="unreleased"){
		embedding = UNRELEASED[id][6];
		embedding = embedding.replace("640", "100%");
		embedding = embedding.replace("height=\"480\"", "");
	}
	document.getElementById("media").innerHTML=embedding;
}

function tablemaker(TYPE){
	google.charts.load('current', {'packages':['table']});

	switch(TYPE){
		case "songs":
			google.charts.setOnLoadCallback(songtable);
			break;
		case "unreleased":
			google.charts.setOnLoadCallback(unreleasedtable);
			break;
		case "remixes":
			google.charts.setOnLoadCallback(remixtable);
			break;
	}
	
}

function navigate(elem){
	var selected = document.getElementsByClassName("selected");
	if (selected.length>0) selected[0].className="navitem unselected";
	
	elem.className="navitem selected"
	if (TYPE==elem.id)
		return
	if (TYPE=="albums" || TYPE=="EPs") document.getElementById("indicator").outerHTML="";
	document.getElementById('content').innerHTML = "";
	TYPE = elem.id;
	switch(TYPE){
		case "songs":
		case "unreleased":
		case "remixes":
			tablemaker(TYPE);
			break;
		case "albums":
			showAlbums();
			break;
		case "EPs":
			showEPs();
			break;
	}
}