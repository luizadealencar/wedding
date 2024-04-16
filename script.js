function countdown() {
    const weddingDate = new Date('2025-12-06T00:00:00');
    const currentDate = new Date();
  
    const totalSeconds = (weddingDate - currentDate) / 1000;
  
    const days = Math.floor(totalSeconds / 3600 / 24);
    const hours = Math.floor(totalSeconds / 3600) % 24;
    const minutes = Math.floor(totalSeconds / 60) % 60;
    const seconds = Math.floor(totalSeconds) % 60;
  
    document.getElementById('countdown').innerHTML = `
      <div>${days} Dias</div>
      <div>${hours} Horas</div>
      <div>${minutes} Minutos</div>
      <div>${seconds} Segundos</div>
    `;
  }
  
  countdown();
  setInterval(countdown, 1000);

  let currentIndex = 0;
  const slides = document.querySelectorAll('.slide');
  const totalSlides = slides.length;
  
  function showSlide(index) {
    slides.forEach((slide, idx) => {
      slide.style.transform = `translateX(-${index * 100}%)`;
    });
  }
  
  // Next slide
  function nextSlide() {
    if (currentIndex < totalSlides - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    showSlide(currentIndex);
  }
  
  // Previous slide
  function prevSlide() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalSlides - 1;
    }
    showSlide(currentIndex);
  }
  
  // Automatic slide change
  setInterval(nextSlide, 3000);
  
  // Optional: Add event listeners for next and previous buttons
  // document.querySelector('#next').addEventListener('click', nextSlide);
  // document.querySelector('#prev').addEventListener('click', prevSlide);

  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menu = document.querySelector('.menu');
  
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('open');
    });
  });
  