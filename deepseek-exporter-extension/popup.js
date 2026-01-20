document.addEventListener('DOMContentLoaded', function() {
  const exportBtn = document.getElementById('exportBtn');
  const exportAllBtn = document.getElementById('exportAllBtn');
  const statusDiv = document.getElementById('status');
  const statusText = document.getElementById('status-text');
  
  // Show status message
  function showStatus(message, type = 'info') {
    statusText.textContent = message;
    statusDiv.className = `status ${type}`;
    statusDiv.classList.remove('hidden');
    
    setTimeout(() => {
      statusDiv.classList.add('hidden');
    }, 3000);
  }
  
  // Export current conversation
  exportBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.includes('chat.deepseek.com')) {
        showStatus('Please open DeepSeek website', 'error');
        return;
      }
      
      showStatus('Exporting conversation...', 'info');
      
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'exportCurrent' });
      
      if (response && response.success) {
        showStatus('Conversation exported successfully!', 'success');
        downloadMarkdown(response.content, response.filename);
      } else {
        showStatus('Failed to export conversation', 'error');
      }
    } catch (error) {
      console.error('Export error:', error);
      showStatus('Please refresh the page and try again', 'error');
    }
  });
  
  // Export all conversations
  exportAllBtn.addEventListener('click', async () => {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      
      if (!tab.url.includes('chat.deepseek.com')) {
        showStatus('Please open DeepSeek website', 'error');
        return;
      }
      
      showStatus('Exporting all conversations...', 'info');
      
      const response = await chrome.tabs.sendMessage(tab.id, { action: 'exportAll' });
      
      if (response && response.success) {
        showStatus(`${response.count} conversations exported!`, 'success');
        
        // Download each conversation
        response.conversations.forEach(conv => {
          downloadMarkdown(conv.content, conv.filename);
        });
      } else {
        showStatus('Failed to export conversations', 'error');
      }
    } catch (error) {
      console.error('Export error:', error);
      showStatus('Please refresh the page and try again', 'error');
    }
  });
  
  // Download Markdown file
  function downloadMarkdown(content, filename) {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }
});
