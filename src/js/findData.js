function findData (title, Tour) {
	var Download = require('download');
	var data = []; 
	var tmdb = require('tmdb-3')('c2c73ebd1e25cbc29cf61158c04ad78a');

	tmdb.search('movie', {query: title, language: 'fr'}, function (err, results) {
	    //Informations on first ID

	    if (err) {

	    } else {

		    if (results.results[0] == undefined ) {

		    	data[0] = title;
		        data[1] = "Data/movie-placeholder.jpg";
		        data[2] = "N.C.";
		        data[3] = 'N.C.';
		        data[4] = "N.C.";
		        list(data,Tour);

		    } else {

		    tmdb.infos('movie', results.results[0].id, {language: 'fr'}, function (err, results) {
		    	compteurImg++;
		    	/*console.log(results);*/

		        data[0] = title;
		        data[1] = results.poster_path;
		        data[2] = results.overview;
		        data[3] = Math.round(results.vote_average / 2);
		        data[4] = results.genres;

		        var download = new Download().get({url : results.poster_path, name : title + '.jpg'}, 'Data/Img/');

		        download.run(function (err, files) {
				    if (err) {
				        throw err;
				    }
				    console.log(files);
				    compteurImg--;
				    console.log(compteurImg);
				});


		        list(data,Tour);
		    });}
		}
	});
	
}