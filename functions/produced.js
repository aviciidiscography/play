function getProduced(i){
	var data = PRODUCED[i];
	var title = data[1];
	var original = data[2];
	var yt = "";
	var spotify = "";
	var artists = [];
	
	if (original!=null){
		original = original.toString().split(",");
		for (var j=0; j<original.length; j++){
			artists.push(getArtist(original[j]));
		}
	}	
	
	if (PRODUCED[i][5]!=null){
		yt = "<img class=\"icon\" onclick=playYouTube("+i+") src=\"UI/youtube.png\">"
	}

	if (PRODUCED[i][4]!=null){
		spotify = "<img class=\"icon\" onclick=playSpotify("+i+") src=\"UI/spotify.png\">"	
	}

	return [title, artists.join(", "), yt, spotify];
}

function loadProduced(){
	var songs = [];
	for (var i=0; i<PRODUCED.length; i++){
		songs.push(getProduced(i));
	}
	return songs;
}

function producedtable(){
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Title');
	data.addColumn('string', 'Original Artist');
	data.addColumn('string', 'YouTube');
	data.addColumn('string', 'Spotify');
	data.addRows(loadProduced());

	var table = new google.visualization.Table(document.getElementById('content'));

	table.draw(data, tableconfig);
}