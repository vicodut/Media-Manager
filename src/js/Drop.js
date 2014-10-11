var Folder;
var nmFilm;
var compteur;
var compteurImg;
var filmsList = [];
var categorieList = [];
var a;
var txt = document.querySelector("#dropTxt");

function dragNdrop () {
	var fs = require("fs");
	compteurImg = 0;

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
		a = 0;

		if (isDir.isDirectory()) {
			document.getElementById('dropFolder').setAttribute("style","border-color:rgb(130, 220, 135);background-color:rgba(130, 220, 135, 0.2);");
			save(Folder);
			document.getElementById('loadData').style.display = 'block';
			txt.innerHTML = "<br /><br /><br />Thanks New Folder is: " + Folder + " <br /> Mise à jour en cours.<br /> Merci de patienter.";
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
    	serie = isSerie(dirs[i]);
    	
    	if (serie == "true") {
    		findDataSerie(isVO(dirs[i]), i);
    	}else {
    		findData(dirs[i], i);
    	};
    	console.log("TOUR " + i + "  " + dirs[i]);
    }
}

function list (data,Tour) {
	fs = require("fs");

	compteur++;

	filmsList[Tour] = {"title": data[0], "path" : Folder + "\\" + data[0], "img" : data[1], "synopsis" : data[2], "note" : data[3], "genres" : data[4], "state" : data[5], "runtime" : data[6]};
	catList = categories(data[4], Tour);
	var genre = [];
	if (compteur == nbFilm) {
		var filmsList_str = JSON.stringify(filmsList);
		fs.writeFileSync("Data\\library2.json", filmsList_str, "UTF-8");

		for (var i = catList.length - 1; i >= 0; i--) {
			if(catList[i] != '') {
			genre[i] = {'cat' : catList[i]};
			}
		};
		var catList_str = JSON.stringify(genre);
		fs.writeFileSync("Data\\category.json", catList_str, "UTF-8");
		$('#tuiles').html('{{#films}} <article class="Tuile" onclick="javascript:ficheOpen("{{title}}");"> <div id="hover"> <div id="Lire"><i class="fa fa-eye fa-4x"></i></div> <div class="rating"> <span></span><span></span><span></span><span></span><span></span> </div> </div> <div id="Pochette"><img  src="{{img}}" /></div> <div id="titre"title="{{title}}">{{title}}</div> </article> {{/films}}');
		$('#Cat').html('{{#Categories}}<li><i class="fa fa-tag"></i>{{cat}}</li>{{/Categories}}');
		$('#tuilesSeries').html('{{#series}} <article class="Tuile" onclick="javascript:ficheOpen("{{title}}");"> <div id="hover"> <div id="Lire"><i class="fa fa-eye fa-4x"></i></div> <div class="rating"> <span></span><span></span><span></span><span></span><span></span> </div> </div> <div id="Pochette"><img  src="{{img}}" /></div> <div id="titre"title="{{title}}">{{title}}</div> </article> {{/series}}');
		Hello();
		document.getElementById('loadData').style.display = 'none';
		txt.innerHTML = "<br /><br /><br />Thanks New Folder is: " + Folder + " <br /> Mis à jour effectuée.";
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

function categories (cat, Tour) {
	var present;
	var tab = [];
	for (var i = cat.length - 1; i >= 0; i--) {
		console.log(cat[i].name);
		var result = 0;
		if (cat[i].name != undefined ) {
			for (var y = categorieList.length - 1; y >= 0; y--) {
				if (categorieList[y] == cat[i].name) {
					result++;
				};
			};
			if (result == 0) {
				categorieList[a] = cat[i].name;
				a++;
			};
			
		}	
	};

	return categorieList.sort();
}

function isSerie(nomDossier) {
	var nomSplit = nomDossier.split(" ");

	if (nomSplit[0] == "Serie") {
		return "true";
	} else 
	{
		return "false";
	};
}
function isVO(nomDossier) {
	var nomSplit = nomDossier.split(" ");
	var length = nomSplit.length;

	if (nomSplit[length - 1] == "VO") {
		console.log('VO');
		var name = nomDossier.replace("- VO", "");
		return name;
	} else 
	{
		console.log('VF');
		return nomDossier;
	};
}