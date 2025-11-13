// Carrusel simple para el home
(function () {
  const carousels = document.querySelectorAll('.carousel');
  carousels.forEach((carousel) => {
    const slides = carousel.querySelector('.slides');
    const slideEls = Array.from(carousel.querySelectorAll('.slide'));
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const dotsContainer = carousel.querySelector('.dots');

    if (!slides || slideEls.length === 0) return;

    let index = 0;
    const last = slideEls.length - 1;
    let autoTimer = null;

    // Crear dots dinámicamente
    const dots = slideEls.map((_, i) => {
      const d = document.createElement('button');
      d.className = 'dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
      d.addEventListener('click', () => goTo(i));
      dotsContainer && dotsContainer.appendChild(d);
      return d;
    });

    function update() {
      slides.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((d, i) => d.classList.toggle('active', i === index));
    }

    function goTo(i) {
      index = i;
      if (index < 0) index = last;
      if (index > last) index = 0;
      update();
      restartAuto();
    }

    function next() { goTo(index + 1); }
    function prev() { goTo(index - 1); }

    nextBtn && nextBtn.addEventListener('click', next);
    prevBtn && prevBtn.addEventListener('click', prev);

    // Auto-rotación
    function startAuto() {
      stopAuto();
      autoTimer = setInterval(next, 5000);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
      autoTimer = null;
    }

    function restartAuto() {
      stopAuto();
      startAuto();
    }

    // Pausar al pasar el mouse (accesibilidad/uso)
    carousel.addEventListener('mouseenter', stopAuto);
    carousel.addEventListener('mouseleave', startAuto);

    // Iniciar
    update();
    startAuto();
  });
})();
