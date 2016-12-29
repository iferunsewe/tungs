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


$(document).ready(function () {
    'use strict';
    // Does the browser actually support the video element?
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
        //// Hide the default controls
        vControls.hideDefault();
        // Display the user defined video controls
        vControls.showCreated();
    }
});