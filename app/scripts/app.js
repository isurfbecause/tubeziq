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
    'tq.directives',
    'tq.filters',
    'tq.services',
    'tq.player',
    'ngRoute',
    'tq.constants',
    'ytplayer'
]);

/*
//Make youtupbe ytplayer object a module
 Provides a way to inject vendor libraries that otherwise are globals. This improves code testability
 by allowing you to more easily know what the dependencies of your components are (avoids leaky abstractions).
 It also allows you to mock these dependencies, where it makes sense.
*/
angular.module('ytplayer', [])
    .factory('ytplayer', function() {
  return window.ytplayer;
});
