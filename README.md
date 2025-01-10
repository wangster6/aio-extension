# Explain-It Chrome Extension
This Google Chrome extension allows users to highlight text on any webpage and receive an explanation of the selected text through the OpenAI API. When users highlight text, a button appears next to it. Clicking the button sends the highlighted text to the API, retrieves an explanation, and displays it in a pop-up window. The extension is designed to improve usability and efficiency in understanding complex or unfamiliar terms or phrases. This project uses HTML and CSS for the front-end, JavaScript for functionality, the OpenAI API for text processing, and the Google Chrome Extensions API for integration with the browser.
<br><br>

## Features
- **Text Highlighting:** Users can highlight text on any webpage, triggering the extension's functionality.
- **API Integration:** The extension leverages the OpenAI API to generate explanations for the selected text.
- **Dynamic Button Display:** A "Define" button appears near the highlighted text, allowing seamless interaction.
- **Pop-up Explanations:** The explanation from the OpenAI API is displayed in a visually appealing pop-up window on the webpage.
- **Customizable API Key:** Users can securely store their OpenAI API key in the extension's settings for easy setup and use.
- **User-Friendly Interface:** The extension includes a clean and simple UI with clear prompts and buttons.
<br>

## Prerequisites
- Google Chrome Browser
- OpenAI API Key (get it [here](https://openai.com/api/))
<br>

## Technologies Used
- **HTML and CSS:** Used for building and styling the front-end interface, including the pop-up and options pages.
- **JavaScript:** Handles the core logic of the extension, such as detecting highlighted text, managing API calls, and displaying results in the pop-up.
- **OpenAI API:** Processes the highlighted text and generates explanations for the user.
- **Google Chrome Extensions API:** Facilitates interaction with the Chrome browser, enabling extension-specific functionalities such as storing user data, managing background scripts, and displaying pop-ups.
<br>

## Getting Started
1. Clone this repository to your local machine.
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer Mode**.
4. Click **Load unpacked** and select the project directory.
5. Right-click on the extension icon, click **Options**, and enter your OpenAI API Key.
6. Pin the extension for quick access by clicking the puzzle icon and selecting the extension.
<br>

## Usage
1. Highlight any text on a webpage.
2. Click the "Define" button that appears next to the highlighted text.
3. View the explanation in the pop-up window that appears.
<br>

## File Descriptions
- **background.js:** Manages background events and communication between components. Opens the pop-up when triggered.
- **content_script.js:** Handles text highlighting, button creation, API calls, and dynamic positioning of the button and pop-up.
- **options.html & options.js:** Provides a settings page for users to securely store their OpenAI API key.
- **popup.html & popup.js:** Displays the explanation in a pop-up window.
- **styles.css:** Styles the pop-up window and other UI elements for a user-friendly experience.
<br>

## Contributing
Contributions to this project are welcome! Feel free to submit issues or pull requests.
<br><br>

## Contact
For questions or feedback, please contact me on [my profile](https://github.com/wangster6).
<br><br>

## Contributors
<a href="https://github.com/wangster6/raydsa/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=wangster6/raydsa" />
</a>
