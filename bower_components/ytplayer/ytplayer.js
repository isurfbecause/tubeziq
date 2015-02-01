var tag = document.createElement('script');
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    function onYouTubeIframeAPIReady() {
    ytplayer = new YT.Player('player', {
            height: '0',
            width: '0',
            videoId: 'M7lc1UVf-VE'
        });
    }

/*
//Make youtupbe ytplayer object a module
 Provides a way to inject vendor libraries that otherwise are globals. This improves code testability
 by allowing you to more easily know what the dependencies of your components are (avoids leaky abstractions).
 It also allows you to mock these dependencies, where it makes sense.
*/


