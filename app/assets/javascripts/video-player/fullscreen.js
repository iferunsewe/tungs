fullscreen = {};

// Check if the browser supports the Fullscreen API
fullscreen.enabled = function(){
    var fullscreenButton = document.getElementById('fullscreen');
    var enabled = !!(document.fullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled || document.webkitSupportsFullscreen || document.webkitFullscreenEnabled || document.createElement('video').webkitRequestFullScreen);
    if (!enabled) {
        fullscreenButton.style.display = 'none';
    }
};
// Set the video container's fullscreen state
fullscreen.setData = function(state){
    var videoContainer = document.getElementById('video-container');
    var fullscreenButton = document.getElementById('fullscreen');
    videoContainer.setAttribute('data-fullscreen', !!state);
    // Set the fullscreen button's 'data-state' which allows the correct button image to be set via CSS
    fullscreenButton.setAttribute('data-state', !!state ? 'cancel-fullscreen' : 'go-fullscreen');
};
//Checks if the document is currently in fullscreen mode
fullscreen.isOn = function(){
    return !!(document.fullScreen || document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement || document.fullscreenElement);
};
// Fullscreen
fullscreen.handle = function(){
    var videoContainer = document.getElementById('video-container');
    // Fullscreen
    // If fullscreen mode is active...
    if (fullscreen.isOn()) {
        // ...exit fullscreen mode
        // (Note: this can only be called on document)
        if (document.exitFullscreen) document.exitFullscreen();
        else if (document.mozCancelFullScreen) document.mozCancelFullScreen();
        else if (document.webkitCancelFullScreen) document.webkitCancelFullScreen();
        else if (document.msExitFullscreen) document.msExitFullscreen();
        fullscreen.setData(false);
    }
    else {
        // ...otherwise enter fullscreen mode
        // (Note: can be called on document, but here the specific element is used as it will also ensure that the element's children, e.g. the custom controls, go fullscreen also)
        if (videoContainer.requestFullscreen) videoContainer.requestFullscreen();
        else if (videoContainer.mozRequestFullScreen) videoContainer.mozRequestFullScreen();
        else if (videoContainer.webkitRequestFullScreen) {
            // Safari 5.1 only allows proper fullscreen on the video element. This also works fine on other WebKit browsers as the following CSS (set in styles.css) hides the default controls that appear again, and
            // ensures that our custom controls are visible:
            // figure[data-fullscreen=true] video::-webkit-media-controls { display:none !important; }
            // figure[data-fullscreen=true] .controls { z-index:2147483647; }
            video.webkitRequestFullScreen();
        }
        else if (videoContainer.msRequestFullscreen) videoContainer.msRequestFullscreen();
        fullscreen.setData(true);
    }
};

fullscreen.enter = function(){
    var fullscreenButton = document.getElementById('fullscreen');
    fullscreenButton.addEventListener('click', function (e) {
        fullscreen.handle();
    });
};

//// Listen for fullscreen change events (from other controls, e.g. right clicking on the video itself)
fullscreen.listenForChange = function(){
    document.addEventListener('fullscreenchange', function (e) {
        fullscreen.setData(!!(document.fullScreen || document.fullscreenElement));
    });
    document.addEventListener('webkitfullscreenchange', function () {
        fullscreen.setData(!!document.webkitIsFullScreen);
    });
    document.addEventListener('mozfullscreenchange', function () {
        fullscreen.setData(!!document.mozFullScreen);
    });
    document.addEventListener('msfullscreenchange', function () {
        fullscreen.setData(!!document.msFullscreenElement);
    });
};

//$(document).ready(function () {
//    'use strict';
//
//    var supportsVideo = !!document.createElement('video').canPlayType;
//
//    if (supportsVideo) {
//        fullscreen.enabled();
//        if (document.addEventListener) {
//            fullscreen.enter();
//            fullscreen.listenForChange();
//        }
//    }
//});