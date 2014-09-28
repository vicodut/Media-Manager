<!DOCTYPE html>
<html>
    <head> 
        <meta charset="UTF-8">
    	<link rel="stylesheet" type="text/css" href="css/style.css">
        <script type="text/javascript" src="js/app.js"></script>
        <link rel="stylesheet" type="text/css" href="js/libs/fontawesome/css/font-awesome.min.css">
    	<script type="text/javascript" src="js/Script.js"></script>
        <script type="text/javascript" src="js/findData.js"></script>
        <script type="text/javascript" src="js/libs/mustache/mustache.js"></script>
        <script type="text/javascript" src="js/libs/jquery/dist/jquery.min.js"></script>
        
    </head>

    <body onload="Hello();dragNdrop(); ">

        

    	<div class="Tittle">
    		<p> Bibliotheque films / series. </p>
            <span id="window-buttons">
                <span id="button-close" class="button" onclick="window.close()"></span>
                <span id="button-maximize" class="button" onclick="toggleMaximize()"></span>
                <span id="button-minimize" class="button" onclick="win.minimize();"></span>
            </span>
    	</div>

        <div class="BandeauGauche">
            <div class="Recherche2">
                <input id="menu-search-input" type="text" placeholder="Rechercher" />
                <div id="br"><i class="fa fa-search"></i></div>
            </div>
            <div class="OptionFilm">
                <ul>
                <div id="Cat" class="hidden">
                    <li onclick="displayTags('all')" class="tag" id="all"><i class="fa fa-tags"></i>ALL</li>
                    {{#Categories}}
                    <li onclick="displayTags('{{cat}}')" class="tag" id="{{cat}}"><i class="fa fa-tag"></i>{{cat}}</li>
                    {{/Categories}}
                </div>
                    <!-- <li><i class="fa fa-tag"></i> Action</li>
                    <li><i class="fa fa-tag"></i> Comedie</li>
                    <li><i class="fa fa-tag"></i> Guerre</li>
                    <li><i class="fa fa-tag"></i> Humour</li>
                    <li>...</li> -->
                </ul>
            </div>
        </div>
        
        <div class="Bandeau">
            <span id="Switch">
                <span class ="onglet_0 liens" id="film"  onclick="javascript:change_onglet('film');"> <span class="lien"><i class="fa fa-film fa-2x "></i></span></span>
                <span class ="onglet_0 liens" id="serie" onclick="javascript:change_onglet('serie');"><span class="lien"><i class="fa fa-desktop fa-2x"></i></span></span>
                <span class ="onglet_0 liens" id="param" onclick="javascript:change_onglet('param');"><span class="lien"><i class="fa fa-sliders fa-2x"></i></span></span>
            </span>
        </div>
        <div class="Bandeau2"></div>
        <div id="loadData" style="display: none;"></div>

        <div class="Contenu" id="Contenu">
        	
        	<div class="contenu_onglet" id="contenu_onglet_film">
            <span id="error" style="display: none;"></span>
                <div id="loading"> Chargement...</div>
                <div id="tuiles" class="hidden">
                    {{#films}}
                    <article class="Tuile"onclick='javascript:ficheOpen("{{title}}");'>
                        <div id="hover">
                            <div id="Lire"><i class="fa fa-eye fa-4x"></i></div>
                            <div class="rating">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                        <div id="Pochette"><img  src="{{img}}" /></div>
                        <div class="title" id="titre"title="{{title}}">{{title}}</div>
                        <div class="categories" style="display: none;"><i id="cat">{{#genres}}{{name}} {{/genres}}</i></div>
                    </article>
                    {{/films}}
                </div>
                
            <div class="FicheFilm" id="fiche">

                <i class="fa fa-times fa-2x" id="closeFiche" onclick="javascript:ficheClose();"></i>
                <span id="img"><img id="Pochette" src="css/captamerica.jpg" /></span>
                <div class="titre" id="titreFicheFilm"></div>
                <div class="Info">
                    <div id="Info">- Info -</div>

                    <div class="rating">
                       <span style="display: none;" id='N.C.'></span><span style="display: none;" id="0"></span><span id="5"></span><span id="4"></span><span id="3"></span><span id="2"></span><span id="1"></span>
                    </div>
                    <div id="contenuInfo"><span>Nom: </span><div style="display:inline;" id="nameFicheFilm"> Captain America</div></div>
                    <div id="contenuInfo"><span>Chemin: </span><div style="display:inline;" id="cheminFicheFilm"></div> </div>
                    <div id="contenuInfo"><span>Acteurs:</span> </div>
                    <div id="contenuInfo"><span>Duree:</span> 1h59</div>
                    <div id="contenuInfo"><span>Synopsis:</span></div>
                    <div id="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis arcu vel mi accumsan sagittis. Vestibulum facilisis enim augue.</div>
                    <div id="infoBulle"> N.C. </div>
                </div>
                
                <div class="read"><i id="Plus" class="fa fa-wrench fa-3x"></i><i class="fa fa-play fa-3x"></i></div>
                </div>
            </div>

            <div class="contenu_onglet" id="contenu_onglet_serie">Contenu de l'onglet serie</div>

            
            <div class="contenu_onglet" id="contenu_onglet_param">
                <div id="dropFolder"><p id="dropTxt">
                Drop un Dossier pour changer le dossier de bibliotheque ;)  </p>
                </div>
                <script type="text/javascript" src="js/Drop.js"></script>
            </div>

        <script type="text/javascript">
			//<!--
			var anc_onglet = 'film';
			change_onglet(anc_onglet);
            var anc_tag = 'all'
			//-->
		</script>
        <script type="text/javascript" src="js/search.js"></script>

    </body>      
</html>