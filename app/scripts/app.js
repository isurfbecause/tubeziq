'use strict';

//Config and router
angular.module('tq.config', []);

//Global modules
angular.module('tq.directives', []);
angular.module('tq.filters', []);
angular.module('tq.services', []);

//App modules
angular.module('tq.player', []);

//Main app
angular.module('tq', [
    'tq.config',
    'tq.directives',
    'tq.filters',
    'tq.services',
    'tq.player',
    'ngRoute'
]);
