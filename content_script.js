document.addEventListener('mouseup', function(event) {
    let selectedText = window.getSelection().toString().trim();
    removeExistingButton();

    if (selectedText.length > 0) {
        let button = createDefineButton(event.clientX, event.clientY, selectedText);
        document.body.appendChild(button);
        console.log('Button added to DOM', button); // Check if the button is added
    }
});

function removeExistingButton() {
    let existingButton = document.getElementById('textSelectorButton');
    if (existingButton) {
        existingButton.remove();
        console.log('Existing button removed'); // Confirm removal
    }
}

function createDefineButton(x, y, text) {
    let button = document.createElement('button');
    button.textContent = 'Define';
    button.id = 'textSelectorButton';
    button.style.position = 'absolute';
    button.style.top = (y + window.scrollY + 10) + 'px';
    button.style.left = (x + window.scrollX + 10) + 'px';
    button.style.zIndex = '1000';

    // Directly attach an event listener to the button
    button.addEventListener('click', function() {
        console.log('Button clicked'); // Ensure the click is captured
        showCustomModal(text);
    });

    return button;
}


function showCustomModal(text) {
    console.log('showCustomModal called with text:', text);
    chrome.runtime.sendMessage({action: "openPopup", text: text}, function(response) {
        console.log('Message sent to background script');
    });
}
