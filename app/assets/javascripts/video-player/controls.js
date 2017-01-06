vControls = {};
//// Hide the default controls
vControls.hideDefault = function(){
    video.controls = false
};
// Display the user defined video controls
vControls.showCreated = function(){
    var videoControls = document.getElementById('video-controls');
    videoControls.setAttribute('data-state', 'visible');
};

vControls.hideAfterTimeLimit = function(videoControls){
   videoControls.delay(5000).fadeOut();
};

vControls.showOnHover = function(videoControls){
    var videoContainer = $('#video-container');
    videoContainer.hover(function(){
        if(videoControls.css('display') == 'none'){
            videoControls.fadeIn();
            vControls.hideAfterTimeLimit(videoControls);
        }
    })
};

$(document).ready(function () {
    'use strict';
    // Does the browser actually support the video element?
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
        var videoControls = $('ul#controls-container');
        //// Hide the default controls
        vControls.hideDefault();

        //vControls.hideAfterTimeLimit(videoControls);
        //
        //vControls.showOnHover(videoConterols);
    }
});