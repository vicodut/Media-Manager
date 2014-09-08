/*Fonction de changement d'onglets : Films / Series / Paramètres*/
function change_onglet(name)
{
	document.getElementById(anc_onglet).className = 'onglet_0 liens';
	document.getElementById(name).className = 'onglet_1 liens';
	document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
	document.getElementById('contenu_onglet_'+name).style.display = 'block';
	anc_onglet = name;
}

/*Fonctions pour ouvrir et fermer la fiche de détaille des films*/
function ficheOpen(title)
{
    console.log(title);
    ficheFilm(title);
    document.getElementById('fiche').style.display = 'block';
    document.getElementById('tuiles').setAttribute("style","-webkit-filter:blur(" + 2 + "px);")
}
function ficheClose()
{
    document.getElementById('fiche').style.display = 'none';
    document.getElementById('tuiles').setAttribute("style","-webkit-filter:blur(" + 0 + "px);")
}

/*Determine l'état de la fenètre pour soit la reduire soit plein ecran*/
var isMaximized = false;

/* init routines/watchers/listeners */
win.on('maximize', function() {
    isMaximized = true;
});
win.on('unmaximize', function() {
    isMaximized = false;
});
function toggleMaximize () {
    if (isMaximized === true) {
        win.unmaximize();
    } else {
        win.maximize();
    }
}


/*function Hello() {
    var fs = require('fs');
    var path = require('path');
    
    var data = JSON.parse(fs.readFileSync('Data/Data.json', 'utf8'));

    var filmsFolder = data.path;
    var filmsList = [];
    var tpl = $('#contenu_onglet_film').html();

    function getDirectories() {
        return fs.readdirSync(filmsFolder).filter(function (file) {
        return fs.statSync(path.join(filmsFolder, file)).isDirectory();
        });
    }

    var dirs = getDirectories();

    for(var i in dirs){
        filmsList[i] = {"title": dirs[i]};
    }

    console.log(filmsList);
    $('#contenu_onglet_film').html(Mustache.render(tpl, {films : filmsList})).removeClass('hidden');
}*/


function Hello() {
    var fs = require('fs');
    var path = require('path');
    var tpl = $('#contenu_onglet_film').html();

    console.log(fs.existsSync("Data/library.json"));
    if(fs.existsSync("Data/library.json")) {
        var data = JSON.parse(fs.readFileSync('Data/Data.json', 'utf8'));
        $('#contenu_onglet_film').html(Mustache.render(tpl, {films : data})).removeClass('hidden');
    } else {
        
        document.getElementById('tuiles').setAttribute("style","display:none;");
        document.getElementById('Contenu').setAttribute("style","text-align:center;");
        document.getElementById('error').setAttribute("style","display:inline;");
        document.getElementById("error").innerHTML = "Parametres le fichier de librarie";
    }
    


}


function ficheFilm(name){
    var fs = require("fs");
    var data = JSON.parse(fs.readFileSync('Data/Data.json', 'utf8'));
    var Folder = data.path;

    document.getElementById("titreFicheFilm").innerHTML = name;
    document.getElementById("nameFicheFilm").innerHTML = name;
    document.getElementById("cheminFicheFilm").innerHTML = Folder + "\\" + name;
}

function readData() {
    var fs = require("fs");

    var data = JSON.parse(fs.readFileSync('Data/Data.json', 'utf8'));

    console.log("Path = " + data.path);
}