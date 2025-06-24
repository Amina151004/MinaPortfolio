

// Parallax scroll + fold effect
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  const heroText = document.querySelector('.hero-text');
  const robot = document.querySelector('.robot');
  const circle = document.querySelector('.circle-scroll');
  const circle1 = document.querySelector('.left');
  const corner = document.querySelector('.corner-image');
  const aboutMe = document.querySelector('.aboutme');

  if (heroText) heroText.style.transform = `translateY(${scrollY * 0.3}px)`;
  if (robot) robot.style.transform = `translateY(${scrollY * 0.1}px)`;
  if (circle) circle.style.transform = `rotate(${scrollY * 0.3}deg)`;
  if (circle1) circle1.style.transform = `rotate(${scrollY * 0.3}deg)`;
  if (corner) corner.style.transform = `translateY(${scrollY * 0.2}px)`;

  if (aboutMe) {
    const rect = aboutMe.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      aboutMe.classList.add('unfolded');
    }
  }
});

// Gmail contact form
document.getElementById('contactForm').addEventListener('submit', function(event) {
  event.preventDefault();
  const name = encodeURIComponent(document.getElementById('name').value);
  const email = encodeURIComponent(document.getElementById('email').value);
  const message = encodeURIComponent(document.getElementById('message').value);
  const subject = `Message from ${name}`;
  const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
  window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=aminahenni15@gmail.com&su=${subject}&body=${body}`, '_blank');
});

// Skills slider drag
const slider = document.querySelector('.skills-slider');
let isDown = false, startX, scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => { isDown = false; slider.classList.remove('active'); });
slider.addEventListener('mouseup', () => { isDown = false; slider.classList.remove('active'); });
slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  slider.scrollLeft = scrollLeft - (x - startX) * 2;
});
slider.addEventListener('touchstart', (e) => {
  isDown = true;
  startX = e.touches[0].pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('touchend', () => { isDown = false; });
slider.addEventListener('touchmove', (e) => {
  if (!isDown) return;
  const x = e.touches[0].pageX - slider.offsetLeft;
  slider.scrollLeft = scrollLeft - (x - startX) * 2;
});

const text = "Welcome to my portfolio";
const loaderText = document.querySelector('.loader-text');
let index = 0;
let typing = true;

function typeWriter() {
  if (typing) {
    if (index < text.length) {
      loaderText.textContent += text.charAt(index);
      index++;
      setTimeout(typeWriter, 100);
    } else {
      typing = false;
      setTimeout(typeWriter, 1000); // pause before delete
    }
  } else {
    if (index > 0) {
      loaderText.textContent = text.substring(0, index - 1);
      index--;
      setTimeout(typeWriter, 50);
    } else {
      // Once done, fade out loader
      document.querySelector('.loader').style.opacity = '0';
      document.querySelector('.loader').style.visibility = 'hidden';
    }
  }
}

// Start typing on load
window.addEventListener('load', () => {
  typeWriter();
});

// Main cursor
const cursor = document.createElement('div');
cursor.classList.add('custom-cursor');
document.body.appendChild(cursor);

// Move main cursor + create trail
document.addEventListener('mousemove', e => {
  cursor.style.top = `${e.clientY}px`;
  cursor.style.left = `${e.clientX}px`;

  createTrailDot(e.clientX, e.clientY);
});

// Create small trailing dot
function createTrailDot(x, y) {
  const trail = document.createElement('div');
  trail.classList.add('cursor-trail');
  trail.style.top = `${y}px`;
  trail.style.left = `${x}px`;
  document.body.appendChild(trail);

  // Fade + remove
  setTimeout(() => {
    trail.style.opacity = '0';
  }, 10);

  setTimeout(() => {
    trail.remove();
  }, 500);
}
window.addEventListener('scroll', () => {
  const elements = document.querySelectorAll('.hidden');
  elements.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add('visible');
      el.classList.remove('hidden');
    }
  });
});


const slider1 = document.querySelector('.projects-slider');
const cards = document.querySelectorAll('.project-card');
const leftBtn = document.querySelector('.left-arrow');
const rightBtn = document.querySelector('.right-arrow');

let currentIndex = 0;
const cardWidth = cards[0].offsetWidth + 30; // Width + margin

function updateSlider() {
  // Remove active class from all cards
  cards.forEach(card => card.classList.remove('active'));
  
  // Add active class to current card
  cards[currentIndex].classList.add('active');
  
  // Calculate offset (centering the active card)
  const offset = (slider1.offsetWidth / 2) - (cardWidth / 2) - (currentIndex * cardWidth);
  slider1.style.transform = `translateX(${offset}px)`;
}

// Initialize slider
updateSlider();

// Event listeners for arrows
leftBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  updateSlider();
});

rightBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  updateSlider();
});

// Optional: Handle window resize
window.addEventListener('resize', updateSlider);