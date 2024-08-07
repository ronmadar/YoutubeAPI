
//////
// This file contains functions to update the UI with playlists and videos.
/////

import { createVideoElement } from './utils.js';

/**
 * Displays playlists on the page.
 * @param {Array} playlists - An array of playlist objects to display.
 */
export function displayPlaylists(playlists) {
    const videoSection = document.querySelector('section');
    videoSection.innerHTML = ''; // Clear previous content

    playlists.forEach(playlist => {
        const playlistId = playlist.id;
        const playlistTitle = playlist.snippet.title;

        // Create HTML for playlist
        videoSection.innerHTML += `
            <div class="playlist mb-4">
                <h2>${playlistTitle}</h2>
                <hr>
                <div id="${playlistId}" class="videos row"></div>
            </div>
        `;
    });
}

/**
 * Displays videos for a given playlist on the page.
 * @param {string} playlistId - The ID of the playlist.
 * @param {Array} videos - An array of video objects to display.
 * @param {Set} addedVideoIds - A set of video IDs already added to avoid duplicates.
 */
export function displayVideos(playlistId, videos, addedVideoIds) {
    const playlistElement = document.getElementById(playlistId);
    const loader = document.querySelector('.load-box');
    playlistElement.innerHTML = ''; // Clear previous videos
    loader.style.display = 'none';

    videos.forEach(video => {
        const videoId = video.snippet.resourceId.videoId;
        if (addedVideoIds.has(videoId)) {
            // Skip adding this video if it already exists
            return;
        }

        addedVideoIds.add(videoId);
        const videoTitle = video.snippet.title;
        const videoThumbnail = video.snippet.thumbnails.high.url;

        // Create HTML for video
        playlistElement.innerHTML += createVideoElement(videoId, videoTitle, videoThumbnail);

        setTimeout(() => {
            const videoId = video.snippet.resourceId.videoId;
            const player = videojs(`my-video-${videoId}`);
            player.ready(function () {
                this.play();
            });
        }, 2000);
    });
}

