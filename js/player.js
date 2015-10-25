      $(document).ready(function() {
   var my_jPlayer = $("#jquery_jplayer"),
            my_playState = $("#jp_container .play-state");
            
        var opt_play_first = false, 
            opt_auto_play = true;
        var first_track = true;

            my_jPlayer.jPlayer({
              ready: function (event) {
         // Hide the volume slider on mobile browsers. ie., They have no effect.
           ready = true;
        if(event.jPlayer.status.noVolume) {
          // Add a class and then CSS rules deal with it.
          $(".jp-gui").addClass("jp-no-volume");
        }
          $(".track-default").click();
      },

      pause: function () {
                    $(this).jPlayer("clearMedia");
                },
        
               volumechange: function(event) {
                if(event.jPlayer.options.muted) {
                    myControl.volume.slider("value", 0);
                } else {
                    myControl.volume.slider("value", event.jPlayer.options.volume);
                }
            }, 

              error: function (event) {
                    if (ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                        // Setup the media stream again and play it.
                        $(this).jPlayer("setMedia", { mp3: $(".active").attr("href")}).jPlayer("play");
                    }
                },

                swfPath: "js/jplayer",
                cssSelectorAncestor: "#jp_container",
                solution:"html,flash",
                supplied: "mp3",
                wmode: "window",
                keyEnabled: true,
         
           });
                myControl = {
                volume: $("#jp_container" + " .jp-volume-slider")
            },
           
              $(".track").click(function(e) {
         $(".track").removeClass( "active" );
         $(this).addClass( "active" );
          my_jPlayer.jPlayer("setMedia", {
        mp3: $(this).attr("href")
       });
          if((opt_play_first && first_track) || (opt_auto_play && !first_track)) {
        my_jPlayer.jPlayer("play");
       }
         first_track = false;
         $(this).blur();
         return false;
         });
  
             myControl.volume.slider({
             animate: "fast",
             max: 1,
             range: "min",
             step: 0.01,
             value: $.jPlayer.prototype.options.volume,
             slide: function(event, ui) {
             my_jPlayer.jPlayer("option", "muted", false);
             my_jPlayer.jPlayer("option", "volume", ui.value);
           }
           });

               });
   