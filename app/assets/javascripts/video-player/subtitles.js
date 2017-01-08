subtitles = {};

// Turn off all subtitles
subtitles.off = function(){
    for (var i = 0; i < video.textTracks.length; i++) {
        video.textTracks[i].mode = 'hidden';
    }
};

subtitles.activeTrack = function(){
    var activeButton = $("button.language-button[data-state='active']")[0];
    return video.textTracks[activeButton.id - 1];
};

subtitles.modifyTrack = function(){
    var cueText = '';
    var modText = '';
    var subtitlesContainer = $("#subtitles-container");
    var cue = subtitles.activeTrack().activeCues[0]; // assuming there is only one active cue
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
    // Needed to display the first cue
    if (subtitles.languageButtonActive){
        subtitles.modifyTrack();
        subtitles.activeTrack().oncuechange = function () {
            subtitles.modifyTrack();
        };
    }
    var subtitlesContainer = $("#subtitles-container");
    subtitlesContainer.show();
};
// Translate the selected subtitles
subtitles.translate = function(){
    var subtitlesContainer = $("#subtitles-container");
    var translationContent = $("#translation-container .content");
    subtitlesContainer.click(function (e) {
        var targetedText = e.target.textContent;
        var requestStr = "https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160811T192805Z.efeabd9b6a63be74.83bd8ebdac3a740ad49e31cb93eea218d37a91a8&text=" + targetedText + "&lang=en-fr";
        var translatedString = '';
        $.ajax({
            url: requestStr,
            type: "GET",
            dataType: 'jsonp',
            success: function (data) {
                translatedString = data.text[0];
                translationContent.html('').append("<p><span id='original-text'><b>" + targetedText + "</b></span> is translated as <b><span id='translated-text'>" + translatedString + "</b></span></p>");
                translation.toggleMemoryButtonIfHidden();
            },
            error: function (data) {
                var response = JSON.parse(data.responseText);
                console.log(response.message)
            }
        });
    });
};

//subtitles.clickMenu = function(){
//    var subtitlesButton = $('#subtitles-menu-button');
//    subtitlesButton.click(function () {
//        subtitles.toggleMenu();
//    });
//};

subtitles.clickLanguageButton = function () {
    var languageButton = $('.language-button');
    languageButton.click(function () {
        // Set all buttons to inactive
        // Find the language to activate
        subtitles.inactivateButton();
        $(this).attr('data-state', 'active');
        subtitles.splitTrack();
        subtitles.toggleMenu();

    });
};

subtitles.toggleMenu = function(){
    var subtitlesMenu = $('#subtitles-menu');
    subtitlesMenu.toggle();
};

subtitles.clickOff = function(){
    var subtitlesOffButton = $('#subtitles-off');
    subtitlesOffButton.click(function(){
        subtitles.toggleSubtitlesContainer();
        subtitles.inactivateButton();
        subtitles.toggleMenu();
    })
};

subtitles.languageButtonActive = function(){
    var activeButton = $("button.language-button[data-state='active']")[0];
    if(activeButton){
        return true;
    } else{
        return false;
    }
};

subtitles.inactivateButton= function(){
    var activeButton = $("button.language-button[data-state='active']")[0];
    if(subtitles.languageButtonActive()) {
        activeButton.setAttribute('data-state', 'inactive');
    }
};

subtitles.toggleSubtitlesContainer = function(){
    var subtitlesContainer = $("#subtitles-container");
    subtitlesContainer.toggle();
};

translation = {};

translation.hideContainer = function(){
    var translationContainer = $("#translation-container");
    translationContainer.hide();
};

translation.hideMemoryButton = function(){
    var memoryButton = $('.memory-button');
    memoryButton.hide();
};

translation.toggleMemoryButtonIfHidden=  function(){
    var memoryButton = $('.memory-button');
    if (memoryButton.is(":hidden")){
        memoryButton.toggle();
    }
};

translation.addToMemory = function(){
    var memoryButton = $('.memory-button');
    memoryButton.click(function() {
        var originalText = $('#original-text').text();
        var translatedText = $('#translated-text').text();
        var userId = parseInt($(this).attr('data-user-id'));
        var filmId = parseInt($(this).attr('data-film-id'));
        var languageId = parseInt(subtitles.activeTrack().id);
        $.ajax({
            type: "POST",
            url: "/memories",
            data: {
                memory: {
                    text: originalText,
                    translation: translatedText,
                    user_id: userId,
                    film_id: filmId,
                    language_id: languageId
                }
            },
            success: function (data) {
                var translationContent = $("#translation-container .content");
                translationContent.html('').append("<p><span>Translation remembered</p></span>")
                translation.hideMemoryButton();
            },
            error: function (data) {
                var response = data.responseText;
                console.log(response.message)
            }
        });

    })
};

$(document).ready(function () {
    'use strict';
    translation.hideMemoryButton();
    var supportsVideo = !!document.createElement('video').canPlayType;
    if (supportsVideo) {
        //translation.hideContainer();
        if (document.addEventListener) {
            subtitles.off();
            //subtitles.clickMenu();
            subtitles.clickLanguageButton();
            subtitles.translate();
            translation.addToMemory();
            subtitles.clickOff();
        }
    }
});