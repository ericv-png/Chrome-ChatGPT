document.addEventListener('DOMContentLoaded', () => {
  const settingsForm = document.getElementById('settings-form');

  restoreOptions();

  settingsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    saveOptions();
  });
  
  function restoreOptions() {
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
        document.getElementById('api-key').value = items.apiKey;
        document.getElementById('model').value = items.model;
        document.getElementById('max-tokens').value = items.maxTokens;
        document.getElementById('n').value = items.n;
        document.getElementById('stop').value = items.stop;
        document.getElementById('temperature').value = items.temperature;
      }
    );
  }
});

function saveOptions() {
  const apiKey = document.getElementById('api-key').value;
  const model = document.getElementById('model').value;
  const maxTokens = document.getElementById('max-tokens').value;
  const n = document.getElementById('n').value;
  const stop = document.getElementById('stop').value;
  const temperature = document.getElementById('temperature').value;

  chrome.storage.sync.set({
    apiKey,
    model,
    maxTokens: parseInt(maxTokens),
    n: parseInt(n),
    stop,
    temperature: parseFloat(temperature),
  });
}

document.getElementById('settings-form').addEventListener('submit', async (event) => {
  event.preventDefault();
  await saveOptions();
  const successMessage = document.getElementById('success-message');
  successMessage.style.display = 'flex';

  setTimeout(() => {
    successMessage.style.display = 'none';
  }, 3000);
});
