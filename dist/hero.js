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
    for (const drink of document.querySelectorAll('.drink-card')) {
      const item = document.createElement('li');
      const description = document.createElement('small');
      description.textContent = drink.querySelector('.drink-description').textContent;
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
const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');

function animateCards(selection, cardSelector, replayButton) {
  const title = selection.querySelector('h2');
  const cards = [...selection.querySelectorAll(cardSelector)];
  const targets = [title, ...cards, selection.querySelector('.cta')];
  let frame = 0;
  let previousScroll = window.scrollY;
  let titleStart = null;
  let armed = false;

  function updateSelection(now) {
    frame = 0;
    if (replayButton) replayButton.hidden = motionPreference.matches;
    const height = window.innerHeight;
    const bounds = selection.getBoundingClientRect();
    const scrollingUp = window.scrollY < previousScroll;
    previousScroll = window.scrollY;
    if (motionPreference.matches || bounds.bottom <= 0 || bounds.top >= height) {
      if (armed) {
        titleStart = null;
        targets.forEach(target => target.classList.remove('seen'));
        selection.classList.remove('selection-motion');
        armed = false;
      }
      return;
    }

    const incoming = targets.filter(target => {
      const rect = target.getBoundingClientRect();
      return !target.classList.contains('seen') && rect.bottom > 0 && rect.top < height - 24;
    });
    if (scrollingUp) incoming.reverse();

    incoming.forEach((target, index) => {
      if (target === title) titleStart = now;
      const overlap = !scrollingUp && target === cards[0] && titleStart !== null
        ? Math.max(0, 300 - (now - titleStart)) : 0;
      const delay = cards.includes(target) ? Math.max(overlap, index * 55) : 0;
      target.style.setProperty('--entry-delay', delay + 'ms');
      target.classList.add('seen');
    });
    selection.classList.add('selection-motion');
    armed = true;
  }

  function scheduleSelection() {
    if (!frame) frame = requestAnimationFrame(updateSelection);
  }

  window.addEventListener('scroll', scheduleSelection, {passive: true});
  window.addEventListener('resize', scheduleSelection);
  replayButton?.addEventListener('click', () => {
    targets.forEach(target => target.classList.remove('seen'));
    titleStart = null;
    void selection.offsetWidth;
    scheduleSelection();
  });
  motionPreference.addEventListener('change', scheduleSelection);
  scheduleSelection();
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    for (const entry of entries) {
      if (entry.intersectionRatio < .12) continue;
      entry.target.classList.add('seen');
      observer.unobserve(entry.target);
    }
  }, {rootMargin:'0px 0px -8% 0px', threshold:.12});
  document.querySelectorAll('.formule-reveal').forEach(target => observer.observe(target));
  document.documentElement.classList.add('motion');
}

function animateSection(section, selector) {
  const targets = section.querySelectorAll(selector);
  let observer;

  function reset() {
    observer?.disconnect();
    section.classList.remove('animating');
    for (const target of targets) target.classList.remove('seen');
    if (motionPreference.matches || !('IntersectionObserver' in window)) return;

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
  motionPreference.addEventListener('change', reset);
  reset();
}

const drinks = document.querySelector('.drinks');
animateCards(document.querySelector('.selection'), '.recipe');
animateCards(drinks, '.drink-card', drinks.querySelector('.drinks-replay'));
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
