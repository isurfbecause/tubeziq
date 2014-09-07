'use strict';

angular.module('tubeziqApp')
    .filter('code', ['$sce', function ($sce) {
        return function(url) {
            var code = url.split('&')[0].split('=')[1];
            return code;
        };
    }])

    .controller('MainCtrl', function ($scope,$http,$filter) {
        var flag        = 1;
        $scope.term     = 'chillstep';
        $scope.playIcon = 'fa fa-play fa-2x';
    
        var params      = { allowScriptAccess: "always" };
        var atts        = { id: "myytplayer" };
        swfobject.embedSWF("http://www.youtube.com/v/bHQqvYy5KYo?enablejsapi=1&playerapiid=ytplayer&version=3",
                           "ytapiplayer", "425", "356", "8", null, null, params, atts);
        
        $scope.loadSong = function( code ){
            code                = $filter('code')(code);
            $scope.showControls = true;
            myytplayer.loadVideoById(code, 5, "large")
            $scope.playIcon     = 'fa fa-pause fa-2x';
            flag                = 0;
        };

        $scope.play = function(){
            if(flag){
                $scope.playIcon = 'fa fa-pause fa-2x';
                ytplayer.playVideo();
                flag = 0;
            }
            else{
                $scope.playIcon = 'fa fa-play fa-2x';
                ytplayer.stopVideo();
                flag = 1;
            }
        }

        $scope.search = function(){

            var maxResults = 5;
            var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q=' + $scope.term + '&enablejsapi=1&max-results='+maxResults+'&caption=false&v=2&alt=json&callback=JSON_CALLBACK';
            console.log(searchUrl); 
                        

            $http({method: 'JSONP', url: searchUrl}).
                success(function(data, status, headers, config) {
                    console.log(data.feed.entry);
                    $scope.songs = data.feed.entry;

                 // this callback will be called asynchronously
                 // when the response is available
                }).
                error(function(data, status, headers, config) {
                // called asynchronously if an error occurs
                // or server returns response with an error status.
                });
    };
  });
