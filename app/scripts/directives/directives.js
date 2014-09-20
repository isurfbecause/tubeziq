'use strict';

angular.module('tubeziq.directives', [])

    .directive('tubesiqFocus', function () {
        return{
            link: function(scope, element, attrs){
                element.focus();
            }
        };
    })

    .directive('tubesiqSlider', function(){
        return{
            link: function( scope, element, attrs){
                element.slider({
                    orientation: "vertical",
                    range: "min",
                    min: 0,
                    max: 100,
                    value: 80,
                    slide: function( event, ui ) {
                        ytplayer.setVolume( ui.value );
                    }
                });
            }
        };
        
    });