angular.module('tq.services')
    .service('services', function($http) {

        var search = function(options) {
            var searchTerm = options.searchTerm;
            var maxResults = options.maxResults;
            var duration = 'long';
            var host = 'http://localhost:4000/';
            var searchUrl = 'https://gdata.youtube.com/feeds/api/videos?q=' + options.searchTerm + '&duration=' +
                duration + '&enablejsapi=1&max-results=' + options.maxResults +
                '&caption=false&v=2&alt=json';

            return $http.post(host + 'search', {searchUrl: searchUrl});
        };

        return {
            search: search
        };
    });
