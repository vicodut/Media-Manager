/*Fonction de changement d'onglets : Films / Series / Paramètres*/
function change_onglet(name)
{
    displayTags('all');
	document.getElementById(anc_onglet).className = 'onglet_0 liens';
	document.getElementById(name).className = 'onglet_1 liens';
	document.getElementById('contenu_onglet_'+anc_onglet).style.display = 'none';
	document.getElementById('contenu_onglet_'+name).style.display = 'block';
	anc_onglet = name;
    if (name == "param") {
        document.getElementById('BandeauGauche').setAttribute("style", " transition: margin-left 1.0s ease;margin-left:-140px;");
        document.getElementById('Contenu').setAttribute("style", "margin-left:0px;");
    } else {
        document.getElementById('Contenu').setAttribute("style", "transition: margin-left 0.8s ease;margin-left:140px;");
        document.getElementById('BandeauGauche').setAttribute("style", "transition: margin-left 1.0s ease;margin-left:0px;");
    };
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
function ficheCloseSerie()
{
    document.getElementById('ficheSerie').style.display = 'none';
    document.getElementById(infos[4]).setAttribute("class", "");
    document.getElementById('tuilesSeries').setAttribute("style","-webkit-filter:blur(" + 0 + "px);")
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
    var a = 0;
    var b = 0;
    var films = [];
    var series = [];

    var fs = require('fs');

    var filmsList = {};
    var catList = {};
    fs.exists("Data/library2.json", function (exists) {
        if (exists) {
            console.log("library.json found");
            fs.readFile("Data/library2.json", "utf-8", function (err, data) {
            filmsList = JSON.parse(data);

            for (film in filmsList) {
                console.log(filmsList[film].state);
                if (filmsList[film].state == "Film") {
                    films[a] = filmsList[film];
                    a++;
                } else {
                    series[b] = filmsList[film];
                    b++;
                };

            }

            $('#tuiles').html(Mustache.render($('#tuiles').html(), {films : films})).removeClass('hidden');
            $('#tuilesSeries').html(Mustache.render($('#tuilesSeries').html(), {series : series})).removeClass('hidden');
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
            infos[5] = dataFilm[i].state;
            infos[6] = dataFilm[i].runtime;
        };
    };
    if (infos[5] == "Film") {
        document.getElementById('fiche').style.display = 'block';
        document.getElementById('tuiles').setAttribute("style","-webkit-filter:blur(" + 2 + "px);");
        document.getElementById("titreFicheFilm").innerHTML = title;
        document.getElementById("nameFicheFilm").innerHTML = infos[0];
        document.getElementById("cheminFicheFilm").innerHTML = infos[1];
        document.getElementById(infos[4]).setAttribute("class", "select");
        $('#img').html('<img id="Pochette" src="'+ infos[2] +'" />');
        $('#desc').html(infos[3]);
        $('#infoBulle').html(infos[3]);
        $("#runtime").html(infos[6]);
        document.getElementById("play").onclick = function() { play(infos); };
    } else {
        document.getElementById('ficheSerie').style.display = 'block';
        document.getElementById('tuilesSeries').setAttribute("style","-webkit-filter:blur(" + 2 + "px);");
        document.getElementById("titreFicheSerie").innerHTML = title;
        document.getElementById("nameFicheSerie").innerHTML = infos[0];
        document.getElementById("cheminFicheSerie").innerHTML = infos[1];
        document.getElementById(infos[4]).setAttribute("class", "select");
        $('#imgSerie').html('<img id="Pochette" src="'+ infos[2] +'" />');
        $('#descSerie').html(infos[3]);
        $("#runtimeSerie").html(infos[6]);
        $('#infoBulleSerie').html(infos[3]);
        document.getElementById("play").onclick = function() { play(infos); };
    }
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

function active(elem) {
    $(".boutton").removeClass('active');
    document.getElementById(elem).className = 'boutton active';
}
