var Folder;
var nmFilm;
var compteur;
var filmsList = [];


function dragNdrop () {
	var fs = require("fs");
	var txt = document.querySelector("#dropTxt");

	window.ondragover = window.ondrop = function(e) { e.preventDefault(); return false;}

	var drop = document.querySelector('#dropFolder');

	drop.ondragover = function () {
		this.className = "hover";
		document.getElementById('dropFolder').setAttribute("style","background-color:rgba(135, 130, 220,0.2);style","border-color:rgb(135, 130, 220);")
		txt.innerHTML = "Drop the Folder";
		return false;
	}
	drop.ondragleave = function () {
		this.className = "";
		txt.innerHTML = "Drop Folder here ;) ";
		return false;
	}
	drop.ondrop = function (e) {
		compteur = 0;
		e.preventDefault;
		remove ();
		for (var i = 0; i < e.dataTransfer.files.length; ++i) {
			Folder =  e.dataTransfer.files[i].path;
			console.log(Folder);
		};

		var isDir = fs.statSync(Folder);
		console.log(isDir.isDirectory());

		if (isDir.isDirectory()) {
			document.getElementById('dropFolder').setAttribute("style","border-color:rgb(130, 220, 135);background-color:rgba(130, 220, 135, 0.2);");
			save(Folder);
			txt.innerHTML = "<br /><br /><br />Thanks New Folder is: " + Folder + " <br /> Mis à jour faite.";
			document.getElementById('error').style.display = 'none';
		} else {
			document.getElementById('dropFolder').setAttribute("style","background-color:rgba(220, 130, 135,0.2);style","border-color:rgb(220, 130, 135);")
			txt.innerHTML = "Please Drop a Folder";
		};


	}
}

function save (Folder) {
    var fs = require('fs');
    var path = require('path');

    var filmsList = [];

    function getDirectories() {
        return fs.readdirSync(Folder).filter(function (file) {
        return fs.statSync(path.join(Folder, file)).isDirectory();
        });
    }

    var dirs = getDirectories();

    nbFilm = dirs.length;

    for(var i in dirs){
    	findData(dirs[i], i);
    	console.log("TOUR " + i + "  " + dirs[i]);
    }
}

function list (data,Tour) {
	fs = require("fs");

	compteur++;

	filmsList[Tour] = {"title": data[0], "path" : Folder + "\\" + data[0], "img" : data[1], "synopsis" : data[2]};

	console.log(compteur + ' ' +nbFilm);

	if (compteur == nbFilm) {
		var filmsList_str = JSON.stringify(filmsList);
		fs.writeFileSync("Data\\library2.json", filmsList_str, "UTF-8");
		$('#tuiles').html('{{#films}} <article class="Tuile" onclick="javascript:ficheOpen("{{title}}");"> <div id="hover"> <div id="Lire"><i class="fa fa-eye fa-2x"></i></div> <div class="rating"> <span></span><span></span><span></span><span></span><span></span> </div> </div> <div id="Pochette"><img  src="{{img}}" /></div> <div id="titre"title="{{title}}">{{title}}</div> </article> {{/films}}');
		Hello();
	};
}

function remove () {
	var fs  = require('fs');  
	var dir = 'Data/Img'; 

	fs.readdirSync(dir).forEach(function(file,index){
     	var curPath = dir + "/" + file;
    	fs.unlinkSync(curPath);
    });


} 