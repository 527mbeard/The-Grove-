// ─── CUSTOM CURSOR ───────────────────────────────────────────────────────────
const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
  cursor.style.left = mx + 'px';
  cursor.style.top = my + 'px';
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  ring.style.left = rx + 'px';
  ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .vendor-card, .product-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.width = '18px';
    cursor.style.height = '18px';
    cursor.style.background = 'var(--terracotta)';
    ring.style.width = '54px';
    ring.style.height = '54px';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.width = '10px';
    cursor.style.height = '10px';
    cursor.style.background = 'var(--olive)';
    ring.style.width = '36px';
    ring.style.height = '36px';
  });
});

// ─── NAVBAR SCROLL ───────────────────────────────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
});

// ─── SCROLL REVEAL ───────────────────────────────────────────────────────────
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
reveals.forEach(r => observer.observe(r));

// ─── COUNT-UP STATS ──────────────────────────────────────────────────────────
function animateCounter(el) {
  const target = parseInt(el.dataset.target);
  const suffix = target >= 1000 ? '+' : (target < 20 ? '' : '+');
  const duration = 1800;
  const steps = 60;
  let current = 0;
  const increment = target / steps;
  const timer = setInterval(() => {
    current = Math.min(current + increment, target);
    el.textContent = (target >= 1000
      ? Math.round(current / 1000 * 10) / 10 + 'k'
      : Math.round(current)) + suffix;
    if (current >= target) clearInterval(timer);
  }, duration / steps);
}

const statObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      document.querySelectorAll('[data-target]').forEach(animateCounter);
      statObs.disconnect();
    }
  });
}, { threshold: 0.3 });

const statsSection = document.querySelector('.manifesto-stats');
if (statsSection) statObs.observe(statsSection);

// ─── TESTIMONIALS ────────────────────────────────────────────────────────────
let currentSlide = 0;
const slides = document.querySelectorAll('.testimonial-slide');
const dots = document.querySelectorAll('.tdot');

function goToSlide(index) {
  slides[currentSlide].classList.remove('active');
  dots[currentSlide].classList.remove('active');
  currentSlide = index;
  slides[currentSlide].classList.add('active');
  dots[currentSlide].classList.add('active');
}

setInterval(() => goToSlide((currentSlide + 1) % slides.length), 5000);

// ─── SEASONAL TABS ───────────────────────────────────────────────────────────
const seasonalData = {
  spring: [
    { emoji: '🌿', name: 'French Breakfast Radish', origin: 'Sunrise Farm · 3 mi', desc: 'Crisp and peppery with a blush-pink hue. Best enjoyed with cultured butter and fleur de sel.', price: '$4 / bunch' },
    { emoji: '🥬', name: 'Mâche Rosettes', origin: 'Valley Green · 8 mi', desc: "Tender, nutty lamb's lettuce harvested at dawn. Exceptionally delicate.", price: '$6 / bag' },
    { emoji: '🍓', name: 'Gariguette Strawberries', origin: 'Orchard Row · 12 mi', desc: 'Elongated French heirloom variety. Intensely aromatic with a wine-like depth.', price: '$9 / pint' },
    { emoji: '🧄', name: 'Green Garlic', origin: 'Heritage Hill · 5 mi', desc: 'Young, uncured garlic with a mild, grassy flavor. Use like a scallion.', price: '$3 / stalk' },
  ],
  summer: [
    { emoji: '🍅', name: 'Heirloom Tomatoes', origin: 'Sunrise Farm · 3 mi', desc: 'A rainbow of varieties from Brandywine to Cherokee Purple. Dry-farmed for intense flavor.', price: '$7 / lb' },
    { emoji: '🌽', name: 'Silver Queen Corn', origin: 'Meadow Run · 6 mi', desc: 'Picked at peak sweetness. Best eaten within hours of harvest.', price: '$1.50 / ear' },
    { emoji: '🫐', name: 'Wild Blueberries', origin: 'Hilltop Berry · 10 mi', desc: 'Tiny, intensely flavored lowbush blueberries. Richer and more complex than cultivated varieties.', price: '$8 / pint' },
    { emoji: '🌶️', name: 'Jimmy Nardello Peppers', origin: 'Heritage Hill · 5 mi', desc: 'The finest frying pepper in existence. Sweet, thin-skinned, extraordinary.', price: '$5 / lb' },
  ],
  autumn: [
    { emoji: '🎃', name: 'Delicata Squash', origin: 'Root & Vine · 7 mi', desc: 'Cream-colored with green stripes. Edible skin, sweet chestnut-like flesh. Perfect for roasting.', price: '$4 / each' },
    { emoji: '🍎', name: 'Roxbury Russet Apples', origin: 'Orchard Row · 12 mi', desc: "America's oldest apple variety. Nutty, dense, and sublime for cider-making.", price: '$6 / lb' },
    { emoji: '🍄', name: 'Hen of the Woods', origin: 'Forest Folk · 4 mi', desc: 'Foraged maitake mushrooms with an extraordinary texture and deep, earthy savoriness.', price: '$18 / lb' },
    { emoji: '🧅', name: 'Cipollini Onions', origin: 'Sunrise Farm · 3 mi', desc: 'Small, flat Italian onions with a sweet, rich flavor perfect for roasting or braising.', price: '$5 / lb' },
  ],
  winter: [
    { emoji: '🌱', name: 'Waterloo Endive', origin: 'Valley Green · 8 mi', desc: 'Grown in darkness for pure white, mild, pleasantly bitter leaves. An underrated winter treasure.', price: '$7 / head' },
    { emoji: '🧡', name: 'Kabocha Squash', origin: 'Root & Vine · 7 mi', desc: 'Japanese pumpkin with dense, velvety flesh and a natural sweetness. A winter staple.', price: '$5 / each' },
    { emoji: '🌿', name: 'Greenhouse Microgreens', origin: 'City Roots · 2 mi', desc: 'Year-round gem. Sunflower, pea shoot, and radish blends grown under careful light.', price: '$8 / tray' },
    { emoji: '🍋', name: 'Meyer Lemons', origin: 'Far South Grove · 40 mi', desc: 'Thin-skinned, sweeter than Eureka lemons. Essential for winter baking and cocktails.', price: '$6 / bag' },
  ]
};

function filterSeason(season, btn) {
  document.querySelectorAll('.season-tab').forEach(t => t.classList.remove('active'));
  btn.classList.add('active');
  const grid = document.getElementById('productsGrid');
  grid.style.opacity = '0';
  setTimeout(() => {
    grid.innerHTML = seasonalData[season].map((p, i) => `
      <div class="product-card reveal visible" style="transition-delay:${i * 0.1}s">
        <span class="product-emoji">${p.emoji}</span>
        <div class="product-name">${p.name}</div>
        <div class="product-origin">${p.origin}</div>
        <div class="product-desc">${p.desc}</div>
        <div class="product-price">${p.price}</div>
      </div>
    `).join('');
    grid.style.opacity = '1';
  }, 300);
}

// ─── NEWSLETTER ──────────────────────────────────────────────────────────────
function subscribeNewsletter() {
  const email = document.getElementById('nlEmail').value;
  const note = document.getElementById('nlNote');
  if (email && email.includes('@')) {
    note.style.color = 'var(--olive)';
    note.textContent = '✓ Welcome to The Grove community! Check your inbox.';
    document.getElementById('nlEmail').value = '';
  } else {
    note.style.color = 'var(--terracotta)';
    note.textContent = 'Please enter a valid email address.';
  }
}

// ─── MOBILE MENU ─────────────────────────────────────────────────────────────
function toggleMenu() {
  const links = document.querySelector('.nav-links');
  const cta = document.querySelector('.nav-cta');
  if (links.style.display === 'flex') {
    links.style.display = 'none';
    cta.style.display = 'none';
  } else {
    links.style.display = 'flex';
    links.style.flexDirection = 'column';
    links.style.position = 'fixed';
    links.style.top = '70px';
    links.style.left = '0';
    links.style.right = '0';
    links.style.background = 'var(--warm-white)';
    links.style.padding = '30px 40px';
    links.style.gap = '24px';
    links.style.borderBottom = '1px solid var(--parchment)';
    links.style.zIndex = '99';
    cta.style.display = 'none';
  }
}