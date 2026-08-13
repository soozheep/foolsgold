const SITE_URL = 'https://foolsgold.vercel.app';

const lyricCards = [
  { num: '01', text: 'Don’t let yourself and your heart suffer chasing fools gold' },
  { num: '02', text: 'See yourself clearly for who you are strong and bold' },
  { num: '03', text: 'Seek what you truly and deeply desire. Let it ignite' },
  { num: '04', text: 'Avoid the false promises. Don’t lose your guiding light' },
  { num: '05', text: 'Embrace the fire. The needs you hold inside. No compromise' },
  { num: '06', text: 'True fulfillment comes from authenticity don’t you know' },
  { num: '07', text: 'Listen to your heart it whispers where to go' },
  { num: '08', text: 'Never trade your true desires for distractions fleeting grey' },
  { num: '09', text: 'A life built on truth shines brighter everyday' },
  { num: '10', text: 'Trust your inner compass to point the way' },
  { num: '11', text: 'Be honest with yourself what brings you joy' },
  { num: '12', text: 'The quiet voice of your heart knows the way' },
  { num: '13', text: 'What’s real will stand when illusions fall' },
  { num: '14', text: 'Fools gold may glitter but it’ll never last' },
  { num: '15', text: 'Genuine needs and passions paves the road to the truest treasure' },
  { num: '16', text: 'Seeking authenticity you’ll find the way' }
];

const patternCards = [
  { num: '01', title: 'The Pattern', desc: 'Chasing what glitters but never lasts.', text: 'Don’t let yourself and your heart suffer chasing fools gold.' },
  { num: '02', title: 'The Mechanism', desc: 'How false promises steal your guiding light.', text: 'Never trade your true desires for distractions fleeting grey.' },
  { num: '03', title: 'The Release', desc: 'Let your passions be your guide.', text: 'Embrace the fire. The needs you hold inside. No compromise.' },
  { num: '04', title: 'The Truth', desc: 'Authenticity is the key. It’s worth it all.', text: 'True fulfillment comes from authenticity. A life built on truth shines brighter everyday.' }
];

function renderCards() {
  const lyricsGrid = document.getElementById('lyricsGrid');
  const aboutGrid = document.getElementById('aboutGrid');
  if (!lyricsGrid || !aboutGrid) return;

  lyricsGrid.innerHTML = lyricCards.map(c => `
    <article class="card" data-title="Fools Gold — ${c.num}/16" data-text="${c.text} — Fools Gold by Soozhee | foolsgold.vercel.app" data-img="assets/lyrics/fg-${c.num}.png">
      <div class="card-img-wrap">
        <span class="card-num">${c.num}</span>
        <a href="assets/lyrics/fg-${c.num}.png" target="_blank" rel="noopener"><img class="card-img" src="assets/lyrics/fg-${c.num}.png" alt="Lyric card ${c.num}" loading="lazy" /></a>
      </div>
      <div class="card-body">
        <div class="share-bar">
          <button class="share-btn primary" onclick="shareCard(this)">Share</button>
          <a class="share-btn" href="#" onclick="shareTo('x', this); return false;">𝕏</a>
          <a class="share-btn" href="#" onclick="shareTo('fb', this); return false;">Facebook</a>
          <a class="share-btn" href="#" onclick="shareTo('li', this); return false;">LinkedIn</a>
          <a class="share-btn" href="#" onclick="shareTo('email', this); return false;">Email</a>
          <button class="share-btn" onclick="copyLink(this)">Copy</button>
          <a class="share-btn" download="fg-${c.num}.png" href="assets/lyrics/fg-${c.num}.png">Download</a>
        </div>
      </div>
    </article>`).join('');

  aboutGrid.innerHTML = patternCards.map(c => `
    <article class="card card-wide" data-title="${c.title} — Fools Gold" data-text="${c.text} — foolsgold.vercel.app" data-img="assets/cards/fg-card-${c.num}.png">
      <div class="card-img-wrap">
        <span class="card-num">${c.num} / 04</span>
        <a href="assets/cards/fg-card-${c.num}.png" target="_blank" rel="noopener"><img class="card-img" src="assets/cards/fg-card-${c.num}.png" alt="${c.title}" loading="lazy" /></a>
      </div>
      <div class="card-body">
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
        <div class="share-bar">
          <button class="share-btn primary" onclick="shareCard(this)">Share</button>
          <a class="share-btn" href="#" onclick="shareTo('x', this); return false;">𝕏</a>
          <a class="share-btn" href="#" onclick="shareTo('fb', this); return false;">Facebook</a>
          <a class="share-btn" href="#" onclick="shareTo('li', this); return false;">LinkedIn</a>
          <a class="share-btn" href="#" onclick="shareTo('email', this); return false;">Email</a>
          <button class="share-btn" onclick="copyLink(this)">Copy</button>
          <a class="share-btn" download="fg-card-${c.num}.png" href="assets/cards/fg-card-${c.num}.png">Download</a>
        </div>
      </div>
    </article>`).join('');
}

function getCardData(el) {
  const card = el.closest('.card');
  return {
    title: card.dataset.title,
    text: card.dataset.text,
    img: card.dataset.img
  };
}

function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2200);
}

async function shareCard(btn) {
  const data = getCardData(btn);
  if (navigator.share) {
    try {
      await navigator.share({ title: data.title, text: data.text, url: SITE_URL });
      return;
    } catch (e) {}
  }
  await navigator.clipboard.writeText(data.text + '\n\n' + SITE_URL);
  showToast('Copied — paste anywhere');
}

function shareTo(platform, el) {
  const data = getCardData(el);
  const text = encodeURIComponent(data.text);
  const url = encodeURIComponent(SITE_URL);
  let link = '';
  if (platform === 'x') link = `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
  else if (platform === 'fb') link = `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
  else if (platform === 'li') link = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
  else if (platform === 'email') link = `mailto:?subject=${encodeURIComponent(data.title)}&body=${text}%0A%0A${url}`;
  if (link) window.open(link, '_blank', 'noopener,noreferrer,width=600,height=500');
}

async function copyLink(el) {
  await navigator.clipboard.writeText(SITE_URL);
  showToast('Link copied');
}

async function sharePage() {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Fools Gold — Sonic Remedy | Soozhee',
        text: 'True fulfillment comes from authenticity. Listen to your heart. Fools Gold by Soozhee.',
        url: SITE_URL
      });
      return;
    } catch (e) {}
  }
  await navigator.clipboard.writeText(SITE_URL);
  showToast('Link copied');
}

async function copyPageLink() {
  await navigator.clipboard.writeText(SITE_URL);
  showToast('Link copied');
}

function toggleMobileMenu() {
  document.getElementById('mobileNav').classList.toggle('open');
}

function closeMobileMenu() {
  document.getElementById('mobileNav').classList.remove('open');
}

function openLightbox(src) {
  const lb = document.getElementById('lightbox');
  const img = document.getElementById('lightboxImg');
  img.src = src;
  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('click', function (e) {
  const link = e.target.closest('.card-img-wrap a');
  if (link) {
    e.preventDefault();
    openLightbox(link.getAttribute('href'));
  }
});

document.addEventListener('DOMContentLoaded', function () {
  renderCards();
  const lb = document.getElementById('lightbox');
  if (lb) {
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.classList.contains('lightbox-close')) {
        closeLightbox();
      }
    });
  }
});

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') closeLightbox();
});

(function () {
  const audio = document.getElementById('audio');
  const playBtn = document.getElementById('playBtn');
  const progressBar = document.getElementById('progressBar');
  const progressFill = document.getElementById('progressFill');
  const currentTimeEl = document.getElementById('currentTime');
  const durationEl = document.getElementById('duration');
  const iconPlay = playBtn.querySelector('.icon-play');
  const iconPause = playBtn.querySelector('.icon-pause');

  function formatTime(s) {
    if (!isFinite(s)) return '0:00';
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return m + ':' + (sec < 10 ? '0' : '') + sec;
  }

  playBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      iconPlay.style.display = 'none';
      iconPause.style.display = 'block';
    } else {
      audio.pause();
      iconPlay.style.display = 'block';
      iconPause.style.display = 'none';
    }
  });

  audio.addEventListener('loadedmetadata', () => {
    durationEl.textContent = formatTime(audio.duration);
  });

  audio.addEventListener('timeupdate', () => {
    const pct = (audio.currentTime / audio.duration) * 100 || 0;
    progressFill.style.width = pct + '%';
    currentTimeEl.textContent = formatTime(audio.currentTime);
  });

  audio.addEventListener('ended', () => {
    iconPlay.style.display = 'block';
    iconPause.style.display = 'none';
    progressFill.style.width = '0%';
  });

  progressBar.addEventListener('click', (e) => {
    const rect = progressBar.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });
})();
