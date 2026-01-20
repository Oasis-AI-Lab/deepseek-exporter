// Listen for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'exportCurrent') {
    const result = exportCurrentConversation();
    sendResponse(result);
  } else if (request.action === 'exportAll') {
    const result = exportAllConversations();
    sendResponse(result);
  }
  return true; // Keep message channel open for async response
});

// Export current conversation
function exportCurrentConversation() {
  try {
    const conversationData = extractConversationData();
    
    if (!conversationData) {
      return { success: false, error: 'No conversation found' };
    }
    
    const markdown = formatConversationToMarkdown(conversationData);
    const filename = generateFilename(conversationData.title);
    
    return { success: true, content: markdown, filename };
  } catch (error) {
    console.error('Export error:', error);
    return { success: false, error: error.message };
  }
}

// Export all conversations
function exportAllConversations() {
  try {
    const conversations = extractAllConversations();
    
    if (!conversations || conversations.length === 0) {
      return { success: false, error: 'No conversations found' };
    }
    
    const results = conversations.map(conv => {
      const markdown = formatConversationToMarkdown(conv);
      const filename = generateFilename(conv.title);
      return { content: markdown, filename };
    });
    
    return { success: true, conversations: results, count: results.length };
  } catch (error) {
    console.error('Export error:', error);
    return { success: false, error: error.message };
  }
}

// Extract current conversation data
function extractConversationData() {
  // Try different selectors for DeepSeek's conversation structure
  const selectors = [
    'article[data-testid^="conversation-"]',
    '[class*="message"]',
    '[class*="chat"]',
    '[role="presentation"]'
  ];
  
  let messages = [];
  
  // Try to find message elements
  for (const selector of selectors) {
    const elements = document.querySelectorAll(selector);
    if (elements.length > 0) {
      elements.forEach(el => {
        const role = el.querySelector('[class*="user"], [class*="assistant"]') 
          ? 'assistant'
          : 'user';
        
        const content = el.innerText?.trim();
        if (content) {
          messages.push({ role, content });
        }
      });
      
      if (messages.length > 0) break;
    }
  }
  
  // Fallback: Try to parse from page content
  if (messages.length === 0) {
    const pageContent = document.body.innerText;
    if (pageContent) {
      // Simple heuristic: split by common patterns
      const parts = pageContent.split(/\\n{3,}/);
      parts.forEach(part => {
        if (part.trim()) {
          messages.push({ role: 'assistant', content: part.trim() });
        }
      });
    }
  }
  
  if (messages.length === 0) {
    return null;
  }
  
  const title = extractTitle();
  
  return {
    title,
    messages,
    url: window.location.href,
    timestamp: new Date().toISOString()
  };
}

// Extract all conversations from sidebar
function extractAllConversations() {
  const conversations = [];
  
  // Try to find conversation links in sidebar
  const conversationLinks = document.querySelectorAll('nav a[href*="/chat/"]');
  
  conversationLinks.forEach((link, index) => {
    const title = link.textContent?.trim() || `Conversation ${index + 1}`;
    conversations.push({
      title,
      messages: [{ role: 'assistant', content: `[Click to view: ${link.href}]` }],
      url: link.href,
      timestamp: new Date().toISOString()
    });
  });
  
  // If no sidebar found, return current conversation
  if (conversations.length === 0) {
    const currentConv = extractConversationData();
    if (currentConv) {
      conversations.push(currentConv);
    }
  }
  
  return conversations;
}

// Extract conversation title
function extractTitle() {
  const titleSelectors = [
    'h1',
    '[class*="title"]',
    'head title'
  ];
  
  for (const selector of titleSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      const title = element.textContent?.trim();
      if (title && title !== 'DeepSeek') {
        return title;
      }
    }
  }
  
  return `DeepSeek_Conversation_${new Date().toISOString().slice(0, 10)}`;
}

// Format conversation to Markdown
function formatConversationToMarkdown(conversation) {
  let markdown = '';
  
  // Header
  markdown += `# ${conversation.title}\\n\\n`;
  markdown += `**Exported from:** ${conversation.url}\\n`;
  markdown += `**Date:** ${new Date(conversation.timestamp).toLocaleString()}\\n\\n`;
  markdown += `---\\n\\n`;
  
  // Messages
  conversation.messages.forEach(msg => {
    const roleLabel = msg.role === 'user' ? '**User:**' : '**Assistant:**';
    markdown += `${roleLabel}\\n\\n`;
    markdown += `${msg.content}\\n\\n`;
    markdown += `---\\n\\n`;
  });
  
  return markdown;
}

// Generate filename
function generateFilename(title) {
  const sanitized = title
    .replace(/[^a-zA-Z0-9\\s-_]/g, '')
    .replace(/\\s+/g, '_')
    .substring(0, 50);
  const timestamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
  return `${sanitized}_${timestamp}.md`;
}
