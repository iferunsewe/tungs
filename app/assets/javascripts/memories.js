memory = {};

memory.clickTime = function(){
    var memoryTime = $('.memory-time');
    memoryTime.click(function(){
        var clickedMemoryTime = $(this)[0];
        video.currentTime = clickedMemoryTime.getAttribute('value');
    })
};

$(document).ready(function () {
    'use strict';
    if (document.addEventListener) {
        memory.clickTime();
    }
});