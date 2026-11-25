(() => {
  const section = document.querySelector('.interlude');
  const paragraph = section.querySelector('p');
  const phrase = paragraph.textContent.trim();
  const words = phrase.split(/\s+/).map(word => {
    const span = document.createElement('span');
    span.textContent = word;
    return span;
  });
  paragraph.replaceChildren(...words.flatMap((word, index) => index ? [' ', word] : [word]));

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let visible = true;
  let lastCount = -1;
  const clamp = value => Math.max(0, Math.min(1, value));

  function paint() {
    frame = 0;
    const height = window.innerHeight;
    const bounds = section.getBoundingClientRect();
    const progress = reduced.matches ? 0 : clamp((height - bounds.top) / (height + bounds.height));
    section.style.setProperty('--type-shift', (progress * 120) + 'px');

    const {top} = paragraph.getBoundingClientRect();
    const read = reduced.matches ? 1 : clamp((height * .94 - top) / (height * .57));
    const count = Math.round(words.length * read);
    if (count === lastCount) return;
    words.forEach((word, index) => word.toggleAttribute('data-pending', index >= count));
    lastCount = count;
  }
  function schedule() {
    if (visible && !frame) frame = requestAnimationFrame(paint);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      paint();
    }, {rootMargin: '80px'});
    observer.observe(section);

    const stickers = section.querySelector('.interlude-stickers');
    const stickerObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      stickers.classList.add('arrived');
      stickerObserver.disconnect();
    }, {threshold: 0.32});
    stickers.classList.add('awaiting');
    stickerObserver.observe(stickers);
  }
  window.addEventListener('scroll', schedule, {passive: true});
  window.addEventListener('resize', schedule);
  reduced.addEventListener('change', schedule);
  document.fonts.ready.then(schedule);
  paint();
})();
