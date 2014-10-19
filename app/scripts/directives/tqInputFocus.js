'use strict';

angular.module('tq.directives')

    .directive('tqInputFocus', function () {
        return{
            link: function(scope, element, attrs){
                element.focus();
            }
        };
});