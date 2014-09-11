function findData (title, Tour) {
	var Download = require('download');
	var data = []; 
	var tmdb = require('tmdb-3')('c2c73ebd1e25cbc29cf61158c04ad78a');

	tmdb.search('movie', {query: title, language: 'fr'}, function (err, results) {
	    //Informations on first ID
	    /*console.log(results.results[0]);*/
	    if (results.results[0] == undefined ) {
	    	/*console.log('erreur: film indefini');*/
	    	data[0] = title;
	        data[1] = "css\\guardian.jpg";
	        data[2] = "N.C.";

	    } else {
	    tmdb.infos('movie', results.results[0].id, {language: 'fr'}, function (err, results) {
	        data[0] = title;
	        data[1] = 'Data/Img/' + title + '.jpg';
	        data[2] = results.overview;

	        while (data == null) {
	        };
	        var download = new Download().get({url : results.poster_path, name : title + '.jpg'}, 'Data/Img/');

	        download.run(function (err, files) {
			    if (err) {
			        throw err;
			    }
			    console.log(files);
			    
			});


	        list(data,Tour);
	    });}
	});
	
}