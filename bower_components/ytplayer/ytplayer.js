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
