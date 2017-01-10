speed = {};

speed.showMenu = function(){
    var speedButton = $('button#speed');
    var speedMenu = $('ul#speed-menu');
    speedButton.click(function(e){
        speedMenu.toggle();
    });
};

speed.setSpeed = function(speed){
    var speedRateButton = $('ul#speed-menu li button');
    var progressBar = $('#scrubber');
    var speedMenu = $('ul#speed-menu');
    speedRateButton.click(function(){
        video.playbackRate = $(this).text();
        speedMenu.toggle();
        progressBar.show();
    });
};

$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        if (document.addEventListener) {
            speed.showMenu();
            speed.setSpeed();
        }
    }
});