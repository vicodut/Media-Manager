function findData (title, Tour) {
	var Download = require('download');
	var fs = require('fs');
	var data = []; 
	var tmdb = require('tmdb-3')('c2c73ebd1e25cbc29cf61158c04ad78a');
/*console.log('img');*/
	tmdb.search('movie', {query: title, language: 'fr'}, function (err, results) {
	    //Informations on first ID
	    /*console.log(results.results[0]);*/
	    if (results.results[0] == undefined ) {
	    	/*console.log('erreur: film indefini');*/
	    	data[0] = title;
	        data[1] = "css\\guardian.jpg";
	        data[2] = "N.C.";
	        /*ficheFilm(data);*/
	        list(data,Tour);
	    } else {
	    tmdb.infos('movie', results.results[0].id, {language: 'fr'}, function (err, results) {

	        /*console.log(results);*/
	        data[0] = title;
	        data[1] = results.poster_path;
	        data[2] = results.overview;
	        /*ficheFilm(data);*/
	        /*console.log("TEST DATA::" + data);*/
	        while (data == null) {
	        };
	        var download = new Download().get(results.poster_path, 'Data/Img/' + title);

	        download.run(function (err, files) {
			    if (err) {
			        throw err;
			    }

/*			    console.log(files);*/
			    //=> [{ url: http://example.com/foo.zip, contents: <Buffer 50 4b 03 ...> }, { ... }]
			});


	        list(data,Tour);
	    });}
	});
	
}