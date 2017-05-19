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
    var progressBar = $('#scrubber');
    subControlsButtons.click(function(){
        var displayedSubControl = $($( this ).siblings('.sub-controls')[0]);
        displayedSubControl.toggle();
        if(displayedSubControl.is(':visible')){
            progressBar.hide()
        } else {
            progressBar.show()
        }
        subControls.each(function(i){
            if(displayedSubControl.attr('id') != $( this ).attr('id')){
                $( this).hide();
            }
        });
    });
};

vControls.hideSubControlsIfNotTarget = function(){
    $(document).mouseup(function (e)
    {
        var subControls = $('.sub-controls');

        if (!subControls.is(e.target) // if the target of the click isn't the container...
            && subControls.has(e.target).length === 0) // ... nor a descendant of the container
        {
            subControls.hide();
        }
    });
};

//vControls.toggleProgressBarDependentOnSubControls = function(){
//    var subControls = $('.sub-controls');
//    var progressBar = $('#scrubber');
//    subControls.on('hide', function(){
//        progressBar.show();
//    });
//    subControls.on('show', function(){
//        progressBar.hide();
//    });
//};

$(document).ready(function () {
    'use strict';
    // Does the browser actually support the video element?
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
        //// Hide the default controls
        vControls.hideDefault();

        //vControls.hideAfterTimeLimit(videoControls);
        //
        //vControls.showOnHover(videoConterols);

        vControls.hideSubControls();

        vControls.hideSubControlsIfNotTarget();

        //vControls.toggleProgressBarDependentOnSubControls();
    }
});
