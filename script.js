const firebaseConfig = {
  apiKey: "BURAYA_YAPISTIR",
  authDomain: "BURAYA",
  databaseURL: "BURAYA",
  projectId: "BURAYA"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

const messagesEl = document.getElementById('messages');
const msgInput = document.getElementById('msg');
const chatForm = document.getElementById('chatForm');
const loginBtn = document.getElementById('loginBtn');
const roomGenel = document.getElementById('roomGenel');
const roomSohbet = document.getElementById('roomSohbet');

let user = null;
let room = 'genel';
let currentRef = null;

function setActiveRoom(sel) {
  room = sel;
  roomGenel.classList.toggle('active', room === 'genel');
  roomSohbet.classList.toggle('active', room === 'sohbet');
  messagesEl.innerHTML = '';
  if (currentRef) currentRef.off('child_added');
  currentRef = db.ref('rooms/' + room);
  currentRef.on('child_added', snap => {
    const data = snap.val();
    const d = document.createElement('div');
    d.innerHTML = `<b>${data.name}:</b> ${data.text}`;
    messagesEl.appendChild(d);
    messagesEl.scrollTop = messagesEl.scrollHeight;
  });
}

roomGenel.addEventListener('click', () => setActiveRoom('genel'));
roomSohbet.addEventListener('click', () => setActiveRoom('sohbet'));

loginBtn.addEventListener('click', () => {
  auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
    .then(res => {
      user = res.user;
      loginBtn.textContent = user.displayName;
      loginBtn.disabled = true;
      setActiveRoom(room);
    })
    .catch(() => alert('Giriş yapılamadı.'));
});

chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = msgInput.value.trim();
  if (!text) return;
  if (!user) {
    alert('Önce giriş yapın.');
    return;
  }
  db.ref('rooms/' + room).push({ name: user.displayName, text });
  msgInput.value = '';
});

setActiveRoom('genel');
