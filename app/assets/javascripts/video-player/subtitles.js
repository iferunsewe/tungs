subtitles = {};

// Turn off all subtitles
subtitles.off = function(){
    for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
    }
};

subtitles.activeTrack = function(){
    var activeButton = $("button.language-button[data-state='active']")[0];
    return video.textTracks[activeButton.id];
};

subtitles.modifyTrack = function(textTrack){
    var cueText = '';
    var modText = '';
    var subtitlesContainer = $("#subtitles-container");
    var cue = textTrack.activeCues[0]; // assuming there is only one active cue
    // do something
    if (cue !== undefined) {
        cueText = cue.text.split(' ');
        for (var i = 0; i < cueText.length; i++) {
            modText += "<span>" + cueText[i] + "</span>" + " ";
        }
        subtitlesContainer.html('').append(modText);
    }
};

// Split the track into html
subtitles.splitTrack = function(){
    var textTrack = subtitles.activeTrack();
    // Needed to display the first cue
    subtitles.modifyTrack(textTrack);
    textTrack.oncuechange = function () {
        var textTrack = subtitles.activeTrack();
        subtitles.modifyTrack(textTrack);
    };
};
// Translate the selected subtitles
subtitles.translate = function(){
    var subtitlesContainer = $("#subtitles-container")
    var translationContainer = $("#translation-container");
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

subtitles.createMenu = function(){
    // Go through each one and build a small clickable list, and when each item is clicked on, set its mode to be "showing" and the others to be "hidden"
    var videoContainer = document.getElementById('video-container');
    if (video.textTracks) {
        var df = document.createDocumentFragment();
        var subtitlesMenu = df.appendChild(document.createElement('ul'));
        subtitlesMenu.className = 'subtitles-menu';
        subtitlesMenu.appendChild(subtitles.createMenuItem('subtitles-off', '', 'Off'));
        for (var i = 0; i < video.textTracks.length; i++) {
            subtitlesMenu.appendChild(subtitles.createMenuItem(i, video.textTracks[i].language, video.textTracks[i].label));
        }
        videoContainer.appendChild(subtitlesMenu);
    }
    var subtitlesButton = document.getElementById('subtitles');
    subtitlesButton.addEventListener('click', function (e) {
        if (subtitlesMenu) {
            subtitlesMenu.style.display = (subtitlesMenu.style.display == 'block' ? 'none' : 'block');
        }
    });
};

subtitles.createMenuItem = function (id, lang, label) {
    // Creates and returns a menu item for the subtitles language menu

    var subtitleMenuButtons = [];
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
        if(this.id != 'subtitles-off'){
            subtitles.splitTrack();
        }else{
            var subtitlesContainer = $("#subtitles-container");
            subtitlesContainer.hide();
        }
        var subtitlesMenu = $('ul.subtitles-menu')[0];
        subtitlesMenu.style.display = 'none';
    });
    subtitleMenuButtons.push(button);
    return listItem;
};

$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        if (document.addEventListener) {
            subtitles.off();
            subtitles.createMenu();
            subtitles.translate();
        }
    }});