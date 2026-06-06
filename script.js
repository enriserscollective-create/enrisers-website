/* ============================================================
   ENRISERS – script.js
   ============================================================ */

// ---- NAVBAR SCROLL ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- HAMBURGER MENU ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close menu on nav link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// ---- SCROLL REVEAL (IntersectionObserver) ----
const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

// ---- STATS COUNTER ----
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(start);
    }
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.dataset.target);
      if (!isNaN(target) && !el.dataset.animated) {
        el.dataset.animated = 'true';
        animateCounter(el, target);
      }
    }
  });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-num[data-target]').forEach(el => {
  statsObserver.observe(el);
});

// ---- REGISTRATION FORM ----
const form       = document.getElementById('registrationForm');
const formSuccess = document.getElementById('formSuccess');
const submitBtn  = document.getElementById('submitBtn');
const btnText    = document.getElementById('btnText');
const btnLoading = document.getElementById('btnLoading');

// 10-digit mobile validation
function validateMobile(val) {
  return /^[6-9]\d{9}$/.test(val.trim());
}

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // ---- Validate ----
    const name      = form.fullName.value.trim();
    const mobile    = form.mobile.value.trim();
    const standard  = form.standard.value;
    const stream    = form.stream.value;
    const school    = form.schoolName.value.trim();
    const area      = form.area.value.trim();
    const dream     = form.dream.value.trim();
    const challenge = form.challenge.value;
    const consent   = form.consent.checked;

    if (!name)                         return showError('Please enter your full name.');
    if (!validateMobile(mobile))       return showError('Please enter a valid 10-digit mobile number.');
    if (!standard)                     return showError('Please select your standard.');
    if (!stream)                       return showError('Please select your stream.');
    if (!school)                       return showError('Please enter your school name.');
    if (!area)                         return showError('Please enter your area or town.');
    if (!dream)                        return showError('Please tell us your dream or goal.');
    if (!consent)                      return showError('Please give your consent to be contacted.');

    // ---- Loading State ----
    submitBtn.disabled = true;
    btnText.style.display    = 'none';
    btnLoading.style.display = 'inline';

    // ---- STEP 1: Send to Web3Forms (Gmail) ----
    try {
      const formData = new FormData(form);
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
    } catch (err) {
      console.warn('Web3Forms submission error:', err);
      // Continue anyway — WhatsApp still works
    }

    // ---- STEP 2: Open WhatsApp with pre-filled message ----
    const challengeText = challenge ? `\n🚧 Biggest Challenge: ${challenge}` : '';
    const waMessage = `🎓 *NEW WORKSHOP REGISTRATION – ENRISERS*\n\n` +
      `👤 Name: ${name}\n` +
      `📱 Mobile: ${mobile}\n` +
      `📚 Standard: ${standard}\n` +
      `📖 Stream: ${stream}\n` +
      `🏫 School: ${school}\n` +
      `📍 Area/Town: ${area}\n` +
      `💭 Dream/Goal: ${dream}` +
      challengeText + `\n\n` +
      `✅ Consent: Given\n` +
      `🌐 Source: ENRISERS Website`;

    const waURL = `https://wa.me/917604898367?text=${encodeURIComponent(waMessage)}`;

    // Small delay so the form submit registers
    setTimeout(() => {
      window.open(waURL, '_blank');
    }, 600);

    // ---- STEP 3: Show Success + Confetti ----
    setTimeout(() => {
      form.style.display = 'none';
      document.querySelector('.form-header').style.display = 'none';
      formSuccess.style.display = 'block';
      launchConfetti();
      // Scroll to success
      formSuccess.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 800);
  });
}

function showError(msg) {
  const existing = document.querySelector('.form-error-msg');
  if (existing) existing.remove();

  const div = document.createElement('div');
  div.className = 'form-error-msg';
  div.style.cssText = `
    background: rgba(239,68,68,0.15);
    border: 1px solid rgba(239,68,68,0.4);
    color: #fca5a5;
    padding: 14px 18px;
    border-radius: 8px;
    font-size: 14px;
    margin-bottom: 20px;
    font-weight: 500;
  `;
  div.textContent = '⚠️ ' + msg;
  form.insertBefore(div, form.querySelector('.btn-submit'));

  setTimeout(() => div.remove(), 4000);
}

// ---- CONFETTI ----
function launchConfetti() {
  const wrap   = document.getElementById('confettiWrap');
  const colors = ['#c9a84c', '#e8c96a', '#ffffff', '#a07830', '#ffd700', '#ff6b35'];
  const count  = 80;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';

    const left     = Math.random() * 100;
    const delay    = Math.random() * 1.2;
    const duration = 1.5 + Math.random() * 1.5;
    const color    = colors[Math.floor(Math.random() * colors.length)];
    const size     = 6 + Math.random() * 8;
    const rotate   = Math.random() * 360;
    const isCircle = Math.random() > 0.5;

    piece.style.cssText = `
      left: ${left}%;
      background: ${color};
      width: ${size}px;
      height: ${size}px;
      border-radius: ${isCircle ? '50%' : '2px'};
      animation: confetti-fall ${duration}s ${delay}s ease forwards;
      transform: rotate(${rotate}deg);
    `;

    wrap.appendChild(piece);
  }

  // Clean up after
  setTimeout(() => { wrap.innerHTML = ''; }, 4000);
}

// ---- SMOOTH SCROLL for anchor links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80; // navbar height
      const top    = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---- HERO INITIAL REVEAL ----
// Trigger hero animations immediately on load
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 100);
  });
});
