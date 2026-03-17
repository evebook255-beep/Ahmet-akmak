const chatLogEl = document.getElementById('chatLog');
const form = document.getElementById('chatForm');
const input = document.getElementById('messageInput');
const roomButtons = document.querySelectorAll('.room-btn');
const roomTitle = document.getElementById('roomTitle');

const rooms = {
  genel: [{ who: 'bot', text: 'Hoş geldiniz! Genel sohbete başlayabilirsiniz.' }],
  ilan: [{ who: 'bot', text: 'Araç ilan alanına hoş geldiniz. Model ve fiyat yazabilirsiniz.' }],
};
let activeRoom = 'genel';

function renderRoom() {
  chatLogEl.innerHTML = '';
  rooms[activeRoom].forEach((m) => appendMessage(m.text, m.who, false));
  roomTitle.textContent = activeRoom === 'genel' ? 'Genel Sohbet' : 'Araç İlan';
}

function appendMessage(text, who, save = true) {
  const div = document.createElement('div');
  div.className = `message ${who}`;
  div.textContent = text;
  chatLogEl.appendChild(div);
  chatLogEl.scrollTop = chatLogEl.scrollHeight;
  if (save) rooms[activeRoom].push({ who, text });
}

function getAutoReply(room, inputText) {
  const text = inputText.trim().toLowerCase();
  if (!text) return 'Lütfen bir mesaj gir.';

  if (room === 'genel') {
    if (text.includes('selam') || text.includes('merhaba')) return 'Merhaba! Royal Auto CPM’e hoş geldin.';
    if (text.includes('nasıl') || text.includes('naber')) return 'Güzel, sen nasılsın?';
    return 'Genel sohbet alanı: her konudan yazabilirsiniz.';
  }

  if (room === 'ilan') {
    if (text.includes('fiyat') || text.includes('fiyatı')) return 'Fiyat bilgisi için modeli ve km’yi yazabilirsiniz.';
    if (text.includes('model') || text.includes('marka')) return 'Bu aracı ilan kısmında paylaştığınız için teşekkürler.';
    return 'Araç ilan: model, yıl, km, fiyat gibi bilgileri paylaşabilirsiniz.';
  }

  return 'Mesaj kaydedildi.';
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
  setTimeout(() => {
    appendMessage(getAutoReply(activeRoom, value), 'bot');
  }, 180);
});

renderRoom();