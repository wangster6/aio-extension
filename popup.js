document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['selectedText'], function(result) {
        document.getElementById('displayedText').textContent = result.selectedText || 'No text selected.';
    });
});