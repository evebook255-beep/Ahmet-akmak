const chatLogEl = document.getElementById('chatLog');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const roomButtons = document.querySelectorAll('.room-btn');
const roomTitle = document.getElementById('roomTitle');

const rooms = {
  genel: [],
  ilan: [],
};
let activeRoom = 'genel';

function renderRoom() {
  chatLogEl.innerHTML = '';
  roomTitle.textContent = activeRoom === 'genel' ? 'Genel Sohbet' : 'Araç İlan';
  rooms[activeRoom].forEach((m) => appendMessage(m.text, m.who, false));
}

function appendMessage(text, who, save = true) {
  const div = document.createElement('div');
  div.className = `message ${who}`;
  div.textContent = text;
  chatLogEl.appendChild(div);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
  if (save) rooms[activeRoom].push({ who, text });
}

roomButtons.forEach((button) => {
  button.addEventListener('click', () => {
    roomButtons.forEach((x) => x.classList.remove('active'));
    button.classList.add('active');
    activeRoom = button.dataset.room;
    renderRoom();
  });
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) return;
  appendMessage(value, 'user');
  input.value = '';
});

renderRoom();