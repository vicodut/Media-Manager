/*Fonction de changement d'onglets : Films / Series / Paramètres*/
function change_onglet(name)
{
	document.getElementById(anc_onglet).className = 'onglet_0 liens';
	document.getElementById(name).className = 'onglet_1 liens';
	document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
	document.getElementById('contenu_onglet_'+name).style.display = 'block';
	anc_onglet = name;
}
var img;

/*Fonctions pour ouvrir et fermer la fiche de détaille des films*/
function ficheOpen(title)
{
    console.log(title);
    ficheFilm(title);
    console.log(img);

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


/*Fonction Hello s'ouvre au chargement de la page et affiche les tuiles*/
function Hello() {
    console.log("Hello");

    var tpl = $('#tuiles').html();
    var fs = require('fs');
    var path = require('path');
    var filmsList = {};

    fs.exists("Data/library2.json", function (exists) {
        if (exists) {
            console.log("library.json found");
            fs.readFile("Data/library2.json", "utf-8", function (err, data) {
                //console.log(data);
                filmsList = JSON.parse(data);
                var tab = [];
                for(var x in filmsList){
                    /*console.log(filmsList[x]);*/
                    tab.push(filmsList[x]);
                }
                $('#tuiles').html(Mustache.render(tpl, {films : filmsList})).removeClass('hidden');
                $('#loading').remove();
            });
        } else {
            console.log("library.json not found");
            document.getElementById('error').style.display = 'block';
            $('#loading').remove();
            document.getElementById("error").innerHTML = "Veuillez donner un dossier librairie dans les paramètres";
        };
    });
}

/*Affiche les info sur le film*/
function ficheFilm(title){
    var fs = require("fs");
    var dataFilm = JSON.parse(fs.readFileSync('Data/library2.json', 'utf8'));
    infos = [];

    for(i in dataFilm) {
        console.log('eee' + dataFilm[i].title);
        if (dataFilm[i].title == title) {
            infos[0] = dataFilm[i].title;
            infos[1] = dataFilm[i].path;
            infos[2] = dataFilm[i].img;
            infos[3] = dataFilm[i].synopsis;
        };
    };

    document.getElementById('fiche').style.display = 'block';
    document.getElementById('tuiles').setAttribute("style","-webkit-filter:blur(" + 2 + "px);");
    document.getElementById("titreFicheFilm").innerHTML = title;
    document.getElementById("nameFicheFilm").innerHTML = infos[0];
    document.getElementById("cheminFicheFilm").innerHTML = infos[1];
    $('#img').html('<img id="Pochette" src="'+ infos[2] +'" />');
    $('#desc').html(infos[3]);

}
