
/////////
// This file initializes the YouTube video portal by fetching playlists and videos, 
// and setting up the search functionality.
/////////

import { getPlaylists, fetchVideosForPlaylist } from './api.js';
import { displayPlaylists, displayVideos } from './ui.js';
import { initializeSearch } from './search.js';

const addedVideoIds = new Set(); // Store IDs of videos already added to avoid duplicates
const videosData = []; // Store video data for search and autocomplete

/**
 * Scrolls to the video element with the given videoId.
 * @param {string} videoId - The ID of the video element to scroll to.
 */
function scrollToVideo(videoId) {
    const videoElement = document.getElementById(`${videoId}`);
    console.log("videoElement::",videoElement);

    if (videoElement) {
        videoElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    document.getElementById('searchBox').value = ''; // Clear search box
    document.getElementById('autocompleteContainer').innerHTML = ''; // Clear suggestions
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('searchBox');
    const autocompleteContainer = document.getElementById('autocompleteContainer');
    
    // Initialize search functionality
    initializeSearch(videosData, searchBox, autocompleteContainer, scrollToVideo);
    
    // Fetch playlists and videos
    getPlaylists().then(playlists => {
        displayPlaylists(playlists);
        playlists.forEach(playlist => {
            fetchVideosForPlaylist(playlist.id).then(videos => {
                displayVideos(playlist.id, videos, addedVideoIds);

                videos.forEach(video => {
                    videosData.push({
                        id: video.snippet.resourceId.videoId,
                        title: video.snippet.title,
                        playlistId: playlist.id
                    });
                });
            });
        });
    });

});
