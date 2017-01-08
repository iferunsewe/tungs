progress = {};

// If the browser doesn't support the progress element, set its state for some different styling
progress.fake = function () {
    var videoProgress = document.getElementById('progress');
    var supportsProgress = (document.createElement('progress').max !== undefined);
    if (!supportsProgress) videoProgress.setAttribute('data-state', 'fake');
};

progress.updateProgressBar = function(){
    video.addEventListener('timeupdate', function(){
        var percent = video.currentTime / video.duration;
        progress.setBarWidth(Math.floor((percent * 100)) + "%")
    })
};

progress.setBarWidth = function(percent){
    var progressBar = $('#progress-bar');
    progressBar.width(percent)
};

progress.updateTime = function(percent){
    video.currentTime = percent * video.duration;
};

progress.scrubberMouseDownHandler = function(){
    var scrubber = $('#scrubber');
    scrubber.on('mousedown', function(e){
        var scrubberPosition = $(this);
        var x = e.pageX - scrubberPosition.offset().left;
        var percent = x / scrubberPosition.width();
        progress.setBarWidth(percent);
        progress.updateTime(percent);
    });
};

$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        progress.fake();
        if (document.addEventListener) {
            progress.updateProgressBar();
            progress.scrubberMouseDownHandler();
        }
    }
});