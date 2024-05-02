document.addEventListener('mouseup', function() {
    const selectedText = window.getSelection().toString().trim();
    if (selectedText.length > 0) {
        console.log("Sending text: ", selectedText);  // Add this line for debugging
        chrome.runtime.sendMessage({action: "getText", text: selectedText});
    }
});
