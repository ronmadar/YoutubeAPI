
/////
// This file contains utility functions to create video and suggestion elements and handle scrolling.
/////

export let highlightedIndex = -1; // Track the currently highlighted suggestion

/**
 * Creates the HTML string for a video element.
 * @param {string} videoId - The ID of the video.
 * @param {string} videoTitle - The title of the video.
 * @param {string} videoThumbnail - The URL of the video's thumbnail.
 * @returns {string} The HTML string for the video element.
 */
export function createVideoElement(videoId, videoTitle, videoThumbnail) {
    return `
        <div class="col-md-4 mb-3 yt-video">
            <video
                id="my-video-${videoId}"
                class="video-js vjs-default-skin"
                controls
                preload="auto"
                style=" width: 100%; height: auto;"
                poster="${videoThumbnail}"
                fluid="true"
                data-setup='{"techOrder": ["youtube"], "sources": [{
                    "type": "video/youtube", "src":
                    "https://www.youtube.com/watch?v=${videoId}"}],
                    "youtube": {  "ytControls": 2 } }'
            ></video>
            <h3>${videoTitle}</h3>
        </div>
    `;
}

/**
 * Creates a suggestion element for the autocomplete dropdown.
 * @param {string} videoTitle - The title of the video for the suggestion.
 * @param {string} videoId - The ID of the video for the suggestion.
 * @returns {HTMLElement} - The suggestion element.
 */
export function createSuggestionElement(videoTitle, videoId) {
    const suggestion = document.createElement('div');
    suggestion.classList.add('autocomplete-suggestion');
    suggestion.textContent = videoTitle;
    suggestion.dataset.videoId = `my-video-${videoId}`;
    return suggestion;
}

/**
 * Scrolls to the specified video element in the DOM.
 * @param {string} videoId - The ID of the video to scroll to.
 */
export function scrollToVideo(videoId) {
    const videoElement = document.getElementById(videoId);
    if (videoElement) {
        videoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.querySelector('#searchBox').value = ''; // Clear search box
    document.querySelector('#autocompleteContainer').innerHTML = ''; // Clear suggestions
}
