const chatLogEl = document.getElementById('chatLog');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const roomButtons = document.querySelectorAll('.channel');
let activeRoom = 'genel';

const rooms = {
  genel: [],
  ilan: [],
};

function appendMessage(text, from, save=true) {
  const msg = document.createElement('div');
  msg.className = 'message ' + (from === 'user' ? 'user' : 'other');
  msg.textContent = text;
  chatLogEl.append(msg);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
  if (save) rooms[activeRoom].push({ text, from });
}

function renderRoom() {
  chatLogEl.innerHTML = '';
  rooms[activeRoom].forEach(m => appendMessage(m.text, m.from, false));
}

roomButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    roomButtons.forEach(x => x.classList.remove('active'));
    btn.classList.add('active');
    activeRoom = btn.dataset.room;
    renderRoom();
  });
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  appendMessage(text, 'user');
  input.value = '';
});

renderRoom();
