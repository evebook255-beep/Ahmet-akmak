const messagesEl = document.getElementById('messages');
const msgInput = document.getElementById('msg');
const chatForm = document.getElementById('chatForm');
const loginBtn = document.getElementById('loginBtn');
const nameInput = document.getElementById('nameInput');
const roomGenel = document.getElementById('roomGenel');
const roomSohbet = document.getElementById('roomSohbet');

const STORAGE_KEY = 'rac-chat-demo';
const MAX_MESSAGES = 80;
let user = localStorage.getItem('rac-user') || '';
let room = 'genel';
const state = loadState();

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { genel: seedMessages('genel'), sohbet: seedMessages('sohbet') };
    const parsed = JSON.parse(raw);
    return {
      genel: parsed.genel || seedMessages('genel'),
      sohbet: parsed.sohbet || seedMessages('sohbet')
    };
  } catch {
    return { genel: seedMessages('genel'), sohbet: seedMessages('sohbet') };
  }
}

function seedMessages(seedRoom) {
  const welcome = seedRoom === 'genel'
    ? 'Hoş geldin! Royal Auto CPM topluluğuna katıldın.'
    : 'Sohbet odasına hoş geldin! Serbest konuşma burada.';
  return [{ name: 'Sistem', text: welcome, ts: Date.now() }];
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function setActiveRoom(sel) {
  room = sel;
  roomGenel.classList.toggle('active', room === 'genel');
  roomSohbet.classList.toggle('active', room === 'sohbet');
  renderMessages();
}

function renderMessages() {
  messagesEl.innerHTML = '';
  state[room].forEach(appendMessage);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

function appendMessage(data) {
  const d = document.createElement('div');
  d.className = `message ${data.name === user ? 'user' : 'other'}`;
  d.innerHTML = `<span class="author">${escapeHtml(data.name)}</span>${escapeHtml(data.text)}`;
  messagesEl.appendChild(d);
}

function escapeHtml(value) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function setUser(nextUser) {
  user = nextUser;
  localStorage.setItem('rac-user', user);
  nameInput.value = user;
  nameInput.disabled = true;
  loginBtn.textContent = `${user} (aktif)`;
  loginBtn.disabled = true;
}

roomGenel.addEventListener('click', () => setActiveRoom('genel'));
roomSohbet.addEventListener('click', () => setActiveRoom('sohbet'));

loginBtn.addEventListener('click', () => {
  const nextUser = nameInput.value.trim();
  if (nextUser.length < 2) {
    alert('Lütfen en az 2 karakterli bir takma ad yazın.');
    return;
  }
  setUser(nextUser);
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (!text) return;
  if (!user) {
    alert('Önce takma ad ile sohbete katılın.');
    return;
  }

  state[room].push({ name: user, text, ts: Date.now() });
  if (state[room].length > MAX_MESSAGES) {
    state[room] = state[room].slice(-MAX_MESSAGES);
  }
  saveState();
  renderMessages();
  msgInput.value = '';
});

if (user) {
  setUser(user);
}
setActiveRoom('genel');
