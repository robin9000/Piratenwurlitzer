$(document).ready(function() {
        var tags;
        var dir = "music/";
        var fileextension = ".mp3";
        var filenames = new Array();
		var filetitles = new Array();
        var i=0;
        var j=0;
		var shuffle = false;
		var m;
        var isPaused;
        var audio = $("#music");
		var line = new ProgressBar.Line('#progress', {
    		strokeWidth: 12,
			color: '#FCB03C',
			text: {
				color: '#000'
			}
			});
		var d_sec=0;
		var c_sec=0;
		var dur;
		var cur;
		var name;
		var y=0;
		var wavesurfer = Object.create(WaveSurfer);

	wavesurfer.init({
    	container: document.querySelector('#abstand'),
    	waveColor: 'rgba(252,176,60,0.5)',
    	progressColor: '#FCB03C'
	});

	wavesurfer.on('ready', function () {
   		wavesurfer.setVolume(0);
		wavesurfer.seekTo(audio[0].currentTime/audio[0].duration);
		if(!$("#music").get(0).paused) {
			wavesurfer.play();
		}
	});

        $.ajax({
            url: dir,
            success: function(result){
                $(result).find("a").each(function() {
					if(y<5){
						y++;
					}else{
                    filenames[i] = $(this).attr("href").replace(/%20/g," ").replace(/%27/g,"'");
                    i++;
					}
                });
				
				m = i;
                line.setText(filenames[j].replace(".mp3",'').replace(".ogg",'').replace(".m4a",''));
                $("#src").attr("src", (dir+filenames[0]));
				if(filenames[j].substring(filenames[j].length-4,filenames[j].length) === ".mp3" || filenames[j].substring(filenames[j].length-4,filenames[j].length) === ".m4a") {
				$("#src").attr("type","audio/mpeg");
			}else if(filenames[j].substring(filenames[0].length-4,filenames[j].length) === ".ogg") {
				$("#src").attr("type","audio/ogg");
			}
				$("#down").attr("href",(dir+filenames[0]));
				
                audio[0].pause();
                audio[0].load();
            }});
			function titlefresh(){
				var titel;
			ID3.loadTags(dir+filenames[j], function() {
   				var tags = ID3.getAllTags(dir+filenames[j]);
				if(tags.artist !== undefined) {
					titel = tags.artist + " - ";
				}else{
					titel = "";
				}
				if(tags.title === undefined) {
                	titel = filenames[j].replace(".mp3",'').replace(".m4a",'').replace(".ogg",'');
					$("title").text(titel+" - kaggl.co");
				}else{
					titel += tags.title;
					$("title").text(tags.title+" - kaggl.co");
				}
				if(tags.album !== undefined) {
					$("#album").text(tags.album);
				}else{
					$("#album").text("Keine Angabe");
				}
				$("#filename").text(filenames[j]);
				line.setText(titel);
				$("#linklink").attr("href","player.php?song="+filenames[j].replace(/ /g, "%20").replace(/'/g,"%27"));
				$("#down").attr("href", dir+(filenames[j].replace(/ /g,"%20").replace(/'/g,"%27")));
			});
		}
		function musicfresh() {
			$("#src").attr("src", dir+filenames[j]);
			wavesurfer.load(dir+filenames[j]);
			if(filenames[j].substring(filenames[j].length-4,filenames[j].length) === ".mp3" || filenames[j].substring(filenames[j].length-4,filenames[j].length) === ".m4a") {
				$("#src").attr("type","audio/mpeg");
			}else if(filenames[j].substring(filenames[j].length-4,filenames[j].length) === ".ogg") {
				$("#src").attr("type","audio/ogg");
			}
			titlefresh();
			
            if($("#music").get(0).paused) {
                isPaused=true;
            }else{
                isPaused=false;
            }
			audio[0].load();
            if(isPaused===false) {
                audio[0].play();   
            }
		}
		function next() {
			if(shuffle) {
				j=Math.floor(Math.random()*i);
			}else{
			if(j===(i-1)){
                j=0;
            }else{
                j++;
            }
			}
			musicfresh();
		}
			$("#next").click(function() {
            next();
        });
        $("#back").click(function() {
            if(j>0){
                j--;
            }else{
                j=i-1;
            }
            musicfresh();
        });
        $("#play").click(function() {
            if($("#music").get(0).paused) {
                audio[0].play();
				$("#play").attr("src", "imgs/pause.svg");
				wavesurfer.play();
            }else{
                audio[0].pause();
				$("#play").attr("src", "imgs/play2.svg");
				wavesurfer.pause();
            }          
        });
        $("#mute").click(function() {
			if(music.muted){
		       	music.muted = false;
				$("#mute").attr("src", "imgs/muted.svg");
   			} else {
				music.muted = true;
				$("#mute").attr("src", "imgs/unmuted.svg");
			}
		});
		$("#uploadbut").click(function(e) {
            $("#forms").append("<img src=\"../imgs/loading.gif\">");
        });
				
				function list() {
					$("#listspan").text('');
					for(var n = 0; n < filenames.length; n++) {
						if(filenames[n].indexOf(".mp3") >= 0 || filenames[n].indexOf(".ogg") >= 0 || filenames[n].indexOf(".m4a") >= 0) {
						$("#listspan").append("<a href=\"player.php?song="+ filenames[n] + "\"><img class=\"play\" src=\"imgs/play.svg\"></a> ");
						$("#listspan").append(filenames[n].replace(".mp3",'').replace(".ogg",'').replace(".m4a",'')+"<br>");
						}
					}
				}
		setInterval(function() {
			d_sec = Math.floor(audio[0].duration);
			c_sec = Math.floor(audio[0].currentTime);
			line.set(audio[0].currentTime/audio[0].duration);
			$("#time").text(convert(c_sec)+"/"+convert(d_sec)+" (-"+convert(-(c_sec-d_sec))+", "+(100*audio[0].currentTime/audio[0].duration).toFixed(1)+"%)");
			//line.setText(c_sec + " / " + d_sec);
			if(audio[0].currentTime === audio[0].duration) {
				next();
				audio[0].play();
			}
			},50);
				
			function preload() {
				var get = window.location.href.substring(window.location.href.indexOf("?song=")+6, window.location.href.length);
				get = get.replace(/%20/g," ").replace(/%27/g,"'");
				if(get.substring(get.length-4,get.length) === ".mp3" || get.substring(get.length-4,get.length) === ".m4a" || get.substring(get.length-4,get.length) === ".ogg") {
					for(var s = 0; s< filenames.length;s++) {
						if(get === filenames[s]) {
							j=s;	
						}
					}
					musicfresh();
            		audio[0].play();
					$("#play").attr("src", "imgs/pause.svg");
					wavesurfer.play();
				}else{
					j=0;
					titlefresh();
            		audio[0].pause();
					wavesurfer.pause();
				}
			}
			wavesurfer.on('seek', function () {
                audio[0].currentTime = wavesurfer.getCurrentTime();
            });
			function convert(sec) {
				var min =0;
				while(sec >= 60) {
					sec -= 60;
					min++;
				}
				if(sec < 10) {
					sec="0"+sec;
				}
				return (min+":"+sec);
			}
		$(document).ajaxStop(function () {
			list();
			preload();
			wavesurfer.load(dir+filenames[0]);
		});
		$('#shuffle').click(function() {
			if(shuffle) {
				shuffle = false;
				$("#shuffle").removeClass("bg");
			}else{
				shuffle = true;
				$("#shuffle").addClass("bg");
			}
		});
		$("#Liste").perfectScrollbar({suppressScrollX:true});
    });