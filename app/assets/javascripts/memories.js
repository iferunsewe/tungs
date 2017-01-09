memory = {};

memory.clickTime = function(){
    var memoryTime = $('.memory-time');
    memoryTime.click(function(){
        var clickedMemoryTime = $(this)[0];
        var memoryTimeValue = clickedMemoryTime.getAttribute('value');
        video.currentTime = memoryTimeValue
    })
};

$(document).ready(function () {
    'use strict';
    if (document.addEventListener) {
        memory.clickTime();
    }
});