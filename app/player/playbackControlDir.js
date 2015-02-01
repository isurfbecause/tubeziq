'use strict';

angular.module('tq.directives')
    .directive('playbackControl', ['$timeout', 'PLAYER', function($timeout, PLAYER){
        return {
            restrict: 'E',
            templateUrl: 'player/playbackControlsDir.html',
            controller: function($scope) {
                // Play and pause
                $scope.play = function () {
                    if ($scope.playAudio) {
                        $scope.playbackControl.playIcon = PLAYER.icon.pause;
                        ytplayer.playVideo();
                        $scope.runEverySecond();
                        $scope.playAudio = false;
                    }
                    else {
                        //TODO: Remove one of the cancel timeout functions
                        clearTimeout($scope.timer);
                        $timeout.cancel($scope.timer);
                        $scope.playbackControl.playIcon = PLAYER.icon.play;
                        ytplayer.stopVideo();
                        $scope.playAudio = true;
                    }
                };

                $scope.mute = function () {
                    if (ytplayer.isMuted()) {
                        $scope.playbackControl.muteIcon = PLAYER.icon.volumneUp;
                        ytplayer.unMute();
                    }
                    else {
                        $scope.playbackControl.muteIcon = PLAYER.icon.volumeOff;
                        ytplayer.mute();
                    }
                };
            }
        };
    }]);


