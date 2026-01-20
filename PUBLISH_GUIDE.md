# Chrome Web Store Publishing Guide

## Step 1: Create Developer Account

1. Visit: https://chrome.google.com/webstore/dev/dashboard
2. Sign in with your Google account
3. Pay the $5 one-time registration fee
4. Complete the developer profile

## Step 2: Prepare Icons (Required!)

Before publishing, you MUST add real PNG icons to:
```
deepseek-exporter-extension/icons/
├── icon16.png  (16x16 pixels)
├── icon48.png  (48x48 pixels)
└── icon128.png (128x128 pixels)
```

**Generate icons using:**
- ChatGPT: "Create 3 PNG icons for Chrome extension - 16x16, 48x48, 128x128 - purple gradient, export symbol"
- Online tools: https://favicon.io/text-to-favicon/
- Design tools: Figma, Canva, Photoshop

## Step 3: Create Store Assets

You'll need these additional assets:

### Screenshot (1280x800 or 640x400)
- Create a screenshot showing the extension in use
- Show the popup interface
- Save as: `store_screenshot.png`

### Store Listing Information

**Store Listing (English):**
- **Name:** DeepSeek Exporter
- **Short description:** Export your DeepSeek conversations to Markdown files
- **Detailed description:**
  ```
  DeepSeek Exporter allows you to easily export your DeepSeek AI conversations to Markdown format.
  
  Features:
  • Export current conversation to Markdown
  • Export all conversations at once
  • Beautiful formatted output with timestamps
  • One-click download
  • Context menu support
  
  Perfect for:
  • Saving important conversations
  • Documentation purposes
  • Backup your AI interactions
  • Sharing conversations with others
  
  Simply open DeepSeek, click the extension icon, and export!
  ```

**Privacy policy URL:** (Optional but recommended)
- Create a simple privacy policy page
- Host it on GitHub Pages or any static site

**Category:**
- Productivity

## Step 4: Package Extension

1. Create a ZIP file of the extension folder:
   ```bash
   cd deepseek-exporter-extension
   # Right-click > Send to > Compressed (zipped) folder
   # Or use:
   zip -r deepseek-exporter.zip . -x "*.git*" ".*"
   ```

2. The ZIP should contain:
   - manifest.json
   - popup.html
   - popup.js
   - content.js
   - background.js
   - styles.css
   - icons/ (with actual PNG files)

## Step 5: Upload to Chrome Web Store

1. Go to: https://chrome.google.com/webstore/dev/dashboard
2. Click "New Item"
3. Upload the ZIP file
4. Fill in store listing information:
   - Upload screenshots
   - Add descriptions
   - Set category
   - Add privacy policy URL (if you have one)
5. Review and submit

## Step 6: Wait for Review

- Initial review: Usually 1-3 business days
- Google may request changes
- Monitor your email for review updates

## Step 7: After Approval

Once approved:
- Share the store URL
- Update README with store link
- Promote on social media

## Costs

- Developer registration: $5 (one-time)
- Listing: Free
- Updates: Free

## Important Notes

⚠️ **Real icons are REQUIRED** - The extension will be rejected with placeholder icons
⚠️ **Screenshots required** - At least one screenshot needed
⚠️ **Follow policies** - Read Chrome Web Store Developer Program Policy
⚠️ **Test thoroughly** - Make sure everything works before submission

## Alternative: Sideloading

Users can also install without store:
1. Download the extension source
2. Go to `chrome://extensions/`
3. Enable Developer Mode
4. Load unpacked extension

This is how you currently share with others during development.

## Useful Links

- Chrome Web Store Developer Dashboard: https://chrome.google.com/webstore/dev/dashboard
- Developer Policies: https://developer.chrome.com/docs/webstore/program-policies/
- Packaging Extensions: https://developer.chrome.com/docs/webstore/publish/
