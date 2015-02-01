'use strict';

angular.module('tq')
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'player/player.html',
            controller: 'playerController'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

