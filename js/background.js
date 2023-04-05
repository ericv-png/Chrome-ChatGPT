chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg) => {
    if (msg.type === 'fetchGPTResponse') {
      const rawResponse = await fetchGPTResponse(msg.prompt);
      const filteredResponse = filterResponse(rawResponse); // Filter the response
      port.postMessage({ reply: filteredResponse }); // Send the filtered response
    }
	port.onDisconnect.addListener(() => {
	console.log('Port disconnected');
	});
  });
});

async function fetchGPTResponse(prompt) {
  const settings = await getSettings();
  const chatHistory = await getChatHistory();
  const apiKey = settings.apiKey;
  const model = settings.model;
  const maxTokens = settings.maxTokens;
  const n = settings.n;
  const stop = settings.stop;
  const temperature = settings.temperature;
  

  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${apiKey}`);

  const requestOptions = {
    method: 'POST',
    headers,
    body: JSON.stringify({
      model: model,
      messages: chatHistory,
      max_tokens: maxTokens,
      n: n,
      stop: stop,
      temperature: temperature,
    }),
  };

  const response = await fetch('https://api.openai.com/v1/chat/completions', requestOptions);
  const data = await response.json();
  return data.choices[0].message.content.trim();
}

async function getSettings() {
  return new Promise((resolve) => {
    chrome.storage.sync.get(
      {
        apiKey: '',
        model: 'gpt-3.5-turbo',
        maxTokens: 50,
        n: 1,
        stop: '',
        temperature: 0.5,
      },
      (items) => {
        resolve(items);
      }
    );
  });
}

async function getChatHistory() {
  return new Promise((resolve) => {
    chrome.storage.local.get(['chatHistory'], (result) => {
      if (result.chatHistory) {
        resolve(result.chatHistory);
      } else {
        resolve([]);
      }
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

chrome.action.onClicked.addListener(() => {
  chrome.windows.create({
    url: 'popup.html',
    type: 'popup',
    width: 400,
    height: 500,
  });
});

function filterResponse(response) {
  const urlRegex = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;

  return response.replace(urlRegex, (url) => {
    return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
  });
}



