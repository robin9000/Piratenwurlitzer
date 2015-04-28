<!doctype html>
<html><head>
<meta charset="utf-8">
<link href="styles/bootstrap.min.css" rel="stylesheet" type="text/css">
<link href="styles/bootstrap-theme.css" rel="stylesheet" type="text/css">
<link href="styles/perfect-scrollbar.min.css" rel="stylesheet" type="text/css">
<link href="styles/style.css" rel="stylesheet" type="text/css">
<link rel="icon" type="image/vnd.microsoft.icon" href="imgs/favicon.ico">
<title>Kagglscher Piratenplayer</title>
<script src="scripts/jquery-2.1.3.min.js"></script>
<script src="scripts/bootstrap.min.js"></script>
<script src="scripts/progressbar.min.js"></script>
<script src="scripts/id3-minimized.js"></script>
<script src="scripts/wavesurfer.min.js"></script>
<script src="scripts/perfect-scrollbar.min.js"></script>
<script src="scripts/script.js"></script>
</head>
<body>
<nav class="navbar navbar-inverse navbar-fixed-top">
	<div class="navbar-header">
      <a class="navbar-brand navbar-fixed-top" href=".">kaggl<b>.co</b></a>
    </div>
</nav>
<div id="abstand" class="hidden-xs hidden-sm"></div>
<div>
  <audio id="music" preload="metadata">
    <source id="src">
  </audio>
  <section class="section" id="head">
    <div class="container">
      <div class="row">
        <div class="col-md-12 col-lg-12 text-center">
          <div class="row">
            <div id="links">
              <div class="row">
                <div id="forms" class="col-md-3 bg">
                  <form class="form-horizontal" action="player.php" method="post" enctype="multipart/form-data">
                    <legend>Musik hochladen:</legend><p>
                    <input style="margin:auto" type="file" name="fileToUpload" id="fileToUpload">
                    </p><p>
                    <input type="submit" value="Upload" id="uploadbut" name="submit">
                  </form>
                  </p>
                  <p>
                  <?php
	
if(isset($_POST['submit'])) {	
 
$path = "music";
$file = $_FILES['fileToUpload']['name'];
$full = "$path/$file";
$uploadOk = 1;
if (file_exists($full)) {
    echo "Das File existiert bereits<br>";
    $uploadOk = 0;
}
$musicFileType = pathinfo($full,PATHINFO_EXTENSION);
if($musicFileType != "mp3" && $musicFileType != "m4a" && $musicFileType != "ogg") {
    echo "Nur MP3s, OGGs und M4As sind erlaubt (.mp3/.m4a/.ogg muss klein geschrieben sein)";
    $uploadOk = 0;
}
if($uploadOk !== 0){
move_uploaded_file($_FILES['fileToUpload']['tmp_name'], "$full");
echo "Dein File " . $_FILES['fileToUpload']['name'] . " wurde hochgeladen :^)<br>";
}
 
}

 
?></p>
<div id="filler" class="hidden-xs hidden-sm"></div>
                  <span id="bottext"><a target="_blank" href="http://ionicons.com/">Icons</a> - <a target="_blank" href="https://github.com/reddwhite/amadeus">Desginbasis</a></span> </div>
                <div class="col-md-6">
                  <div class="row">
                    <div class="col-md-12">
                      <div id="progress"></div>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-md-12"> Album: <span id="album"></span><br>
                      Filename: <span id="filename"></span><br>
                      Zeit: <span id="time"></span><br>
                      <a id="linklink"><img src="imgs/share.svg"></a> - <a id="down"><img src="imgs/download.svg"></a>
                      </p>
                      <p>
                      <img src="imgs/muted.svg" class="buttons" id="mute">
                      <img type="image" src="imgs/skip-backward.svg" class="buttons" id="back">
                      <img type="image" src="imgs/play2.svg" class="buttons" id="play">
                      <img type="image" src="imgs/skip-forward.svg" class="buttons" id="next">
                      <img type="image" src="imgs/shuffle.svg" class="buttons" id="shuffle">
                      </p>
                    </div>
                  </div>
                </div>
                <!-- /row -->
                <div class="col-md-3 bg">
                  <div id="Liste">
                    <table>
                      <span id="listspan"></span><br>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
</body>
</html>
