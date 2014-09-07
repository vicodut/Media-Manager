<!DOCTYPE html>
<html>
    <head> 
    	<link rel="stylesheet" type="text/css" href="css/style.css">
        <script type="text/javascript" src="js/app.js"></script>
        <link rel="stylesheet" type="text/css" href="js/libs/fontawesome/css/font-awesome.min.css">
    	<script type="text/javascript" src="js/Script.js"></script>
        <script type="text/javascript" src="js/jquery-2.1.1.min.js"></script>
        <script type="text/javascript" src="js/libs/mustache/mustache.js"></script>
        <script type="text/javascript" src="js/libs/jquery/dist/jquery.min.js"></script>
    </head>

    <body onload="Hello();">
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

        <div class="Contenu">
        	
        	<div class="contenu_onglet" id="contenu_onglet_film">

                <div id="tuiles">
                    {{#films}}
                    <div class="Tuile" onclick="javascript:ficheOpen();">
                        <div id="hover">
                            <div id="Lire"><i class="fa fa-eye fa-2x"></i></div>
                            <div class="rating">
                                <span></span><span></span><span></span><span></span><span></span>
                            </div>
                        </div>
                        <img id="Pochette" src="css/guardian.jpg" />
                        <div id="titre"title="{{title}}">{{title}}</div>
                    </div>
                    {{/films}}
                </div>
                
            <div class="FicheFilm" id="fiche">
                <i class="fa fa-times fa-2x" id="closeFiche" onclick="javascript:ficheClose();"></i>
                <img id="Pochette" src="css/captamerica.jpg" />
                <div id="titre"> Captain America</div>
                <div class="Info">
                    <div id="Info">- Info -</div>

                    <div><span>Nom:</span> Captain America</div>
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

            <div class="contenu_onglet" id="contenu_onglet_serie">Contenu de l'onglet serie
            <input type="file" multiple webkitdirectory mozdirectory msdirectory odirectory directory /> </div>

            <div class="contenu_onglet" id="contenu_onglet_param">Contenu de l'onglet param</div>

        <script type="text/javascript">
			//<!--
			var anc_onglet = 'film';
			change_onglet(anc_onglet);
			//-->
		</script>
    </body>      
</html>