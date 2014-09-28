var fs = require('fs');
var exec = require('child_process').exec, child;

function play(infos) {
	var filmFile = findVideoFile(infos[1]);

	console.log('Le fichier du film est:' + filmFile)

	var command = '"' + vlc() + '" "' + infos[1] + '/'+ filmFile;

	child = exec(command, function (error, stdout, stderr) {
		console.log('stdout: ' + stdout);
		console.log('stderr: ' + stderr);
		if (error !== null) {
			console.log('exec error: ' + error);
		}
	});
}


function findVideoFile (path) {
	var tabFormat = ["avi",
			   "mp4",
			   "mkv"];
	var film;

	var dossier = fs.readdirSync(path);

	for (fichier in dossier) {

		var types = dossier[fichier].split('.');
		var last = types.length;

		var type = types[last - 1];

		for (format in tabFormat) {
			if (type == tabFormat[format]) {
				film = dossier[fichier];

				return film;
			};
		}
	}
}

function vlc () {
	var dataFile = JSON.parse(fs.readFileSync('Data/Data.json', 'utf8'));
	var pathVLC = dataFile.pathVLC;

	return pathVLC;
}