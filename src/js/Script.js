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


function Hello() {
    document.getElementById('tuiles').style.display = 'none';
    var fs = require('fs');
    var path = require('path');
    var tpl = $('#contenu_onglet_film').html();
    var filmsList = {};

    fs.exists("Data/library.json", function (exists) {
        if (exists) {
            console.log("library.json found");
            fs.readFile("Data/library.json", "utf-8", function (err, data) {
                console.log(data);
                filmsList = JSON.parse(data);
                $('#contenu_onglet_film').html(Mustache.render(tpl, {films : filmsList})).removeClass('hidden');
                document.getElementById('tuiles').style.display = 'inline-block';
            });
        } else {
            console.log("library.json not found");
            document.getElementById('tuiles').style.display = 'none';
            document.getElementById('error').style.display = 'block';
            document.getElementById("error").innerHTML = "Veuillez donner un dossier librairie dans les paramètre";
        };
    });
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