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
function ficheOpen()
{
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

function getDirectories() {
    var fs = require('fs');

    return fs.readdirSync("C:\\Users\\Victor\\Documents\\Programation\\Node - WebKit\\MedLib\\src").filter(function (file) {
       return fs.statSync(file).isDirectory();
    });
}

function Hello(){

    var fs = require('fs');
    var path = require('path');
    var filmsFolder = "C:\\Users\\Victor\\Videos";
    var filmsList = [];

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
    $('#contenu_onglet_film').html(Mustache.render($('#contenu_onglet_film').html(), {films : filmsList}));
}
