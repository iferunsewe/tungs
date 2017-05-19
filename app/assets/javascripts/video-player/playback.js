playback = {};

// React to the user clicking the playback button
playback.playButtonClick = function(){
    var playButton = document.getElementById('playpause');
    playButton.addEventListener('click', function (e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
    });
};


playback.play = function(){
    // var playButton = $('#playpause');
    video.addEventListener('play', function () {
        playButton.removeClass('fa-play').addClass('fa-pause');
    }, false);
};
playback.pause = function(){
    var playButton = $('#playpause');
    video.addEventListener('pause', function () {
        playButton.removeClass('fa-pause').addClass('fa-play');
    }, false);
};

$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;
    window.playButton = $('#playpause');

    if (supportsVideo) {
        if (document.addEventListener) {
            // Add event listeners for video specific events
            playback.play();
            playback.pause();
            playback.playButtonClick();
        }
    }
});