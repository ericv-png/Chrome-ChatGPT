const port = chrome.runtime.connect({ name: 'chat' });

document.addEventListener('DOMContentLoaded', () => {

  port.onMessage.addListener((msg) => {
    if (msg.reply) {
      const computerMessage = {
        role: 'assistant',
        content: msg.reply,
      };
      appendMessage(computerMessage);
      (async () => {
        const chatHistory = await getChatHistory();
        chatHistory.push(computerMessage);
        await saveChatHistory(chatHistory);
      })();
    }
  });

  document.getElementById('send-button').addEventListener('click', sendMessage);

  document.getElementById('message-input').addEventListener('keypress', (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      sendMessage();
    }
  });

  document.getElementById('clear-button').addEventListener('click', async () => {
    await saveChatHistory([]);
    location.reload();
  });

  (async () => {
    const chatHistory = await getChatHistory();
    chatHistory.forEach((message) => {
      appendMessage(message);
    });
  })();
});

async function sendMessage() {
  const inputField = document.getElementById('message-input');
  const messageText = inputField.value.trim();

  if (messageText.length === 0) {
    return;
  }

  inputField.value = '';

  const userMessage = {
    role: 'user',
    content: messageText,
  };

  appendMessage(userMessage);

  (async () => {
    const chatHistory = await getChatHistory();
    chatHistory.push(userMessage);
    await saveChatHistory(chatHistory);
  })();

  port.postMessage({ type: 'fetchGPTResponse', prompt: messageText });
}

function appendMessage(message) {
  const chatContainer = document.getElementById('message-container');
  const messageElement = document.createElement('div');
  messageElement.classList.add('message');
  messageElement.classList.add(message.role);
  messageElement.innerText = message.content;
  chatContainer.appendChild(messageElement);

  chatContainer.scrollTop = chatContainer.scrollHeight;
}

async function getChatHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.get({ chatHistory: [] }, (items) => {
      resolve(items.chatHistory);
    });
  });
}

async function saveChatHistory(chatHistory) {
  return new Promise((resolve) => {
    chrome.storage.local.set({ chatHistory }, () => {
      resolve();
    });
  });
}



port.onDisconnect.addListener(() => {
  console.log('Port disconnected');
});
