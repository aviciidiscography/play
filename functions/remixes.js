function getRemix(i){
	var data = REMIXES[i];
	var title = data[1];
	var version = data[2];
	var original = data[3];
	var alias = getAlias(data[4]);
	var yt = "";
	var spotify = "";
	var artists = [];
	
	if (original!=null){
		original = original.toString().split(",");
		for (var j=0; j<original.length; j++){
			artists.push(getArtist(original[j]));
		}
	}	
	
	if (REMIXES[i][7]!=null){
		yt = "<img class=\"icon\" onclick=playYouTube("+i+") src=\"UI/youtube.png\">"
	}

	if (REMIXES[i][6]!=null){
		spotify = "<img class=\"icon\" onclick=playSpotify("+i+") src=\"UI/spotify.png\">"	
	}

	return [title, version, artists.join(", "), alias, yt, spotify];
}

function loadRemixes(){
	var remixes = [];
	for (var i=0; i<REMIXES.length; i++){
		remixes.push(getRemix(i));
	}
	return remixes;
}

function remixtable(){
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Title');
	data.addColumn('string', 'Version');
	data.addColumn('string', 'Original Artist');
	data.addColumn('string', 'Alias');
	data.addColumn('string', 'YouTube');
	data.addColumn('string', 'Spotify');
	data.addRows(loadRemixes());

	var table = new google.visualization.Table(document.getElementById('content'));

	table.draw(data, tableconfig);
}