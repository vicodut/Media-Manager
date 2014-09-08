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
	drop.ondrop = function  (e) {

		e.preventDefault;
		for (var i = 0; i < e.dataTransfer.files.length; ++i) {
			var Folder =  e.dataTransfer.files[i].path;
			console.log(Folder);
		};

		var isDir = fs.statSync(Folder);
		console.log(isDir.isDirectory());

		if (isDir.isDirectory()) {
			document.getElementById('dropFolder').setAttribute("style","border-color:rgb(130, 220, 135);background-color:rgba(130, 220, 135, 0.2);");
			save(Folder);
			txt.innerHTML = "Thanks New Folder is: " + Folder;
		} else {
			document.getElementById('dropFolder').setAttribute("style","background-color:rgba(220, 130, 135,0.2);style","border-color:rgb(220, 130, 135);")
			txt.innerHTML = "Please Drop a Folder";
		};


	}
}

function save (Folder) {
    var fs = require('fs');

    var path = require('path');

    var filmsList = {};

    var tpl = $('#contenu_onglet_film').html();

    function getDirectories() {
        return fs.readdirSync(Folder).filter(function (file) {
        return fs.statSync(path.join(Folder, file)).isDirectory();
        });
    }

    var dirs = getDirectories();

    for(var i in dirs){
        filmsList[dirs[i]] = {"title": dirs[i], "path" : Folder + "\\" + dirs[i]};
    }

    var filmsList_str = JSON.stringify(filmsList);
    console.log(filmsList_str);

    fs.writeFileSync("Data\\library.json", filmsList_str, "UTF-8");

}
