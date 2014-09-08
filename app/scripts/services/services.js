angular.module('tubeziqApp')
    .service('services', function($http){

        var search = function( options ){

            var searchTerm = options.searchTerm;
            var maxResults = options.maxResults;
            var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q=' + options.searchTerm + '&enablejsapi=1&max-results='+ options.maxResults +'&caption=false&v=2&alt=json&callback=JSON_CALLBACK';
            return $http({method: 'JSONP', url: searchUrl})                
        }

        return {
                    search: search
                }
                
});