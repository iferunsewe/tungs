volume = {};

volume.set = function(){
    var volumeBar = $('#volume-bar');
    var volumeButton = $('.volume');
    video.volume = volumeBar[0].value;
    if(video.volume == 0) volumeButton.removeClass('fa-volume-up').addClass('fa-volume-off');
    volumeBar.change(function() {
        // Update the video volume
        video.volume = volumeBar[0].value;
        if(volumeBar[0].value > 0){
            volumeButton.removeClass('fa-volume-off').addClass('fa-volume-up');
        } else {
            volumeButton.removeClass('fa-volume-up').addClass('fa-volume-off');
        }
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


$(document).ready(function () {
    'use strict';
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
        if (document.addEventListener) {
            volume.set();
            volume.mute();
        }
    }

});