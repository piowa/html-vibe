const slides = Array.from(document.querySelectorAll('.slide'));
const dotsContainer = document.querySelector('.slider-dots');
const prevBtn = document.querySelector('.control.prev');
const nextBtn = document.querySelector('.control.next');

let currentIndex = 0;
let intervalId;

function createDots() {
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.setAttribute('aria-label', `Slajd ${index + 1}`);
    dot.addEventListener('click', () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });
}

function setActiveSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
    if (dotsContainer.children[i]) {
      dotsContainer.children[i].classList.toggle('active', i === index);
    }
  });
}

function goToSlide(index) {
  currentIndex = (index + slides.length) % slides.length;
  setActiveSlide(currentIndex);
  resetInterval();
}

function nextSlide() {
  goToSlide(currentIndex + 1);
}

function prevSlide() {
  goToSlide(currentIndex - 1);
}

function startInterval() {
  intervalId = setInterval(nextSlide, 6500);
}

function resetInterval() {
  clearInterval(intervalId);
  startInterval();
}

createDots();
setActiveSlide(currentIndex);
startInterval();

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    clearInterval(intervalId);
  } else {
    startInterval();
  }
});
