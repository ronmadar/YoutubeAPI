
//////
// This file sets up the search functionality, including debounced search and keyboard navigation.
//////

export function initializeSearch(videosData, searchBox, autocompleteContainer, scrollToVideo) {
    let debounceTimeout;
    let highlightedIndex = -1; // Track the currently highlighted suggestion

    searchBox.addEventListener('input', function() {
        clearTimeout(debounceTimeout);
        debounceTimeout = setTimeout(() => {
            const query = searchBox.value.toLowerCase();
            autocompleteContainer.innerHTML = '';
            highlightedIndex = -1;

            if (query.length > 0) {
                const filteredVideos = videosData.filter(video =>
                    video.title.toLowerCase().includes(query)
                );

                filteredVideos.forEach(video => {
                    const suggestion = document.createElement('div');
                    suggestion.classList.add('autocomplete-suggestion');
                    suggestion.textContent = video.title;
                    suggestion.dataset.videoId = "my-video-" + video.id; // Store video ID
                    suggestion.addEventListener('click', () => {
                        scrollToVideo(suggestion.dataset.videoId);
                    });
                    autocompleteContainer.appendChild(suggestion);
                });
            }
        }, 300);
    });

    searchBox.addEventListener('keydown', function(event) {
        const suggestions = Array.from(autocompleteContainer.querySelectorAll('.autocomplete-suggestion'));
        if (event.key === 'ArrowDown') {
            event.preventDefault();
            if (highlightedIndex < suggestions.length - 1) {
                highlightedIndex++;
                updateHighlightedSuggestion();
            }
        } else if (event.key === 'ArrowUp') {
            event.preventDefault();
            if (highlightedIndex > 0) {
                highlightedIndex--;
                updateHighlightedSuggestion();
            }
        } else if (event.key === 'Enter') {
            event.preventDefault();
            if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
                scrollToVideo(suggestions[highlightedIndex].dataset.videoId);
            }
        }
    });

    /**
     * Updates the highlighted suggestion in the autocomplete list.
     */
    function updateHighlightedSuggestion() {
        const suggestions = Array.from(autocompleteContainer.querySelectorAll('.autocomplete-suggestion'));
        suggestions.forEach(suggestion => suggestion.classList.remove('highlighted'));
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
            suggestions[highlightedIndex].classList.add('highlighted');
            suggestions[highlightedIndex].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }
}
