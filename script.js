const chatLogEl = document.getElementById('chatLog');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const usernameInput = document.getElementById('usernameInput');
const roomButtons = document.querySelectorAll('.channel');
let activeRoom = 'genel';

const STORAGE_KEY = 'rac-chat-state';
const state = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');

const rooms = {
  genel: state.genel || [],
  ilan: state.ilan || [],
};
let username = state.username || '';

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify({
    username,
    genel: rooms.genel,
    ilan: rooms.ilan,
  }));
}

function appendMessage(text, from, save=true) {
  const msg = document.createElement('div');
  msg.className = 'message ' + (from === 'user' ? 'user' : 'other');
  msg.textContent = text;
  chatLogEl.append(msg);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
  if (save) {
    rooms[activeRoom].push({ text, from });
    saveState();
  }
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

usernameInput.value = username;
usernameInput.addEventListener('input', () => {
  username = usernameInput.value.trim();
  saveState();
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  if (!username) {
    alert('Önce kullanıcı adını girin.');
    return;
  }
  appendMessage(`${username}: ${text}`, 'user');
  input.value = '';
});

renderRoom();
