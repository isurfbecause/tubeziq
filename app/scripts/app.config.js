'use strict';

angular.module('tq')
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/player.html',
            controller: 'playerController'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

