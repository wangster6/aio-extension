chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === "openPopup") {
        chrome.storage.local.set({selectedText: request.text}, function() {
            chrome.action.openPopup();
        });
    }
});