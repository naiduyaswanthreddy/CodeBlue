document.addEventListener('DOMContentLoaded', () => {
    const uploadForm = document.getElementById('upload-form');
    const fileInput = document.getElementById('file-input');
    const chatSection = document.getElementById('chat-section');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatbox = document.getElementById('chatbox');
    const historyList = document.getElementById('history-list');
  
    let searchHistory = [];
  
    // Handle file upload
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const file = fileInput.files[0];
      if (file) {
        // Handle file upload logic here
        console.log('File uploaded:', file.name);
        chatSection.classList.remove('hidden');
      }
    });
  
    // Handle chatbot interaction
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const userMessage = chatInput.value;
      displayMessage('You', userMessage);
      fetch('/api/chatbot', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      })
        .then(response => response.json())
        .then(data => {
          displayMessage('Bot', data.response);
          updateHistory(userMessage);
        })
        .catch(error => console.error('Error:', error));
      chatInput.value = '';
    });
  
    function displayMessage(sender, message) {
      const messageDiv = document.createElement('div');
      const messageContent = document.createElement('p');
      messageContent.innerHTML = `<strong>${sender}:</strong> ${message}`;
      messageDiv.appendChild(messageContent);
      chatbox.appendChild(messageDiv);
      chatbox.scrollTop = chatbox.scrollHeight;
    }
  
    function updateHistory(query) {
      searchHistory.push(query);
      const historyItem = document.createElement('li');
      historyItem.textContent = query;
      historyList.appendChild(historyItem);
    }
  });
  