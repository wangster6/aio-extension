document.getElementById('saveKey').addEventListener('click', function() {
    var apiKey = document.getElementById('apiKey').value;
    chrome.storage.local.set({'apiKey': apiKey}, function() {
        alert('API Key saved successfully!');
    });
});
