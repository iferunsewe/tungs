playback = {};
// The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
playback.stop = function(){
    var stopButton = document.getElementById('stop');
    stopButton.addEventListener('click', function (e) {
        video.pause();
        video.currentTime = 0;
        videoProgress.value = 0;
        // Update the play/pause button's 'data-state' which allows the correct button image to be set via CSS
        button.change('playpause');
    });
};
// As the video is playing, update the progress bar
playback.updateProgressBar = function(){
    var videoProgress = document.getElementById('progress');
    var progressBar = document.getElementById('progress-bar');
    video.addEventListener('timeupdate', function () {
        // For mobile browsers, ensure that the progress element's max attribute is set
        if (!videoProgress.getAttribute('max')) videoProgress.setAttribute('max', video.duration);
        videoProgress.value = video.currentTime;
        progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
    });
};
// React to the user clicking within the progress bar
playback.progressBarClick = function(){
    var videoProgress = document.getElementById('progress');
    videoProgress.addEventListener('click', function (e) {
        // Also need to take the parents into account here as .controls and figure now have position:relative
        var pos = (e.pageX - (this.offsetLeft + this.offsetParent.offsetLeft + this.offsetParent.offsetParent.offsetLeft)) / this.offsetWidth;
        video.currentTime = pos * video.duration;
    });
};
// React to the user clicking the playback button
playback.playButtonClick = function(){
    var playButton = document.getElementById('playpause');
    playButton.addEventListener('click', function (e) {
        if (video.paused || video.ended) video.play();
        else video.pause();
    });
};
// Wait for the video's meta data to be loaded, then set the progress bar's max value to the duration of the video
playback.loadMetadata = function(){
    var videoProgress = document.getElementById('progress');
    video.addEventListener('loadedmetadata', function () {
        videoProgress.setAttribute('max', video.duration);
    });
};
playback.play = function(){
    // var playButton = $('#playpause');
    video.addEventListener('play', function () {
        playButton.removeClass('fa-play').addClass('fa-pause');
    }, false);
};
playback.pause = function(){
    var playButton = $('#playpause');
    video.addEventListener('pause', function () {
        playButton.removeClass('fa-pause').addClass('fa-play');
    }, false);
};

playback.fakeProgress = function(){

};


$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;
    window.playButton = $('#playpause');

    if (supportsVideo) {
        playback.fakeProgress();
        if (document.addEventListener) {
            //playback.loadMetadata();
            // Add event listeners for video specific events
            playback.play();
            playback.pause();
            playback.playButtonClick();
            //playback.stop();
            //playback.updateProgressBar();
            //playback.progressBarClick();
        }
    }
});