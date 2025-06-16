/* ========================================================================
   script.js   –   Portfolio Interactions
   ====================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  /* ---------- 1.  AOS (Animate‑On‑Scroll) ---------- */
  if (window.AOS) {
    AOS.init({
      duration: 800,
      offset: 120,
      once: false,
      easing: 'ease-in-out'
    });
  }

  /* ---------- 2.  Mobile Nav Toggle ---------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });

    // Close the menu after clicking any nav link
    navLinks.querySelectorAll('a').forEach(link =>
      link.addEventListener('click', () => navLinks.classList.remove('active'))
    );
  }

  /* ---------- 3.  Project Carousel ---------- */
  const track   = document.querySelector('.carousel-track');
  const cards   = document.querySelectorAll('.project-card');
  const leftBtn = document.querySelector('.arrow.left');
  const rightBtn= document.querySelector('.arrow.right');
  const titleEl = document.getElementById('project-title');
  const descEl  = document.getElementById('project-desc');

  if (track && cards.length && leftBtn && rightBtn && titleEl && descEl) {
    let currentIndex = 0;
    const totalCards = cards.length;
    const cardWidth  = cards[0].offsetWidth + 20; // card width + gap

    const updateProjectText = (idx) => {
      const card = cards[idx];
      titleEl.textContent = card.dataset.title;
      descEl.textContent  = card.dataset.desc;
    };

    const updateClasses = () => {
      cards.forEach((card, i) =>
        card.classList.toggle('active', i === currentIndex)
      );
    };

    const moveCarousel = (dir) => {
      currentIndex =
        dir === 'right'
          ? (currentIndex + 1) % totalCards
          : (currentIndex - 1 + totalCards) % totalCards;

      track.style.transform = `translateX(${-currentIndex * cardWidth}px)`;
      updateProjectText(currentIndex);
      updateClasses();
    };

    // Initialize
    updateProjectText(0);
    updateClasses();

    // Event listeners
    leftBtn.addEventListener('click', () => moveCarousel('left'));
    rightBtn.addEventListener('click', () => moveCarousel('right'));

    // Swipe Support
    let startX = 0;
    track.addEventListener('touchstart', (e) => (startX = e.touches[0].clientX));
    track.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) moveCarousel(dx < 0 ? 'right' : 'left');
    });
  }
});
