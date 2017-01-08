progress = {};

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

progress.showTime = function(){
    var timeDisplay = $('#time-display');
    console.log(timeDisplay.attr('max'));
    console.log(timeDisplay.attr('min'));
    var formattedMaxTime = timeHelper.formatSeconds(timeDisplay.attr('max'));
    var formattedMinTime = timeHelper.formatSeconds(timeDisplay.attr('min'));
    timeDisplay.text(formattedMinTime + '/' + formattedMaxTime);
    video.addEventListener('timeupdate', function(){
        var formattedCurrentTime = timeHelper.formatSeconds(video.currentTime);
        timeDisplay.text(formattedCurrentTime + '/' + formattedMaxTime);
    });
};

// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
progress.loadMetadata = function(){
    var timeDisplay = document.getElementById('time-display');
    video.addEventListener('loadedmetadata', function () {
        timeDisplay.setAttribute('max', video.duration);
        timeDisplay.setAttribute('min', 0);
        progress.showTime();
    });

};

timeHelper = {};

timeHelper.formatSeconds = function(seconds){
    var fm = [
        //Math.floor(Math.floor(seconds/60)/60)%60,                          //HOURS
        //Math.floor(seconds/60)%60,                                                //MINUTES divided by 60
        Math.floor(seconds/60),                                                //MINUTES
        Math.floor(seconds)%60                                                                      //SECONDS
    ];
    return $.map(fm,function(v,i) { return ( (v < 10) ? '0' : '' ) + v; }).join( ':' );
};


$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        if (document.addEventListener) {
            progress.loadMetadata();
            progress.updateProgressBar();
            progress.scrubberMouseDownHandler();
        }
    }
});