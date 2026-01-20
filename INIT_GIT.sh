#!/bin/bash

# Initialize Git repository and set up remote
# Run this script after customizing icons

echo "Initializing Git repository..."

cd "$(dirname "$0")"

# Initialize git
git init

# Add all files
git add .

# Create initial commit
git commit -m "Initial commit: DeepSeek Exporter Chrome Extension

- Created complete Chrome extension structure
- Implemented conversation export to Markdown
- Added popup interface with export options
- Included context menu integration
- Created comprehensive README
- Added icons placeholder"

# Add remote repository
git remote add origin git@github.com:Oasis-AI-Lab/deepseek-exporter.git

echo "✓ Git repository initialized"
echo "✓ Initial commit created"
echo "✓ Remote repository added"
echo ""
echo "Next steps:"
echo "1. Add actual PNG icons to deepseek-exporter-extension/icons/"
echo "2. Run: git add ."
echo "3. Run: git commit -m 'Add actual icons'"
echo "4. Run: git push -u origin main"
