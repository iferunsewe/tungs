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

    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    var memoryBody = document.getElementsByClassName('memory-bank-table-container')[0];

    var observer = new MutationObserver(function(mutations, observer) {
        // fired when a mutation occurs
        window.memoryTime = $('.memory-time');
        memory.clickTime();
        // ...
    });

    observer.observe(memoryBody, {
        subtree: true,
        childList: true
        //...
    });
});
