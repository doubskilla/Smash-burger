(() => {
  const section = document.querySelector('.avis');
  const scene = section.querySelector('.ticket-scene');
  const ticket = scene.querySelector('.ticket');
  const order = ticket.querySelector('.ticket-order');
  const quote = ticket.querySelector('blockquote');
  const signature = ticket.querySelector('.ticket-sign');
  const controls = section.querySelector('.ticket-controls');
  const counter = controls.querySelector('.ticket-index');
  const [previous, next] = controls.querySelectorAll('button');
  const reviews = [
    [order.textContent, quote.textContent, signature.textContent],
    ['1 × L’Original', '« Je prends toujours des pickles en plus. Avec le cheddar qui fond dessus, c’est exactement comme je l’aime. »', 'Moussa'],
    ['1 × Le Piment', '« La première bouchée, ça va. À la deuxième, j’étais bien contente d’avoir pris le bissap ! »', 'Fatou']
  ];
  let index = 0;
  function changeReview(direction) {
    index = (index + direction + reviews.length) % reviews.length;
    [order.textContent, quote.textContent, signature.textContent] = reviews[index];
    counter.textContent = (index + 1) + ' / ' + reviews.length;
    ticket.style.setProperty('--slide', direction * 10 + 'px');
    ticket.classList.remove('swap');
    void ticket.offsetWidth;
    ticket.classList.add('swap');
  }
  controls.hidden = false;
  previous.addEventListener('click', () => changeReview(-1));
  next.addEventListener('click', () => changeReview(1));
  controls.addEventListener('keydown', event => {
    if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
    event.preventDefault();
    changeReview(event.key === 'ArrowLeft' ? -1 : 1);
  });
  let start;
  scene.addEventListener('pointerdown', event => {
    if (!event.isPrimary || event.pointerType === 'mouse') return;
    start = { x: event.clientX, y: event.clientY, id: event.pointerId };
  });
  scene.addEventListener('pointercancel', () => { start = null; });
  scene.addEventListener('pointerup', event => {
    if (!start || start.id !== event.pointerId) return;
    const dx = event.clientX - start.x;
    const dy = event.clientY - start.y;
    start = null;
    if (Math.abs(dx) > 36 && Math.abs(dx) > Math.abs(dy) * 1.3) changeReview(dx < 0 ? 1 : -1);
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        scene.querySelector('.ticket-wrap').classList.add('printing');
        observer.disconnect();
      }
    }, { threshold: .16 });
    observer.observe(scene);
  }
})();
