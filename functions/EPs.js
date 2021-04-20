function createEPDivs(){
	var contents = "";
	
	if (currentEP>0){
		contents +="<div onclick=changeCurrentEP(-1) class=\"Album arrow\"><h1><span id=\"arrow\">"+leftAviciiSymbol+"</span></h1></div>";
	} 
	else{
		contents +="<div class=\"Album arrow\"> </div>";
	}
	
	contents += "<div class=\"Album info\" id=\"albuminfo\"></div>";
	
	if (currentEP<EPs.length-1){
		contents += "<div onclick=changeCurrentEP(1) class=\"Album arrow\"><h1><span id=\"arrow\">"+rightAviciiSymbol+"</span></h1></div>";
	}
	else{
		contents += "<div class=\"Album arrow\"> </div>";
	}
	
	contents += "<div class=\"cover\" id=\"cover\"></div>";
	
	document.getElementById('content').innerHTML = contents
	document.getElementById('content').innerHTML += "<div class=\"indicator\" id=\"indicator\" ></div>";
}
	

function fillEPIndicator(){
	var width = document.getElementById("indicator").offsetWidth;
	width = width / EPs.length*.9;
	for (var i=0; i<EPs.length; i++){
		document.getElementById("indicator").innerHTML += 
		"<div class=\"indi\" onclick=selectEP("+i+") id="+i+" style=\"width:"+width+"px\"></div>";
	}
}

function loadEP(){
	var data = EPs[currentEP];
	var title = data[1];
	var date = data[2].toString();
	var albumArt = data[3];
	var alias = getAlias(data[5]);
	
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
			currentEP+
			") src=\"UI/play-button.png\">";
	}
	
	document.getElementById(currentEP.toString()).style.backgroundColor = "red";
}

function changeCurrentEP(step){
	document.getElementById("indicator").outerHTML="";
	if (!(step<0 && currentEP == 0)&& !(step > 0 && currentEP == EPs.length -1 )){
		currentEP+=step;
	}
	showEPs();
}

function selectEP(id){
	document.getElementById("indicator").outerHTML="";
	currentEP = id;
	showEPs();
}

function showEPs(){
	createEPDivs();
	fillEPIndicator();
	loadEP();
	
}