chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getText") {
        console.log("Received text: ", request.text);  // Add this line for debugging
        chrome.action.setPopup({popup: "popup.html"}, () => {
            chrome.action.enable(sender.tab.id);
        });
        chrome.storage.local.set({selectedText: request.text});
        sendResponse({status: "Text saved"});
    }
});
