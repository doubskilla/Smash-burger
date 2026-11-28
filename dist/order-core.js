/* Shared catalogue and integer-FCFA calculations. No stored price is trusted. */
(function (root) {
  'use strict';
  const products = {
  "original": {
    "name": "L’Original",
    "price": 3500,
    "image": "original.webp",
    "description": "Steak smashé, cheddar fondant, pickles et oignons.",
    "removals": [
      [
        "oignons",
        "Sans oignons"
      ],
      [
        "pickles",
        "Sans pickles"
      ],
      [
        "cheddar",
        "Sans cheddar"
      ]
    ]
  },
  "double": {
    "name": "Le Double",
    "price": 4500,
    "image": "double.webp",
    "description": "Deux steaks smashés et double cheddar.",
    "removals": [
      [
        "cheddar",
        "Sans cheddar"
      ]
    ]
  },
  "piment": {
    "name": "Le Piment",
    "price": 4000,
    "image": "piment.webp",
    "description": "Piments et sauce relevée.",
    "removals": [
      [
        "piments",
        "Sans piments"
      ],
      [
        "sauce",
        "Sans sauce relevée"
      ]
    ]
  },
  "oignons": {
    "name": "Le Smash Oignons",
    "price": 4000,
    "image": null,
    "description": "Steak smashé, oignons grillés et cheddar.",
    "removals": [
      [
        "oignons",
        "Sans oignons grillés"
      ],
      [
        "cheddar",
        "Sans cheddar"
      ]
    ]
  },
  "poivre": {
    "name": "Le Poivré",
    "price": 4200,
    "image": null,
    "description": "Steak smashé, cheddar et sauce au poivre.",
    "removals": [
      [
        "sauce",
        "Sans sauce au poivre"
      ],
      [
        "cheddar",
        "Sans cheddar"
      ]
    ]
  }
};
  const drinks = [
  {
    "id": "bissap",
    "name": "Bissap",
    "price": 700
  },
  {
    "id": "bouye",
    "name": "Bouye",
    "price": 800
  },
  {
    "id": "ditakh",
    "name": "Ditakh",
    "price": 800
  },
  {
    "id": "eau",
    "name": "Eau",
    "price": 500
  },
  {
    "id": "citronnade",
    "name": "Citronnade",
    "price": 700
  }
];
  const menuExtra = 1500;
  const money = value => new Intl.NumberFormat('fr-FR').format(value) + ' FCFA';
  function quote(input) {
    if (!input || !Object.prototype.hasOwnProperty.call(products, input.product)) throw new Error('Produit inconnu.');
    const product = products[input.product];
    const quantity = Number(input.quantity);
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 20) throw new Error('Choisis une quantité entre 1 et 20.');
    if (!['solo', 'menu'].includes(input.formula)) throw new Error('Choisis une formule.');
    const allowed = new Set(product.removals.map(item => item[0]));
    const removals = [...new Set(Array.isArray(input.removals) ? input.removals : [])];
    if (removals.some(id => !allowed.has(id))) throw new Error('Cette modification ne correspond pas à ce burger.');
    const extras = [...new Set(Array.isArray(input.extras) ? input.extras : [])];
    if (extras.some(id => !drinks.some(drink => drink.id === id))) throw new Error('Supplément inconnu.');
    const drink = input.formula === 'menu' ? input.drink : null;
    if (input.formula === 'menu' && !drinks.some(item => item.id === drink)) throw new Error('Choisis la boisson de ton menu.');
    const unit = product.price + (input.formula === 'menu' ? menuExtra : 0)
      + extras.reduce((sum, id) => sum + drinks.find(item => item.id === id).price, 0);
    return { product: input.product, formula: input.formula, drink, removals, extras, quantity, unit, total: unit * quantity };
  }
  function restore(raw) {
    try {
      const parsed = JSON.parse(raw || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.slice(0,100).flatMap(item => { try { return [quote(item)]; } catch (_) { return []; } });
    } catch (_) { return []; }
  }
  function details(item) {
    const line = quote(item);
    const product = products[line.product];
    return [
      line.formula === 'menu' ? 'En menu · frites + ' + drinks.find(d => d.id === line.drink).name : 'Burger seul',
      ...line.removals.map(id => product.removals.find(r => r[0] === id)[1]),
      ...line.extras.map(id => 'En plus : ' + drinks.find(d => d.id === id).name)
    ];
  }
  const api = { products, drinks, menuExtra, money, quote, restore, details };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  else root.SmashOrder = api;
})(typeof globalThis !== 'undefined' ? globalThis : this);
