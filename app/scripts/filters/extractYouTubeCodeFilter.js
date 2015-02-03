'use strict';

angular.module('tq.filters')
    //Refactor in youtube service
    .filter('extractYouTubeCode', ['$sce', function($sce) {
        return function(url) {
            var code = url.split('&')[0].split('=')[1];
            return code;
        };
    }]);
