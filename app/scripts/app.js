'use strict';

//Config and router
angular.module('tq.config', []);

//Global modules
angular.module('tq.directives', []);
angular.module('tq.filters', []);
angular.module('tq.services', []);
angular.module('tq.constants', []);

//App modules
angular.module('tq.player', []);

//Main app
angular.module('tq', [
    'tq.config',
    'tq.constants',
    'tq.directives',
    'tq.filters',
    'tq.player',
    'tq.services',
    'ngRoute'
]);
