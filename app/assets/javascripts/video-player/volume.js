volume = {};

volume.set = function(){
    var volumeBar = $('#volume-bar');
    video.volume = volumeBar[0].value;
    volumeBar.change(function() {
        // Update the video volume
        video.volume = volumeBar[0].value;
    });
};

volume.mute = function(){
    var volumeButton = $('.volume');
    var volumeBar = $('#volume-bar');
    volumeButton.click(function () {
        video.muted = !video.muted;
        if (video.muted) {
            cachedVolume = volumeBar[0].value;
            volumeButton.removeClass('fa-volume-up').addClass('fa-volume-off');
            volumeBar[0].value = '0';
        }
        else {
            volumeBar[0].value = cachedVolume;
            volumeButton.removeClass('fa-volume-off').addClass('fa-volume-up');
        }
    });
};

//button = {};
//// Changes the button state of certain button's so the correct visuals can be displayed with CSS
//button.change = function(type){
//    // Play/Pause button
//    var playButton = $('#playpause');
//    if (type == 'playpause') {
//        if (video.paused || video.ended) {
//            playButton.removeClass('fa-pause').addClass('fa-play');
//        }
//        else {
//            playButton.removeClass('fa-play').addClass('fa-pause');
//        }
//    }
//};

$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {

        if (document.addEventListener) {
            volume.set();
            volume.mute();
            //volume.increase();
            //volume.decrease();
        }
    }

});