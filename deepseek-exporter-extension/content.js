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
  let messages = [];
  
  // Find all ds-message elements
  const messageElements = document.querySelectorAll('.ds-message');
  
  if (messageElements.length === 0) {
    console.log('No .ds-message elements found');
    return null;
  }
  
  console.log(`Found ${messageElements.length} message elements`);
  
  // Extract each message
  messageElements.forEach((el, index) => {
    try {
      // Determine if it's user or assistant
      // User messages have simpler structure, assistant messages have ds-markdown
      const isAssistant = el.querySelector('.ds-markdown') !== null;
      const role = isAssistant ? 'assistant' : 'user';
      
      // Extract content
      let content = '';
      
      if (isAssistant) {
        // Assistant message: get markdown content
        const markdownEl = el.querySelector('.ds-markdown');
        if (markdownEl) {
          content = markdownEl.innerText?.trim() || '';
        }
      } else {
        // User message: get direct text content
        content = el.innerText?.trim() || '';
      }
      
      // Only add if there's content
      if (content && content.length > 0) {
        messages.push({ role, content });
        console.log(`Message ${index + 1} (${role}): ${content.substring(0, 50)}...`);
      }
    } catch (error) {
      console.error('Error extracting message:', error);
    }
  });
  
  if (messages.length === 0) {
    console.log('No messages extracted');
    return null;
  }
  
  console.log(`Successfully extracted ${messages.length} messages`);
  
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
  // Try to find title in the conversation header
  const titleSelectors = [
    '.afa34042.e37a04e4.e0a1edb7', // Specific class for conversation title
    '[class*="title"]',
    'h1',
    '._765a5cd' // Parent container that might contain title
  ];
  
  for (const selector of titleSelectors) {
    const element = document.querySelector(selector);
    if (element) {
      const title = element.textContent?.trim();
      if (title && title !== 'DeepSeek' && title !== '探索未至之境' && title.length > 2) {
        console.log('Found title:', title);
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
