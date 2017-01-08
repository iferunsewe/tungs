vControls = {};
//// Hide the default controls
vControls.hideDefault = function(){
    video.controls = false
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

vControls.hideSubControls = function(){
    var subControlsButtons = $('.sub-controls-button');
    var subControls = $('.sub-controls');
    subControlsButtons.click(function(){
        var displayedSubControl = $($( this ).siblings('.sub-controls')[0]);
        displayedSubControl.toggle();
        subControls.each(function(i){
            if(displayedSubControl.attr('id') != $( this ).attr('id')){
                $( this).hide();
            }
        });
    });
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

        vControls.hideSubControls();
    }
});