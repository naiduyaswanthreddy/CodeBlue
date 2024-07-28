document.addEventListener('DOMContentLoaded', () => {
  const messageButton = document.getElementById('messageButton');
  const messageContainer = document.getElementById('messageContainer');

  messageButton.addEventListener('click', () => {
    messageContainer.classList.add('visible');
  });


});
