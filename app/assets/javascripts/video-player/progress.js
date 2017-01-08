progress = {};

// If the browser doesn't support the progress element, set its state for some different styling
progress.fake = function () {
    var videoProgress = document.getElementById('progress');
    var supportsProgress = (document.createElement('progress').max !== undefined);
    if (!supportsProgress) videoProgress.setAttribute('data-state', 'fake');
}
$(document).ready(function () {
    'use strict';

    var supportsVideo = !!document.createElement('video').canPlayType;

    if (supportsVideo) {
        progress.fake();
        if (document.addEventListener) {
            var progressBar = document.getElementById('progress-bar');
        }
    }
});