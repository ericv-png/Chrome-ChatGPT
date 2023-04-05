# ChatGPT Browser Extension

Chrome ChatGPT is a Chromium plugin that enables users to chat with ChatGPT directly in their browser. It has an options page and saves chat messages for context, allowing for a better understanding of the user's needs.

## Installation

To install Chrome ChatGPT, follow these steps:

1. Clone the repository or download the latest release
2. Open your Chromium browser
3. Go to `chrome://extensions`
4. Turn on Developer mode (if not already on)
5. Click on `Load unpacked` and select the `src` folder of the repository/download

## Usage

To start chatting with ChatGPT, click on the ChatGPT icon in your browser's toolbar. This will open a chat window where you can enter your messages. Your chat content will be saved for content until the `Clear Chat History` button in the top right is pressed.

## Options

ChatGPT also has an options page where you can change the settings of the plugin. To access the options page, right-click on the ChatGPT icon and select `Options`.

The following settings can be changed:

- **Context messageOPENAI API Key**: Toggle on/off whether to save chat messages for context
- **API URL**: Set your own OpenAI API key
- **Model**: Select you perefered model. Default is `gpt-3.5-turbo`.
- **Max Tokens**: Max amount of tokens used per message. Default is `50`.
- **N**: Number of responses for your message. Default is `1`.
- **Stop**: Sequence where the API will stop generating tokens (e.g., "\n"). Default is `null`.
- **Temperature**: Set the temperature value to control the randomness of the generated text. Default is `0.5`.



## Contributing

If you want to contribute to ChatGPT, please follow these steps:

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes and test them thoroughly
4. Submit a pull request

## Authors

- **Eric Vivens** - *Initial work* - [(https://github.com/ericv-png)

## License

This project is licensed under the MPL 2.0 License - see the [LICENSE] file for details.
