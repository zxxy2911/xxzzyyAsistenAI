function sendMessage() {
  const input = document.getElementById('user-input');
  const chatBox = document.getElementById('chat-box');
  const message = input.value;

  if (!message) return;

  chatBox.innerHTML += `<div><b>Kamu:</b> ${message}</div>`;
  input.value = '';

  fetch('/api/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message })
  })
  .then(res => res.json())
  .then(data => {
    chatBox.innerHTML += `<div><b>xxzzyyAI:</b> ${data.response}</div>`;
    chatBox.scrollTop = chatBox.scrollHeight;
  });
}