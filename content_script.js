const popupHTML = `
<div id="myCustomPopup" style="display: flex; flex-direction: column; position: fixed; width: 30vh; background-color: white; border: 1px solid black; z-index: 1000; padding: 20px; box-shadow: 0 4px 6px rgba(0,0,0,0.2);">
    <div id="popupContent" style="flex-grow: 1; overflow-y: auto;">Loading...</div>
    <button id="closePopup" style="background-color: yellow; border: 1px solid black; margin-top: 3px; align-self: center;">Close</button>
</div>
`;
document.body.insertAdjacentHTML("beforeend", popupHTML);
// popup close button functionality
document.getElementById("closePopup").addEventListener("click", function () {
    removeExistingPopup();
});

var alreadySelectedText = "";
var selectedText = "";

async function fetchDefinition(text, apiKey) {
    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{
                    "role": "user",
                    "content": "Define: " + text
                }]
            })
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} - ${response.statusText}`);
        }
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (e) {
        console.error("Error fetching definition from OpenAI:", e);
        throw e;
    }
}

document.addEventListener("click", function (event) {
    selectedText = window.getSelection().toString().trim();
    // console.log("Selected Text:", selectedText)

    if (selectedText.length > 0 && selectedText != alreadySelectedText) {
        removeExistingButton();
        removeExistingPopup();
        var button = createDefineButton(event.clientX, event.clientY, selectedText);
        // console.log("Button added to DOM", button);
        alreadySelectedText = selectedText;
    }
});

document.addEventListener("click", function (e) {
    let button = document.getElementById("textSelectorButton");
    if (button && !button.contains(e.target)) {
        const selection = window.getSelection();
        if (!selection.toString().trim()) {
        button.style.display = "none"; // hide button if there's no selection
        } else {
        button.style.display = "block"; // show button if there is a selection
        positionButtonNearSelection(button); // reposition button according to new selection
        }
    }
});

window.addEventListener("resize", function () {
    let button = document.getElementById("textSelectorButton");
    if (button) {
        positionButtonNearSelection(button);
    }
});

window.addEventListener("scroll", function () {
    let button = document.getElementById("textSelectorButton");
    if (button) {
        positionButtonNearSelection(button);
    }
});

function createDefineButton(x, y, text) {
    let existingButton = document.getElementById("textSelectorButton");
    if (existingButton) existingButton.remove();

    let button = document.createElement("button");
    button.textContent = "Define";
    button.id = "textSelectorButton";
    button.style.position = "absolute";
    button.style.zIndex = "1000";
    button.style.opacity = "1";
    button.style.background = "white";
    button.style.border = "1px solid black";

    button.addEventListener("click", function () {
        // retrieve OPENAI_API_KEY from storage
        chrome.storage.local.get(['apiKey'], function(result) {
            if (result.apiKey) {
                fetchDefinition(selectedText, result.apiKey)
                    .then((definition) => {
                        document.getElementById("popupContent").textContent = definition;
                        document.getElementById("myCustomPopup").style.display = "block";
                        positionPopupUnderButton(button);
                    })
                    .catch((error) => {
                        document.getElementById("popupContent").textContent = "Failed to fetch definition: " + error.message;
                        document.getElementById("myCustomPopup").style.display = "block";
                        positionPopupUnderButton(button);
                    });
            } else {
                alert('ERROR: OPENAI API KEY IS NOT SET.\n\n1. Right-click on the extension icon in the top right of your browser.\n2. Click on "Options".\n3. Enter your API key in the text box and click "Save".\n4. Refresh this page.');
            }
        });
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

    button.style.top = `${rect.top + window.scrollY - button.offsetHeight + 5}px`;
    button.style.left = `${rect.right + window.scrollX + 10}px`;
}

function positionPopupUnderButton(button) {
    let rect = button.getBoundingClientRect();
    let popup = document.getElementById("myCustomPopup");
    if (!popup) return;

    popup.style.position = "absolute";
    popup.style.top = `${rect.bottom + window.scrollY}px`;
    popup.style.left = `${rect.left + window.scrollX}px`;
}

function removeExistingButton() {
    let existingButton = document.getElementById("textSelectorButton");
    if (existingButton) {
        existingButton.remove();
        // console.log("BUTTON REMOVED: DEFINE");
    }
}

function removeExistingPopup() {
    let popup = document.getElementById("myCustomPopup");
    if (popup) {
        popup.style.display = "none";
        // console.log("POPUP REMOVED");
    }
}

// removes the initial popup when the page is loaded. popup appears because display is set to flex in the popupHTML rather than none.
removeExistingPopup();
