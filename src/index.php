<!DOCTYPE html>
<html>
    <head> 
    	<link rel="stylesheet" type="text/css" href="css/style.css">
        <script type="text/javascript" src="js/app.js"></script>
        <link rel="stylesheet" type="text/css" href="js/libs/fontawesome/css/font-awesome.min.css">
    	<script type="text/javascript" src="js/Script.js"></script>
        <script type="text/javascript" src="js/libs/mustache/mustache.js"></script>
        <script type="text/javascript" src="js/libs/jquery/dist/jquery.min.js"></script>
    </head>

    <body onload="Hello();dragNdrop()">
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
                <input id="recherche2" type="text" results="5" placeholder="Rechercher" />
                
                <div id="br"><i class="fa fa-search"></i></div>
            </div>

            <div class="OptionFilm">
                <ul>
                    <li><i class="fa fa-tag"></i> Action</li>
                    <li><i class="fa fa-tag"></i> Comedie</li>
                    <li><i class="fa fa-tag"></i> Guerre</li>
                    <li><i class="fa fa-tag"></i> Humour</li>
                    <li>...</li>
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


        <div class="Contenu" id="Contenu">
        	
        	<div class="contenu_onglet" id="contenu_onglet_film">
            <span id="error" style="display: none;"></span>
                <div id="tuiles" class="hidden">
                    {{#films}}
                    <article class="Tuile" onclick="javascript:ficheOpen('{{title}}');">
                        <div id="hover">
                            <div id="Lire"><i class="fa fa-eye fa-2x"></i></div>
                            <div class="rating">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                        <img id="Pochette" src="css/guardian.jpg" />
                        <div id="titre"title="{{title}}">{{title}}</div>
                    </article>
                    {{/films}}
                </div>
                
            <div class="FicheFilm" id="fiche">
                <i class="fa fa-times fa-2x" id="closeFiche" onclick="javascript:ficheClose();"></i>
                <img id="Pochette" src="css/captamerica.jpg" />
                <div class="titre" id="titreFicheFilm"></div>
                <div class="Info">
                    <div id="Info">- Info -</div>

                    <div><span>Nom: </span><div style="display:inline;" id="nameFicheFilm"> Captain America</div></div>
                    <div><span>Chemin: </span><div style="display:inline;" id="cheminFicheFilm"></div> </div>
                    <div><span>Acteurs:</span> </div>
                    <div><span>Duree:</span> 1h59</div>
                    <div><span>Qualite:</span> 1080p</div>
                    <div><span>Synopsis:</span></div>
                    <div>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse sagittis arcu vel mi accumsan sagittis. Vestibulum facilisis enim augue.</div>
                </div>
                <div class="rating">
                   <span></span><span></span><span></span><span></span><span></span>
                </div>
                <div class="read"><i class="fa fa-play fa-3x"></i></div>
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
			//-->
		</script>
    </body>      
</html>