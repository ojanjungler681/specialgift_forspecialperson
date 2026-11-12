const pages = [...document.querySelectorAll('[data-page]')];
const musicButtons = [...document.querySelectorAll('[data-music-toggle]')];
const floatingMusic = document.querySelector('.floating-music');
const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox.querySelector('img');
const confettiLayer = document.querySelector('.confetti-layer');
const backgroundMusic = document.querySelector('#background-music');

let currentPage = 'intro';
let musicPlaying = false;

backgroundMusic.volume = .58;

function showPage(name) {
  const active = document.querySelector('.page.is-active');
  const next = document.querySelector(`[data-page="${name}"]`);
  if (!next || next === active) return;
  active?.classList.add('is-leaving');
  window.setTimeout(() => {
    active?.classList.remove('is-active', 'is-leaving');
    next.classList.add('is-active');
    currentPage = name;
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, 300);
}

function syncMusicUI() {
  floatingMusic.classList.toggle('is-playing', musicPlaying);
  musicButtons.forEach((button) => {
    button.setAttribute('aria-label', musicPlaying ? 'Pause background music' : 'Play background music');
    if (button.classList.contains('round-control')) button.textContent = musicPlaying ? 'Ⅱ' : '▶';
  });
}

function playMusic() {
  const playback = backgroundMusic.play();
  if (playback) {
    playback.catch(() => {
      musicPlaying = false;
      syncMusicUI();
    });
  }
}

function toggleMusic(event) {
  event.stopPropagation();
  if (musicPlaying) {
    backgroundMusic.pause();
  } else {
    playMusic();
  }
}

backgroundMusic.addEventListener('play', () => {
  musicPlaying = true;
  syncMusicUI();
});

backgroundMusic.addEventListener('pause', () => {
  musicPlaying = false;
  syncMusicUI();
});

document.querySelector('[data-open-surprise]').addEventListener('click', () => {
  playMusic();
  floatingMusic.classList.add('is-visible');
  burstConfetti(42);
  showPage('menu');
});

document.querySelectorAll('[data-target]').forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.target));
});

document.querySelectorAll('[data-back]').forEach((button) => {
  button.addEventListener('click', () => showPage('menu'));
});

musicButtons.forEach((button) => button.addEventListener('click', toggleMusic));

document.querySelectorAll('[data-photo]').forEach((button) => {
  button.addEventListener('click', () => {
    lightboxImage.src = button.dataset.photo;
    lightbox.showModal();
  });
});

document.querySelector('.lightbox-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (event) => {
  if (event.target === lightbox) lightbox.close();
});

document.querySelector('[data-open-gift]').addEventListener('click', (event) => {
  event.currentTarget.classList.add('is-open');
  document.querySelector('.letter-card').classList.add('is-revealed');
  burstConfetti(75);
});

function burstConfetti(amount) {
  const colors = ['#ff69b4', '#ffd35e', '#fff', '#bff56e', '#ff9fd4'];
  for (let index = 0; index < amount; index += 1) {
    const piece = document.createElement('i');
    piece.className = 'confetti';
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[index % colors.length];
    piece.style.animationDelay = `${Math.random() * .7}s`;
    piece.style.animationDuration = `${2.4 + Math.random() * 2}s`;
    piece.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
    confettiLayer.appendChild(piece);
    window.setTimeout(() => piece.remove(), 4800);
  }
}

if (window.matchMedia('(pointer:fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  window.addEventListener('pointermove', (event) => {
    const x = (event.clientX / window.innerWidth - .5) * 14;
    const y = (event.clientY / window.innerHeight - .5) * 10;
    document.documentElement.style.setProperty('--mouse-x', `${x}px`);
    document.documentElement.style.setProperty('--mouse-y', `${y}px`);
    document.querySelectorAll('.mini-photo, .portrait-frame').forEach((item, index) => {
      item.style.translate = `${x * (index % 2 ? -.25 : .25)}px ${y * .2}px`;
    });
  }, { passive: true });
}

syncMusicUI();
