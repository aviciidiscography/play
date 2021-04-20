function getAlbumName(id){
	if (id==null) return "";
	for (var i=0; i<ALBUMS.length; i++){
		if (ALBUMS[i][0] == id){
			return ALBUMS[i][1];
		}
	}
}

function getEPName(id){
	if (id==null) return "";
	for (var i=0; i<EPs.length; i++){
		if (EPs[i][0] == id){
			return EPs[i][1];
		}
	}
}

function getSong(i){
	var data = SONGS[i];
	var title = data[1];
	var version = data[2];
	var featurings = data[3];
	var alias = getAlias(data[4]);
	var album = getAlbumName(data[7]);
	var EPname = getEPName(data[8]);
	var yt = "";
	var spotify = "";
	var artists = [];
	
	if (featurings!=null){
		featurings = featurings.toString().split(",");
		for (var j=0; j<featurings.length; j++){
			artists.push(getArtist(featurings[j]));
		}
	}
	
	if (SONGS[i][9]!=null){
		yt = "<img class=\"icon\" onclick=playYouTube("+i+") src=\"UI/youtube.png\">"
	}

	if (SONGS[i][10]!=null){
		spotify = "<img class=\"icon\" onclick=playSpotify("+i+") src=\"UI/spotify.png\">"	
	}

	return [title, version, artists.join(", "), alias, album, EPname, yt, spotify];
}

function loadSongs(){
	var songs = [];
	for (var i=0; i<SONGS.length; i++){
		songs.push(getSong(i));
	}
	return songs;
}

function songtable(){
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Title');
	data.addColumn('string', 'Version');
	data.addColumn('string', 'Featuring');
	data.addColumn('string', 'Alias');
	data.addColumn('string', 'Album');
	data.addColumn('string', 'EP');
	data.addColumn('string', 'YouTube');
	data.addColumn('string', 'Spotify');
	data.addRows(loadSongs());

	var table = new google.visualization.Table(document.getElementById('content'));

	table.draw(data, tableconfig);
}