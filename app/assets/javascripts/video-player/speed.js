speed = {};

speed.setSpeed = function(speed){
    var speedRateButton = $('ul#speed-menu li button');
    speedRateButton.click(function(){
        video.playbackRate = $(this).text();
    });
};

$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        if (document.addEventListener) {
            speed.setSpeed();
        }
    }
});