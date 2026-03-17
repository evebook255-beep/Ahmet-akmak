const chatLogEl = document.getElementById('chatLog');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');

function appendMessage(text, who) {
  const div = document.createElement('div');
  div.className = `message ${who}`;
  div.textContent = text;
  chatLogEl.appendChild(div);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
}

function getBotReply(inputText) {
  const trimmed = inputText.trim().toLowerCase();
  if (!trimmed) return 'Ne hakkında konuşmak istersin?';
  if (trimmed.includes('selam') || trimmed.includes('merhaba')) return 'Merhaba! Sana nasıl yardımcı olabilirim?';
  if (trimmed.includes('nasıl') || trimmed.includes('naber')) return 'İyiyim, teşekkür ederim. Sen nasılsın?';
  if (trimmed.includes('teşekkür') || trimmed.includes('sağol')) return 'Rica ederim! Başka bir şey var mı?';
  return 'Bu bir demo cevap. Bir konu yaz ve sohbeti devam ettir.';
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  appendMessage(value, 'user');
  input.value = '';
  setTimeout(() => {
    appendMessage(getBotReply(value), 'bot');
  }, 220);
});

appendMessage('Hoş geldin! Sohbet başlatmak için bir şeyler yaz.', 'bot');