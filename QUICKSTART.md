# Quick Start Guide - DeepSeek Exporter Extension

## 📦 Project Structure Created

```
deepseek-exporter-extension/
├── manifest.json          ✅ Extension configuration
├── popup.html            ✅ Popup interface
├── popup.js              ✅ Popup logic
├── content.js            ✅ Conversation extraction
├── background.js         ✅ Background service worker
├── styles.css            ✅ Beautiful UI styling
├── icons/                ⚠️  Add actual PNG icons
│   └── ICON_README.md    ✅ Icon instructions
└── README.md            ✅ Project documentation
```

## 🚀 Installation Steps

### Step 1: Add Icons (Required)

Before installing, you need to add PNG icons to the `icons/` folder:

1. **Create or download icons** (16x16, 48x48, 128x128 pixels)
2. **Save them as:**
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`
3. **Place them in:** `deepseek-exporter-extension/icons/`

**Quick icon generation:** Use [favicon.io](https://favicon.io/text-to-favicon/) with text "DS" or similar.

### Step 2: Load Extension in Chrome

1. Open Chrome browser
2. Navigate to: `chrome://extensions/`
3. **Enable Developer Mode** (toggle in top-right corner)
4. Click **"Load unpacked"** button
5. Select the `deepseek-exporter-extension` folder
6. Extension is now installed! 🎉

### Step 3: Use the Extension

1. Go to: https://chat.deepseek.com
2. Click the extension icon in browser toolbar
3. Choose:
   - **Export Conversation** - Export current chat
   - **Export All Conversations** - Export everything
4. Markdown file(s) will download automatically

## 🔧 Git Setup (Optional)

To push to GitHub:

```bash
# Make script executable (Linux/Mac)
chmod +x INIT_GIT.sh

# Run initialization script
./INIT_GIT.sh

# After adding icons, commit and push:
git add .
git commit -m "Add icons"
git branch -M main
git push -u origin main
```

**Or do it manually:**
```bash
cd deepseek_exporter
git init
git add .
git commit -m "Initial commit"
git remote add origin git@github.com:Oasis-AI-Lab/deepseek-exporter.git
git push -u origin main
```

## 📋 Features

- ✅ Export current conversation to Markdown
- ✅ Export all conversations at once
- ✅ Beautiful purple gradient UI
- ✅ Context menu right-click export
- ✅ Automatic filename generation with timestamps
- ✅ Clean Markdown formatting with headers

## 🐛 Troubleshooting

**Extension not working?**
- Make sure you're on chat.deepseek.com
- Refresh the page after installing
- Check browser console for errors (F12)

**Missing icons?**
- Extension will show default Chrome puzzle piece
- Follow Step 1 above to add custom icons

**Can't export?**
- Try refreshing the page
- Check that you have active conversations
- Look for error messages in the popup

## 📝 Notes

- Extension language: English (as requested)
- Target website: https://chat.deepseek.com
- Export format: Markdown (.md files)
- No external dependencies required

## 🎨 Customization

Want to change the look?
- Edit `styles.css` for colors and layout
- Modify `popup.html` for UI structure
- Update `content.js` for extraction logic

Happy exporting! 📥
