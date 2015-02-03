'use strict';

angular.module('tq.services')
    .factory('utilFactory', function() {
        var secondsToMinutes = function(seconds) {
            return {
                seconds : +seconds % 60
            };
        };

        return {
            secondsToMinutes: secondsToMinutes
        };

    });
