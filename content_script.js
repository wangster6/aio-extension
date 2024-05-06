const popupHTML = `
<div id="myCustomPopup" style="display: none; position: fixed; width: 300px; height: 200px; background-color: white; border: 1px solid black; z-index: 1000; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
  <div id="popupContent">Loading...</div>
  <button id="closePopup" style="background-color: yellow; border: 1px solid black;">Close</button>
</div>
`;
document.body.insertAdjacentHTML('beforeend', popupHTML);
// Close button functionality
document.getElementById('closePopup').addEventListener('click', function() {
    removeExistingPopup();
});

var alreadySelectedText = '';
var selectedText = '';

document.addEventListener('mouseup', function(event) {
    selectedText = window.getSelection().toString().trim();
    // console.log("Selected Text:", selectedText)

    if (selectedText.length > 0 && selectedText != alreadySelectedText) {
        removeExistingButton();
        removeExistingPopup();
        var button = createDefineButton(event.clientX, event.clientY, selectedText);
        console.log('Button added to DOM', button);
        alreadySelectedText = selectedText;
    }
});

document.addEventListener('click', function(e) {
    let button = document.getElementById('textSelectorButton');
    if (button && !button.contains(e.target)) {
        const selection = window.getSelection();
        if (!selection.toString().trim()) {
            button.style.display = 'none';  // hide button if there's no selection
        } else {
            button.style.display = 'block';  // show button if there is a selection
            positionButtonNearSelection(button);  // reposition button according to new selection
        }
    }
});


window.addEventListener('resize', function() {
    let button = document.getElementById('textSelectorButton');
    if (button) {
        positionButtonNearSelection(button);
    }
});
window.addEventListener('scroll', function() {
    let button = document.getElementById('textSelectorButton');
    if (button) {
        positionButtonNearSelection(button);
    }
});


function createDefineButton(x, y, text) {
    let existingButton = document.getElementById('textSelectorButton');
    if (existingButton) existingButton.remove();

    let button = document.createElement('button');
    button.textContent = 'Define';
    button.id = 'textSelectorButton';
    button.style.position = 'absolute';
    button.style.zIndex = '1000';
    button.style.opacity = '1';
    button.style.background = 'white';
    button.style.border = '1px solid black';

    button.addEventListener('click', function() {
        console.log('Define button clicked');
        document.getElementById('popupContent').textContent = text;
        document.getElementById('myCustomPopup').style.display = 'block';
        positionPopupUnderButton(button);
    });

    document.body.appendChild(button);
    positionButtonNearSelection(button);

    return button;
}

function positionButtonNearSelection(button) {
    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    let range = selection.getRangeAt(0);
    let rect = range.getBoundingClientRect();

    button.style.top = `${rect.top + window.scrollY - button.offsetHeight+5}px`;
    button.style.left = `${rect.right + window.scrollX+10}px`;
}

function positionPopupUnderButton(button) {
    let rect = button.getBoundingClientRect();
    let popup = document.getElementById('myCustomPopup');
    if (!popup) return;

    popup.style.position = 'absolute';
    popup.style.top = `${rect.bottom + window.scrollY}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
}

function removeExistingButton() {
    let existingButton = document.getElementById('textSelectorButton');
    if (existingButton) {
        existingButton.remove();
        console.log('Existing button removed'); // Confirm removal
    }
}

function removeExistingPopup() {
    let popup = document.getElementById('myCustomPopup');
    if (popup) {
        popup.style.display = 'none';
        console.log('Popup removed'); // Confirm removal
    }
}