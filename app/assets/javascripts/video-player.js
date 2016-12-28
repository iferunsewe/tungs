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
volume.alter = function(){
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

playback = {};
// The Media API has no 'stop()' function, so pause the video and reset its time and the progress bar
playback.stop = function(){
    var video = document.getElementById('video');
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
    var video = document.getElementById('video');
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
    var video = document.getElementById('video');
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
        console.log("PLAYING");
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
    video.addEventListener('play', function () {
        button.change('playpause');
    }, false);
};
playback.pause = function(){
    video.addEventListener('pause', function () {
        button.change('playpause');
    }, false);
};
// If the browser doesn't support the progress element, set its state for some different styling
playback.fakeProgress = function(){
    var videoProgress = document.getElementById('progress');
    var supportsProgress = (document.createElement('progress').max !== undefined);
    if (!supportsProgress) videoProgress.setAttribute('data-state', 'fake');
};



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

subtitles = {};

// Turn off all subtitles
subtitles.off = function(){
    for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
    }
};

subtitles.activeTrack = function(){
    var activeButton = $("button.language-button[data-state='active']")[0];
    if(activeButton != undefined){
        for (var i = 0; i < video.textTracks.length; i++) {
            if (video.textTracks[i].language == activeButton.lang){
                return video.textTracks[i]
            }
        }
    }
};

subtitles.modifyTrack = function(textTrack){
    var cueText = '';
    var modText = '';
    var subtitlesContainer = $(".film-subtitles-section .content");
    var cue = textTrack.activeCues[0]; // assuming there is only one active cue
    // do something
    if (cue !== undefined) {
        cueText = cue.text.split(' ');
        console.log("STRIPPED STRING " + cueText);
        for (var i = 0; i < cueText.length; i++) {
            modText += "<span>" + cueText[i] + "</span>" + " ";
        }
        console.log("MODIFIED TEXT " + modText);
        subtitlesContainer.html('').append(modText);
    }
};

// Split the track into html
subtitles.splitTrack = function(){
    var textTrack = subtitles.activeTrack();
    // Needed to display the first cue
    subtitles.modifyTrack(textTrack)
    textTrack.oncuechange = function () {
        // "this" is a textTrack
        subtitles.modifyTrack(textTrack);
    };
};
// Translate the selected subtitles
subtitles.translate = function(){
    var subtitlesContainer = $(".film-subtitles-section .content");
    var translationContainer = $(".film-translation-section .content");
    subtitlesContainer.click(function (e) {
        translationContainer.css('background-color', 'yellow');
        console.log(e.target);
        var targetedText = e.target.textContent;
        console.log("TRANSLATING " + targetedText);

        var requestStr = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160811T192805Z.efeabd9b6a63be74.83bd8ebdac3a740ad49e31cb93eea218d37a91a8&text=" + targetedText + "&lang=en-fr";
        console.log("REQUEST STRING " + requestStr);

        var translatedString = '';
        $.ajax({
            url: requestStr,
            type: "GET",
            dataType: 'jsonp',
            success: function (data) {
                translatedString = data.text[0];
                console.log(translatedString);
                translationContainer.css('color', 'white');
                translationContainer.html('').append("<p>" + translatedString + "</p>");
                if (video.paused || video.ended) video.play();
                else video.pause();
            },
            error: function (data) {
                var response = JSON.parse(data.responseText);
                console.log(response.message)
            }
        });
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

    var video = document.getElementById('video');
    var videoContainer = document.getElementById('video-container');
    // Does the browser actually support the video element?
    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        //// Hide the default controls
        vControls.hideDefault();

        // Display the user defined video controls
        vControls.showCreated();

        playback.fakeProgress();

        fullscreen.enabled();

        // Only add the events if addEventListener is supported (IE8 and less don't support it, but that will use Flash anyway)
        if (document.addEventListener) {


            playback.loadMetadata();
            // Add event listeners for video specific events
            playback.play();
            playback.pause();
            volume.changing();

            playback.playButtonClick();

            subtitles.off();

            var subtitlesContainer = $(".film-subtitles-section .content");


            // Creates and returns a menu item for the subtitles language menu
            var subtitleMenuButtons = [];
            var createMenuItem = function (id, lang, label) {
                var listItem = document.createElement('li');
                var button = listItem.appendChild(document.createElement('button'));
                button.setAttribute('id', id);
                button.className = 'language-button';
                if (lang.length > 0) button.setAttribute('lang', lang);
                button.value = label;
                button.setAttribute('data-state', 'inactive');
                button.appendChild(document.createTextNode(label));
                button.addEventListener('click', function (e) {
                    // Set all buttons to inactive
                    subtitleMenuButtons.map(function (v, i, a) {
                        subtitleMenuButtons[i].setAttribute('data-state', 'inactive');
                    });
                    // Find the language to activate
                    var lang = this.getAttribute('lang');
                    for (var i = 0; i < video.textTracks.length; i++) {
                        // For the 'subtitles-off' button, the first condition will never match so all will subtitles be turned off
                        if (video.textTracks[i].language == lang) {
                            this.setAttribute('data-state', 'active');
                        }
                        else {
                            video.textTracks[i].mode = 'hidden';
                        }
                    }
                    subtitles.splitTrack();
                    subtitlesMenu.style.display = 'none';
                });
                subtitleMenuButtons.push(button);
                return listItem;
            };
            // Go through each one and build a small clickable list, and when each item is clicked on, set its mode to be "showing" and the others to be "hidden"
            var subtitlesMenu;
            if (video.textTracks) {
                var df = document.createDocumentFragment();
                var subtitlesMenu = df.appendChild(document.createElement('ul'));
                subtitlesMenu.className = 'subtitles-menu';
                subtitlesMenu.appendChild(createMenuItem('subtitles-off', '', 'Off'));
                for (var i = 0; i < video.textTracks.length; i++) {
                    subtitlesMenu.appendChild(createMenuItem('subtitles-' + video.textTracks[i].language, video.textTracks[i].language, video.textTracks[i].label));
                }
                videoContainer.appendChild(subtitlesMenu);
            }
            var subtitlesButton = document.getElementById('subtitles');
            subtitlesButton.addEventListener('click', function (e) {
                if (subtitlesMenu) {
                    subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
                }
            });

            playback.stop();
            volume.mute();
            volume.increase();
            volume.decrease();
            fullscreen.enter();

            playback.updateProgressBar();
            playback.progressBarClick();
            fullscreen.listenForChange();

            subtitles.translate();
        }
    }

});