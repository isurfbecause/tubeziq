'use strict';

//Global modules
angular.module('tq.directives', []);
angular.module('tq.services', []);

//App modules
angular.module('tq.player', []);

//Main app
angular.module('tq', ['tq.directives', 'tq.services', 'tq.player', 'ngRoute'])
    .config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/main.html',
            controller: 'MainCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
    });

