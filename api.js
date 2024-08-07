
////////
// This file contains functions to interact with the YouTube Data API to fetch playlists and videos.
///////

const API_KEY = 'AIzaSyDFrQMvXTZ9PARFXvLpcOTSeC8bBOu6Pw0';
const channelId = 'UCZnjaU2W0YZ-6n-CRiaCikQ';
const playlistsUrl = `https://youtube.googleapis.com/youtube/v3/playlists?part=contentDetails%2C%20snippet&channelId=${channelId}&maxResults=8&key=${API_KEY}`;

/**
 * Fetches playlists from the YouTube channel.
 * @returns {Promise<Array>} A promise that resolves to an array of playlists.
 */
export function getPlaylists() {
    return fetch(playlistsUrl)
        .then(response => response.json())
        .then(data => data.items)
        .catch(error => {
            console.error('Error fetching playlists:', error);
            return [];
        });
}

/**
 * Fetches videos for a given playlist.
 * @param {string} playlistId - The ID of the playlist to fetch videos for.
 * @returns {Promise<Array>} A promise that resolves to an array of videos.
 */
export function fetchVideosForPlaylist(playlistId) {
    const videoslistUrl = `https://youtube.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=4&playlistId=${playlistId}&key=${API_KEY}`;
    
    return fetch(videoslistUrl)
        .then(response => response.json())
        .then(data => data.items)
        .catch(error => {
            console.error('Error fetching videos:', error);
            return [];
        });
}
