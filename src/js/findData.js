function findData (title) {
	var data = []; 
	var tmdb = require('tmdb-3')('c2c73ebd1e25cbc29cf61158c04ad78a');
console.log('img');
	tmdb.search('movie', {query: title, language: 'fr'}, function (err, results) {
	    //Informations on first ID
	    console.log(results.results[0]);
	    if (results.results[0] == undefined ) {
	    	console.log('erreur: film indefini');
	    } else {
	    tmdb.infos('movie', results.results[0].id, {language: 'fr'}, function (err, results) {

	        console.log(results);
	        data[0] = title;
	        data[1] = results.poster_path;
	        data[2] = results.overview;
	        console.log(img);
	        ficheFilm(data);
	    });}
	});
	
}