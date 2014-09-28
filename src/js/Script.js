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


}
function ficheClose()
{
    document.getElementById('fiche').style.display = 'none';
    document.getElementById(infos[4]).setAttribute("class", "");
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

var tpl;

/*Fonction Hello s'ouvre au chargement de la page et affiche les tuiles*/
function Hello() {
    console.log("Hello");


    var fs = require('fs');

    var filmsList = {};
    var catList = {};
    fs.exists("Data/library2.json", function (exists) {
        if (exists) {
            console.log("library.json found");
            fs.readFile("Data/library2.json", "utf-8", function (err, data) {
            filmsList = JSON.parse(data);
            $('#tuiles').html(Mustache.render($('#tuiles').html(), {films : filmsList})).removeClass('hidden');
            $('#loading').remove();
        });
        } else {
            console.log("library.json not found");
            document.getElementById('error').style.display = 'block';
            $('#loading').remove();
            document.getElementById("error").innerHTML = "Veuillez donner un dossier librairie dans les paramètres";
        };
    });

     fs.exists("Data/category.json", function (exists) {
        if (exists) {
            console.log("category.json found");
            fs.readFile("Data/category.json", "utf-8", function (err, data) {
            catList = JSON.parse(data);
            $('#Cat').html(Mustache.render($('#Cat').html(), {Categories : catList})).removeClass('hidden');
        });
        };
    });
}

/*Affiche les info sur le film*/
function ficheFilm(title){
    var fs = require("fs");
    var dataFilm = JSON.parse(fs.readFileSync('Data/library2.json', 'utf8'));
    infos = [];

    for(i in dataFilm) {
        if (dataFilm[i].title == title) {
            infos[0] = dataFilm[i].title;
            infos[1] = dataFilm[i].path;
            infos[2] = dataFilm[i].img;
            infos[3] = dataFilm[i].synopsis;
            infos[4] = dataFilm[i].note;
        };
    };
    document.getElementById('fiche').style.display = 'block';
    document.getElementById('tuiles').setAttribute("style","-webkit-filter:blur(" + 2 + "px);");
    document.getElementById("titreFicheFilm").innerHTML = title;
    document.getElementById("nameFicheFilm").innerHTML = infos[0];
    document.getElementById("cheminFicheFilm").innerHTML = infos[1];
    console.log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>" + infos[4] + "<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
    document.getElementById(infos[4]).setAttribute("class", "select");
    $('#img').html('<img id="Pochette" src="'+ infos[2] +'" />');
    $('#desc').html(infos[3]);
    $('#infoBulle').html(infos[3]);

}

function displayTags(tag) {
    console.log('tag: ' + tag);
    document.getElementById(anc_tag).setAttribute("style","color: #CCC;");
    document.getElementById(tag).setAttribute("style","color:rgba(140,230,190,0.7);");
    anc_tag = tag;

    if (tag == 'all') {
        var val = '';
    } else {
        var val = tag;
    };

    console.log(val);
    var regexp = '\\b(.*)';
    for(var i in val){
        regexp += '('+val[i]+')(.*)';
    }
    regexp += '\\b';
    $.each($('.categories'), function(i, v){
        var title = $(v).children('#cat').html();
        if(title.match(new RegExp(regexp, 'i'))){
            console.log(title);
            $(this).parent().fadeIn();
        }
        else{
            console.log("Disp " + title);
            $(this).parent().fadeOut();
        }
    });
}