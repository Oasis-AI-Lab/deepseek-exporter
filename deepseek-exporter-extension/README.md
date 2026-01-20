# DeepSeek Exporter

A Chrome extension that allows you to export your DeepSeek AI conversations to Markdown files.

## Features

- **Export Current Conversation**: Export the active conversation to a Markdown file
- **Export All Conversations**: Export all available conversations at once
- **Beautiful Formatting**: Conversations are formatted in clean Markdown
- **Timestamp Support**: Each export includes the date and time
- **Context Menu**: Right-click to quickly export conversations

## Installation

### Manual Installation

1. Clone this repository:
   ```bash
   git clone git@github.com:Oasis-AI-Lab/deepseek-exporter.git
   ```

2. Open Chrome and navigate to `chrome://extensions/`

3. Enable "Developer mode" in the top right corner

4. Click "Load unpacked" and select the `deepseek-exporter-extension` folder

5. The extension is now installed!

## Usage

### Method 1: Using the Popup

1. Navigate to [https://chat.deepseek.com](https://chat.deepseek.com)
2. Click the DeepSeek Exporter extension icon in your browser toolbar
3. Choose either:
   - **Export Conversation** - Export the current conversation
   - **Export All Conversations** - Export all conversations

### Method 2: Using Context Menu

1. Right-click anywhere on a DeepSeek conversation page
2. Select "Export conversation to Markdown"
3. The file will be downloaded automatically

## Project Structure

```
deepseek-exporter-extension/
├── manifest.json          # Extension configuration
├── popup.html            # Extension popup interface
├── popup.js              # Popup logic
├── content.js            # Content script for extracting conversations
├── background.js         # Background service worker
├── styles.css            # Styling
├── icons/                # Extension icons
│   ├── icon16.png
│   ├── icon48.png
│   └── icon128.png
└── README.md            # This file
```

## Development

### Testing

1. Load the unpacked extension in Chrome
2. Open DeepSeek website
3. Test the export functionality
4. Check browser console for any errors

### Modifying

- **manifest.json**: Update extension name, version, permissions
- **content.js**: Modify conversation extraction logic
- **popup.js**: Change export behavior
- **styles.css**: Customize the UI appearance

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this extension for personal or commercial purposes.

## Support

If you encounter any issues, please open an issue on GitHub.

## Changelog

### Version 1.0.0
- Initial release
- Export single conversation
- Export all conversations
- Context menu integration
- Beautiful UI with gradient design
