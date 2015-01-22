'use strict';

angular.module('tq.player')
    .controller('playerController', function ($scope, $http, $filter, $window, $timeout, utilFactory, services) {

        var playAudio = true;
        var time = 0;
        var elapsedTime = 0;
        var durationTime = 0;
        var duration = 0;
        var elSearch = $('#search');

        $scope.term = ''; //Pre populate for easy testing
        $scope.playIcon = 'fa-play';
        $scope.muteIcon = 'fa-volume-up';
        $scope.timer = 0;
        $scope.elapsedTime = '0:00 / 0:00';

        $scope.autocomplete = function(){
            var searchTimeout = null;

            //Cancel timeout if exists
            if(searchTimeout){
                $timeout.cancel(searchTimeout);
            }

            //Call search() after timeout duration
            searchTimeout = $timeout(function(){
                $scope.search();
            }, 500);
        };

        //On keydown spacebar play and pause playback
        angular.element($window).on('keydown', function (e) {

            if (e.keyCode === 32 && $scope.songs && !elSearch.is(':focus')) {
                $scope.$apply(function () {
                    $scope.play();
                });
                return false; // To prevent scroll down page when pressing space bar
            }
        });

        $scope.skip = function (action) {
            var newIndex = 0;
            if (action) {
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
                $scope.skip(true);
            }

            //TODO: Use $interval
            // Update playback time every second
            $scope.timer = $timeout($scope.runEverySecond, 1000);
        };

        // Display playback time and duration
        $scope.getCurrentTime = function () {
            var currentTime = ytplayer.getCurrentTime();

            if(!$.isNumeric( currentTime)) { return; }

            time = utilFactory.secondsToMinutes( currentTime );
            elapsedTime = time.minutes.toFixed() + ':' + time.seconds.toFixed();

            durationTime = utilFactory.secondsToMinutes( ytplayer.getDuration() );
            duration = durationTime.minutes.toFixed() + ':' + durationTime.seconds.toFixed();

            return elapsedTime + ' / ' + duration;
        };

        // Refactor in youtube service
        $scope.getYouTubeUrl = function (index) {
            return $scope.songs[index].link[0].href;
        };

        // Load song selected from search results
        $scope.loadSong = function (index) {
            var songUrl = $scope.getYouTubeUrl(index);
            var songCode = $filter('extractYouTubeCode')(songUrl);
            $scope.selectedIndex = index;
            $scope.showControls = true;
            $scope.playIcon = 'fa-pause';
            ytplayer.loadVideoById(songCode, 5, "large");
            playAudio = false;
            $scope.runEverySecond();
            $scope.songTitle = $scope.songs[index].title.$t;
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
                //TODO: Remove one of the cancel timeout functions
                clearTimeout($scope.timer);
                $timeout.cancel($scope.timer);
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
                return;
            }
            $scope.selectedIndex = -1;
            var options = {searchTerm: $scope.term, maxResults: 20 };

            services.search(options)
                .success(function (data) {
                    $scope.songs = data.feed.entry;
                }).
                error(function (data, status, headers, config) {
                });

        };
    });
