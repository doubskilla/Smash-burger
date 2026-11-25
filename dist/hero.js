const hero = document.querySelector('.hero');
function replay() {
  hero.classList.remove('play');
  void hero.offsetWidth;
  hero.classList.add('play');
}
Promise.all(Array.from(hero.images || hero.querySelectorAll('img'), img => img.decode().catch(() => {}))).then(replay);
document.querySelector('#replay').onclick = () => { toggle(false); menu.focus(); replay(); };
const menu = document.querySelector('.menu'), nav = document.querySelector('#nav');
function toggle(open) {
  nav.hidden = !open;
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label',open ? 'Fermer le menu' : 'Ouvrir le menu');
}
menu.onclick = () => toggle(nav.hidden);
document.addEventListener('keydown', e => { if(e.key === 'Escape' && !nav.hidden) {toggle(false); menu.focus();} });
const dialog = document.querySelector('dialog');
let opener;
const content = document.querySelector('#contenu');
function showSheet(id, withMenu = false) {
  content.replaceChildren(document.getElementById(id).content.cloneNode(true));
  const title = content.querySelector('h2');
  title.id = 'fiche-titre';
  title.tabIndex = -1;
  dialog.setAttribute('aria-labelledby', title.id);
  if (id === 'composer') {
    const choices = content.querySelector('.formule-choix');
    for (const recipe of document.querySelectorAll('.recipe[data-recipe]')) {
      const recipeId = recipe.dataset.recipe;
      const option = document.createElement('button');
      option.type = 'button';
      const recipeTemplate = document.getElementById(recipeId).content;
      const price = recipeTemplate.querySelector('[value="menu"]').closest('label').textContent.split('·').pop().trim();
      const amount = document.createElement('strong');
      amount.textContent = price;
      option.append(recipeTemplate.querySelector('h2').textContent, amount);
      option.onclick = () => showSheet(recipeId, true);
      choices.append(option);
    }
  } else if (id === 'supplements') {
    const catalog = content.querySelector('.drink-catalog');
    for (const drink of document.querySelectorAll('.drink-row')) {
      const item = document.createElement('li');
      const description = document.createElement('small');
      description.textContent = drink.dataset.description;
      item.append(drink.querySelector('.drink-name').cloneNode(true),
        drink.querySelector('.drink-price').cloneNode(true), description);
      catalog.append(item);
    }
  } else if (withMenu) {
    content.querySelector('input[value="menu"]').checked = true;
  }
  if (!dialog.open) dialog.showModal();
  title.focus();
}
document.querySelectorAll('[data-open]').forEach(button => button.onclick = () => {
  opener = nav.contains(button) ? menu : button;
  toggle(false);
  showSheet(button.dataset.open);
});
dialog.querySelector('.close').onclick = () => dialog.close();
dialog.onclose = () => opener?.focus();
const selection = document.querySelector('.selection');
if ('IntersectionObserver' in window) {
  const title = selection.querySelector('#choix');
  let titleStart = null;
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio < .12) continue;
      const target = entry.target;
      if (target === title || (target.matches('.recipe') && title.getBoundingClientRect().bottom > 0)) {
        titleStart ??= performance.now();
        title.classList.add('seen');
      }
      if (target.matches('.recipe')) {
        const delay = titleStart === null ? 0 : Math.max(0, 340 - (performance.now() - titleStart));
        target.style.setProperty('--entry-delay', delay + 'ms');
      }
      target.classList.add('seen');
      if (!selection.contains(target)) observer.unobserve(target);
    }
  }, {rootMargin:'0px 0px -8% 0px', threshold:.12});
  document.querySelectorAll('#choix, .recipe, .selection > .cta, .formule-reveal').forEach(target => observer.observe(target));
  const resetSelection = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) {
      titleStart = null;
      selection.querySelectorAll('.seen').forEach(item => item.classList.remove('seen'));
    }
  });
  resetSelection.observe(selection);
  selection.addEventListener('focusin', event => event.target.closest('.recipe, .cta')?.classList.add('seen'));
  document.documentElement.classList.add('motion');
}

const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
function animateSection(section, selector, replayButton) {
  const targets = section.querySelectorAll(selector);
  let observer;

  function reset() {
    observer?.disconnect();
    section.classList.remove('animating');
    if (replayButton) replayButton.hidden = true;
    for (const target of targets) target.classList.remove('seen');
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;

    if (replayButton) replayButton.hidden = false;
    section.classList.add('animating');
    observer = new IntersectionObserver(entries => {
      const incoming = [];
      for (const entry of entries) {
        if (!entry.isIntersecting) entry.target.classList.remove('seen');
        if (entry.intersectionRatio >= .25 && !entry.target.classList.contains('seen')) incoming.push(entry);
      }
      incoming.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      incoming.forEach((entry, index) => {
        entry.target.style.setProperty('--cue', (index * 145 + 45) + 'ms');
        entry.target.classList.add('seen');
      });
    }, {rootMargin: '0px 0px -14% 0px', threshold: [0, .25]});
    for (const target of targets) observer.observe(target);
  }
  replayButton?.addEventListener('click', () => {
    reset();
    if (!replayButton.hidden) replayButton.focus({preventScroll: true});
  });
  motionPreference.addEventListener('change', reset);
  reset();
}

const drinks = document.querySelector('.drinks');
animateSection(drinks, 'h2, .drink-row, .cta', drinks.querySelector('.drinks-replay'));
animateSection(document.querySelector('.restaurant'), '.visit-step');

const footer = document.querySelector('.site-footer');
if ('IntersectionObserver' in window && !motionPreference.matches) {
  const footerObserver = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) {
      footer.classList.add('arrived');
      footerObserver.disconnect();
    }
  }, {threshold: .15});
  footerObserver.observe(footer);
}
