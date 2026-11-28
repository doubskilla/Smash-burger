/* Product configuration and browser-local order. No order is sent here. */
(function () {
  'use strict';
  const api = window.SmashOrder;
  if (!api) return;
  const key = 'smash-order-v1';
  const $ = selector => document.querySelector(selector);
  function read() {
    try { return api.restore(localStorage.getItem(key)); }
    catch (_) { return []; }
  }
  function save(lines) {
    try { localStorage.setItem(key, JSON.stringify(lines)); updateBadge(); return true; }
    catch (_) { return false; }
  }
  function updateBadge() {
    const count = read().reduce((n, line) => n + line.quantity, 0);
    document.querySelectorAll('[data-order-count]').forEach(el => {
      el.textContent = String(count); el.hidden = count === 0;
    });
  }
  updateBadge();
  window.addEventListener('pageshow', updateBadge);
  window.addEventListener('storage', event => { if (event.key === key || event.key === null) { updateBadge(); if ($('[data-order-page]')) renderOrder(); } });
  const form = $('#product-form');
  if (form) {
    const productId = document.body.dataset.product;
    const quantity = $('#quantity');
    const menuDrinks = $('#menu-drinks');
    const error = $('#form-error');
    const total = $('#product-total');
    const submit = form.querySelector('[type=submit]');
    const state = () => ({
      product: productId, formula: form.elements.formula.value,
      drink: form.querySelector('[name=drink]:checked')?.value,
      quantity: quantity.value,
      removals: [...form.querySelectorAll('[name=removals]:checked')].map(el => el.value),
      extras: [...form.querySelectorAll('[name=extras]:checked')].map(el => el.value)
    });
    function update() {
      const input = state();
      $('#added-message').textContent = '';
      const menu = input.formula === 'menu';
      menuDrinks.hidden = !menu; menuDrinks.disabled = !menu;
      error.textContent = '';
      try {
        // The included drink has no price impact. Native required validation
        // still demands an explicit selection before submission.
        const price = api.quote({ ...input, drink: input.drink || api.drinks[0].id });
        total.textContent = api.money(price.total);
        submit.disabled = false;
      } catch (_) {
        total.textContent = '—';
        submit.disabled = true;
      }
      form.querySelector('[data-step="-1"]').disabled = Number(quantity.value) <= 1;
      form.querySelector('[data-step="1"]').disabled = Number(quantity.value) >= 20;
    }
    form.querySelector('.configuration').disabled = false;
    form.addEventListener('change', update);
    quantity.addEventListener('input', update);
    form.querySelectorAll('[data-step]').forEach(button => button.addEventListener('click', () => {
      const value = Number(quantity.value);
      quantity.value = String(Math.max(1, Math.min(20, (Number.isFinite(value) ? value : 1) + Number(button.dataset.step))));
      update();
    }));
    const dialog = $('#added-dialog');
    dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
    dialog.querySelector('[data-continue]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('close', () => submit.focus());
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      try {
        const item = api.quote(state());
        const existing = read();
        if (existing.length >= 100) { error.textContent = 'Ta commande contient déjà 100 lignes. Modifie les quantités depuis le récapitulatif.'; return; }
        if (!save([...existing, item])) {
          error.textContent = 'La commande ne peut pas être conservée dans ce navigateur. Autorise le stockage du site puis réessaie.';
          return;
        }
        $('#added-description').textContent = item.quantity + ' × ' + api.products[item.product].name + ' · ' + api.money(item.total);
        $('#added-message').textContent = 'Ajouté à ta commande.';
        dialog.showModal();
      } catch (problem) { error.textContent = problem.message; }
    });
    const back = $('[data-back]');
    back.addEventListener('click', event => {
      if (!document.referrer) return;
      const previous = new URL(document.referrer);
      if (previous.origin === location.origin && (previous.pathname.endsWith('/') || /\/(index|smashs)\.html$/.test(previous.pathname)) && history.length > 1) {
        event.preventDefault(); history.back();
      }
    });
    update();
  }
  function element(tag, content, className) {
    const el = document.createElement(tag);
    if (content !== undefined) el.textContent = content;
    if (className) el.className = className;
    return el;
  }
  function orderText(lines) {
    return 'Ma commande Smash Burger\n\n' + lines.map(item =>
      item.quantity + ' × ' + api.products[item.product].name + '\n' +
      api.details(item).join(' · ') + '\n' + api.money(item.total)
    ).join('\n\n') + '\n\nTotal : ' + api.money(lines.reduce((n, item) => n + item.total, 0));
  }
  function renderOrder() {
    const list = $('#order-lines');
    if (!list) return;
    const lines = read();
    list.replaceChildren();
    $('#order-empty').hidden = lines.length > 0;
    $('#order-actions').hidden = lines.length === 0;
    $('#order-total').textContent = api.money(lines.reduce((n,item) => n + item.total, 0));
    $('#copy-fallback').hidden = true;
    $('#copy-status').textContent = '';
    lines.forEach((item, index) => {
      const product = api.products[item.product];
      const article = element('article', undefined, 'order-item');
      article.append(element('h2', product.name), element('p', api.details(item).join(' · ')),
        element('div', api.money(item.total), 'order-line-price'));
      const controls = element('div', undefined, 'order-item-controls');
      const minus = element('button', '−');
      const plus = element('button', '+');
      const remove = element('button', 'Retirer', 'remove');
      minus.setAttribute('aria-label', 'Diminuer la quantité de ' + product.name);
      plus.setAttribute('aria-label', 'Augmenter la quantité de ' + product.name);
      remove.setAttribute('aria-label', 'Retirer ' + product.name + ' de la commande');
      minus.disabled = item.quantity <= 1; plus.disabled = item.quantity >= 20;
      const count = element('span', String(item.quantity)); count.setAttribute('aria-label', 'Quantité : ' + item.quantity);
      controls.append(minus, count, plus, remove);
      for (const [button, delta] of [[minus,-1],[plus,1]]) button.addEventListener('click', () => {
        const fresh = read();
        if (JSON.stringify(fresh) !== JSON.stringify(lines)) { renderOrder(); return; }
        fresh[index] = api.quote({ ...item, quantity: item.quantity + delta });
        if (!save(fresh)) { $('#storage-message').textContent = 'Impossible d’enregistrer cette modification dans ce navigateur.'; return; }
        renderOrder();
        const row = $('#order-lines').children[index];
        const focus = row.querySelectorAll('button')[delta < 0 ? 0 : 1];
        (focus.disabled ? row.querySelectorAll('button')[delta < 0 ? 1 : 0] : focus).focus();
      });
      remove.addEventListener('click', () => {
        const fresh = read();
        if (JSON.stringify(fresh) !== JSON.stringify(lines)) { renderOrder(); return; }
        fresh.splice(index, 1);
        if (!save(fresh)) { $('#storage-message').textContent = 'Impossible d’enregistrer cette modification dans ce navigateur.'; return; }
        renderOrder();
        const next = $('#order-lines').children[Math.min(index, fresh.length-1)];
        if (next) next.querySelector('button:not(:disabled)').focus();
        else $('#order-empty a').focus();
      });
      article.append(controls); list.append(article);
    });
  }
  if ($('[data-order-page]')) {
    renderOrder();
    $('#copy-order').addEventListener('click', async () => {
      const text = orderText(read());
      try {
        await navigator.clipboard.writeText(text);
        $('#copy-status').textContent = 'Récapitulatif copié. Tu peux maintenant le coller dans un message.';
      } catch (_) {
        const fallback = $('#copy-fallback');
        fallback.value = text; fallback.hidden = false; fallback.focus(); fallback.select();
        $('#copy-status').textContent = 'Sélectionne et copie ce récapitulatif.';
      }
    });
  }
})();
