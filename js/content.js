function createChatBox() {
  const chatBox = document.createElement('div');
  chatBox.id = 'chat-box';
  chatBox.innerHTML = `
    <div id="message-container"></div>
    <form id="message-form">
      <input type="text" id="message-input" placeholder="Type your message" autocomplete="off">
      <button type="submit">Send</button>
    </form>
  `;
  document.body.appendChild(chatBox);
}

function initializeChat() {
  createChatBox();

  const messageForm = document.getElementById('message-form');
  const messageInput = document.getElementById('message-input');
  const messageContainer = document.getElementById('message-container');

  function createMessageElement(text, sender) {
    const messageWrapper = document.createElement('div');
    messageWrapper.classList.add('message-wrapper', sender);

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = text;

    messageWrapper.appendChild(messageElement);
    return messageWrapper;
  }

  function addMessageToContainer(element) {
    messageContainer.appendChild(element);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }

  async function computerReply(message) {
    chrome.runtime.sendMessage({ type: 'fetchGPTResponse', message }, async (response) => {
      const replyElement = createMessageElement(response.reply, 'computer');
      addMessageToContainer(replyElement);
    });
  }

  messageForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const message = messageInput.value.trim();
    if (message) {
      const messageElement = createMessageElement(message, 'user');
      addMessageToContainer(messageElement);
      messageInput.value = '';
      await computerReply(message);
    }
  });
}

initializeChat();
