function findData (title, Tour) {
	var Download = require('download');
	var data = []; 
	var tmdb = require('tmdb-3')('c2c73ebd1e25cbc29cf61158c04ad78a');
	/*title = 'Paul';*/
	
	tmdb.search('movie', {query: title, language: 'fr'}, function (err, results) {

	    if (err) {

	    } else {

		    if (results.results[0] == undefined || results == undefined) {

		    	data[0] = title;
		        data[1] = "Data/movie-placeholder.jpg";
		        data[2] = "N.C.";
		        data[3] = 'N.C.';
		        data[4] = "N.C.";
		        data[5] = "Film";
		        data[6] = "N.C.";
		        list(data,Tour);

		    } else {

		    tmdb.infos('movie', results.results[0].id, {language: 'fr'}, function (err, results) {
		    	compteurImg++;
		    	

		        data[0] = title;
		        data[2] = results.overview;
		        data[3] = Math.round(results.vote_average / 2);
		        data[4] = results.genres;
		        data[5] = "Film";
		        data[6] = results.runtime;

		        if (results.poster_path == null) {
		        	data[1] = "Data/movie-placeholder-dark.jpg";
		        } else {
		        	data[1] = results.poster_path;
		        	var download = new Download().get({url : results.poster_path, name : title + '.jpg'}, 'Data/Img/');

			        download.run(function (err, files) {
					    if (err) {
					        throw err;
					    }
					    console.log(files);
					    compteurImg--;
					    console.log(compteurImg);
					});
		        };

		        list(data,Tour);
		    });}
		}
	});
	
}

function findDataSerie (title, Tour) {
	var Download = require('download');
	var data = []; 
	var tmdb = require('tmdb-3')('c2c73ebd1e25cbc29cf61158c04ad78a');
	
	var name = title.replace("Serie - ", "");
	console.log(name);
	tmdb.search('tv', {query: name, language: 'fr'}, function (err, results) {


	    if (err) {

	    } else {

		    if ( results == undefined || results.results[0] == undefined) {

		    	data[0] = title;
		        data[1] = "Data/movie-placeholder.jpg";
		        data[2] = "N.C.";
		        data[3] = 'N.C.';
		        data[4] = "N.C.";
		        data[5] = "Serie";
		        data[6] = "N.C.";
		        list(data,Tour);

		    } else {

		    tmdb.infos('tv', results.results[0].id, {language: 'fr'}, function (err, results) {
		    	compteurImg++;

		        data[0] = title.replace("Serie - ", "");
		        data[2] = results.overview;
		        data[3] = Math.round(results.vote_average / 2);
		        data[4] = results.genres;
		        data[5] = "Serie";
		        data[6] = results.episode_run_time[0];

		        if (results.poster_path == null) {
		        	data[1] = "Data/movie-placeholder-dark.jpg";
		        } else {
		        	data[1] = results.poster_path;
		        	var download = new Download().get({url : results.poster_path, name : title + '.jpg'}, 'Data/Img/');

			        download.run(function (err, files) {
					    if (err) {
					        throw err;
					    }
					    console.log(files);
					    compteurImg--;
					    console.log(compteurImg);
					});
		        };

		        list(data,Tour);
		    });}
		}
	});
	
}