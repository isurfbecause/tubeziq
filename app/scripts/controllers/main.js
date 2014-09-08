'use strict';

angular.module('tubeziqApp')
    .filter('code', ['$sce', function ($sce) {
        return function(url) {
            var code = url.split('&')[0].split('=')[1];
            return code;
        };
    }])

    .controller('MainCtrl', function ($scope,$http,$filter,utilFactory,services) {
        var playAudio   = true;
        var params      = { allowScriptAccess: "always" };
        var atts        = { id: "myytplayer" };
        swfobject.embedSWF("http://www.youtube.com/v/bHQqvYy5KYo?enablejsapi=1&playerapiid=ytplayer&version=3",
                           "ytapiplayer", "425", "356", "8", null, null, params, atts);
        
        $scope.term     = 'chillstep';
        $scope.playIcon = 'fa-play';
        $scope.muteIcon = 'fa-volume-up';
        $scope.timer;

        var time         = 0;
        var elapsedTime  = 0;
        var durationTime = 0;
        var duration     = 0;

        // Display current playback time
        $scope.getCurrentTime = function(){
            
            // If digest not in progress, apply
            if(!$scope.$$phase) {
                $scope.$apply(function(){
                    time = utilFactory.secondsToMinutes( ytplayer.getCurrentTime() );
                    elapsedTime = time.minutes.toFixed() + ':' + time.seconds.toFixed();

                    durationTime = utilFactory.secondsToMinutes( ytplayer.getDuration() );          
                    duration  = durationTime.minutes.toFixed() + ':' + durationTime.seconds.toFixed();;          
                    $scope.elapsedTime = elapsedTime + ' / ' + duration;
                })
            }
            
            // Update playback time every second
            $scope.timer = setTimeout($scope.getCurrentTime, 1000);
        };

        // Load song selected from search results
        $scope.loadSong = function( code ){
            $scope.selected = code;
            code                = $filter('code')(code);
            $scope.showControls = true;
            $scope.playIcon     = 'fa-pause';
            myytplayer.loadVideoById(code, 5, "large")
            playAudio           = false;

            $scope.getCurrentTime();
        };

        // Play and pause
        $scope.play = function(){
            if(playAudio){
                $scope.playIcon = 'fa-pause';
                ytplayer.playVideo();                            
                $scope.getCurrentTime();
                playAudio = false;
            }
            else{
                clearTimeout($scope.timer);
                $scope.playIcon = 'fa-play';
                ytplayer.stopVideo();
                playAudio = true;
            }
        };

        // Mute playback
        $scope.mute = function(){
            if( ytplayer.isMuted() ) {
                $scope.muteIcon = 'fa-volume-up';
                ytplayer.unMute();
            }
            else{
                $scope.muteIcon = 'fa-volume-off';
                ytplayer.mute();
            }  
        };

        $scope.search = function(){
            var options = {searchTerm: $scope.term, maxResults:20 }

            services.search( options )
                .success(function(data, status, headers, config) {
                    $scope.songs = data.feed.entry;
                }).
               error(function(data, status, headers, config) {
               });
            
    };
  });
