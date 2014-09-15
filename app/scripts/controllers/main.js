'use strict';

angular.module('tubeziqApp')
    //Refactor in youtube service
    .filter('extractYouTubeCode', ['$sce', function ($sce) {
        return function (url) {
            var code = url.split('&')[0].split('=')[1];
            return code;
        };
    }])

    .controller('MainCtrl', function ($scope, $http, $filter, $window, $timeout, utilFactory, services) {

        var playAudio = true;
        var params = { allowScriptAccess: "always" };
        var atts = { id: "myytplayer" };
        swfobject.embedSWF("http://www.youtube.com/v/bHQqvYy5KYo?enablejsapi=1&playerapiid=ytplayer&version=3",
            "ytapiplayer", "425", "356", "8", null, null, params, atts);
        var time = 0;
        var elapsedTime = 0;
        var durationTime = 0;
        var duration = 0;
        var elSearch = $('#search');

        $scope.term = ''; //Pre populate for easy testing
        $scope.playIcon = 'fa-play';
        $scope.muteIcon = 'fa-volume-up';
        $scope.timer;
        $scope.elapsedTime = '0:00 / 0:00';

        //On keydown spacebar play and pause playback
        angular.element($window).on('keydown', function (e) {

            if (e.keyCode === 32 && $scope.songs && !elSearch.is(":focus")) {
                $scope.$apply(function () {
                    $scope.play();
                });
                return false; // To prevent scroll down page
            }
        });

        $scope.skip = function (action) {
            var newIndex = 0;
            if (action == 'forward') {
                newIndex = $scope.selectedIndex + 1;
            }
            else {
                newIndex = $scope.selectedIndex - 1;
            }

            $scope.loadSong(newIndex);
        };

        //Refactor to youtube service
        $scope.playerStatus = function () {
            return{
                isDone: ytplayer.getPlayerState() === 0,
                isPlaying: ytplayer.getPlayerState() === 1,
                isPaused: ytplayer.getPlayerState() === 2,
                isBuffering: ytplayer.getPlayerState() === 3
            };
        };

        $scope.runEverySecond = function () {
            // Display playback time and duration
            $scope.elapsedTime = $scope.getCurrentTime();

            // When done play next song
            if ($scope.playerStatus().isDone) {
                $scope.skip('forward');
            }

            // Update playback time every second
            $scope.timer = $timeout($scope.runEverySecond, 1000);
        };

        // Display playback time and duration
        $scope.getCurrentTime = function () {
            time = utilFactory.secondsToMinutes(ytplayer.getCurrentTime());
            elapsedTime = time.minutes.toFixed() + ':' + time.seconds.toFixed();

            durationTime = utilFactory.secondsToMinutes(ytplayer.getDuration());
            duration = durationTime.minutes.toFixed() + ':' + durationTime.seconds.toFixed();
            ;
            return elapsedTime + ' / ' + duration;
        };

        // Refactor in youtube service
        $scope.getYouTubeUrl = function (index) {
            var url = $scope.songs[index].link[0].href;
            return url;
        }

        // Load song selected from search results
        $scope.loadSong = function (index) {
            var songUrl = $scope.getYouTubeUrl(index);
            var songCode = $filter('extractYouTubeCode')(songUrl);
            $scope.selectedIndex = index;
            $scope.showControls = true;
            $scope.playIcon = 'fa-pause';
            myytplayer.loadVideoById(songCode, 5, "large")
            playAudio = false;

            $scope.runEverySecond();
            $scope.songTitle = $scope.songs[index].title.$t
        };

        // Play and pause
        $scope.play = function () {
            if (playAudio) {
                $scope.playIcon = 'fa-pause';
                ytplayer.playVideo();
                $scope.runEverySecond();
                playAudio = false;
            }
            else {
                clearTimeout($scope.timer);
                $scope.playIcon = 'fa-play';
                ytplayer.stopVideo();
                playAudio = true;
            }
        };

        // Mute playback
        $scope.mute = function () {
            if (ytplayer.isMuted()) {
                $scope.muteIcon = 'fa-volume-up';
                ytplayer.unMute();
            }
            else {
                $scope.muteIcon = 'fa-volume-off';
                ytplayer.mute();
            }
        };

        $scope.search = function () {
            // Validate
            if (!$scope.term.length) {
                return
            }
            $scope.selectedIndex = -1;
            var options = {searchTerm: $scope.term, maxResults: 20 }

            services.search(options)
                .success(function (data, status, headers, config) {
                    $scope.songs = data.feed.entry;
                }).
                error(function (data, status, headers, config) {
                });

        };
    });
