volume = {};
// Check the volume
volume.check = function(dir){
    var video = document.getElementById('video');
    if (dir) {
        var currentVolume = Math.floor(video.volume * 10) / 10;
        if (dir === '+') {
            if (currentVolume < 1) video.volume += 0.1;
        }
        else if (dir === '-') {
            if (currentVolume > 0) video.volume -= 0.1;
        }
        // If the volume has been turned off, also set it as muted
        // Note: can only do this with the custom control set as when the 'volumechange' event is raised, there is no way to know if it was via a volume or a mute change
        if (currentVolume <= 0) video.muted = true;
        else video.muted = false;
    }
    button.change('mute');
};
// Change the volume
volume.alter = function(dir){
    volume.check(dir);
};

volume.changing = function(){
    var video = document.getElementById('video');
    video.addEventListener('volumechange', function () {
        volume.check();
    }, false);
};

volume.mute = function(){
    var video = document.getElementById('video');
    var muteButton = document.getElementById('mute');
    muteButton.addEventListener('click', function (e) {
        video.muted = !video.muted;
        button.change('mute');
    });
};

volume.increase = function(){
    var volincButton = document.getElementById('volinc');
    volincButton.addEventListener('click', function (e) {
        volume.alter('+');
    });
};

volume.decrease = function(){
    var voldecButton = document.getElementById('voldec');
    voldecButton.addEventListener('click', function (e) {
        volume.alter('-');
    });
};

button = {};
// Changes the button state of certain button's so the correct visuals can be displayed with CSS
button.change = function(type){
    // Play/Pause button
    var playButton = document.getElementById('playpause');
    var muteButton = document.getElementById('mute');
    if (type == 'playpause') {
        if (video.paused || video.ended) {
            playButton.setAttribute('data-state', 'play');
        }
        else {
            playButton.setAttribute('data-state', 'pause');
        }
    }
    // Mute button
    else if (type == 'mute') {
        muteButton.setAttribute('data-state', video.muted ? 'unmute' : 'mute');
    }
};

$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {

        if (document.addEventListener) {
            volume.changing();
            volume.mute();
            volume.increase();
            volume.decrease();
        }
    }

});