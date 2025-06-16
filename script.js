document.addEventListener('DOMContentLoaded', () => {

  /* ------------ 1.  AOS  ------------ */
  if (window.AOS) {
    AOS.init({duration:800,offset:120,once:false,easing:'ease-in-out'});
  }

 const track = document.querySelector('.carousel-track');
const cards = document.querySelectorAll('.project-card');
const leftBtn = document.querySelector('.arrow.left');
const rightBtn = document.querySelector('.arrow.right');
const title = document.getElementById('project-title');
const desc = document.getElementById('project-desc');

let currentIndex = 0;
const totalCards = cards.length;
const visibleCards = 1;
const cardWidth = cards[0].offsetWidth + 20;

function updateProjectText(index) {
  const card = cards[index];
  title.textContent = card.getAttribute('data-title');
  desc.textContent = card.getAttribute('data-desc');
}

function updateClasses() {
  cards.forEach((card, i) => {
    card.classList.remove('active');
    if (i === currentIndex) {
      card.classList.add('active');
    }
  });
}

function moveCarousel(direction) {
  if (direction === 'right') {
    currentIndex = (currentIndex + 1) % totalCards;
  } else {
    currentIndex = (currentIndex - 1 + totalCards) % totalCards;
  }
  const offset = -currentIndex * cardWidth;
  track.style.transform = `translateX(${offset}px)`;
  updateProjectText(currentIndex);
  updateClasses();
}

// Initial load
updateProjectText(0);
updateClasses();

// Event listeners
leftBtn.addEventListener('click', () => moveCarousel('left'));
rightBtn.addEventListener('click', () => moveCarousel('right'));

  // initial
  render();
});
