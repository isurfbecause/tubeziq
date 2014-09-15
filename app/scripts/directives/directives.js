angular.module('tubeziq.directives', [])
    // From http://stackoverflow.com/questions/17470790/how-to-use-a-keypress-event-in-angularjs
    .directive('tubeziqEnter', function () {
        return function (scope, element, attrs) {
            element.bind("keydown keypress", function (event) {
                if(event.which === 13) {
                    scope.$apply(function (){
                        scope.$eval(attrs.tubeziqEnter);
                    });

                    event.preventDefault();
                }
            });
        };
    })

    .directive('tubesiqFocus', function () {
        return{
            link: function(scope, element, attrs){
                element.focus();
            }
        };
    });