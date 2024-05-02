document.addEventListener('DOMContentLoaded', function() {
    chrome.storage.local.get(['selectedText'], function(result) {
        console.log("Popup displaying text: ", result.selectedText);  // Debugging line
        document.getElementById('displayedText').textContent = result.selectedText || 'No text selected.';
    });
});
