const api = require('../dist/order-core.js');
const assert = require('node:assert/strict');
const tests = [
  ['burger seul', () => assert.equal(api.quote({product:'original',formula:'solo',quantity:1}).total,3500)],
  ['menu avec boisson incluse', () => assert.equal(api.quote({product:'original',formula:'menu',drink:'bouye',quantity:1}).total,5000)],
  ['supplément multiplié par quantité', () => assert.equal(api.quote({product:'original',formula:'solo',extras:['bissap'],quantity:2}).total,8400)],
  ['menu et boisson supplémentaire', () => assert.equal(api.quote({product:'double',formula:'menu',drink:'eau',extras:['bouye'],quantity:2}).total,13600)],
  ['retrait gratuit', () => assert.equal(api.quote({product:'piment',formula:'solo',removals:['piments','sauce'],quantity:1}).total,4000)],
  ['modifications propres à la recette', () => assert.throws(() => api.quote({product:'original',formula:'solo',removals:['piments'],quantity:1}))],
  ['menu exige une boisson', () => assert.throws(() => api.quote({product:'original',formula:'menu',quantity:1}))],
  ['suppression formule ignore ancienne boisson', () => assert.equal(api.quote({product:'original',formula:'solo',drink:'bouye',quantity:1}).drink,null)],
  ['doublons non facturés deux fois', () => assert.equal(api.quote({product:'original',formula:'solo',extras:['bissap','bissap'],quantity:1}).total,4200)],
  ['quantités invalides', () => { for (const quantity of [0,-1,1.5,21,NaN,Infinity,'']) assert.throws(() => api.quote({product:'original',formula:'solo',quantity})); }],
  ['données sauvegardées recalculées', () => assert.equal(api.restore(JSON.stringify([{product:'original',formula:'solo',quantity:2,total:1,unit:1}]))[0].total,7000)],
  ['stockage corrompu', () => { assert.deepEqual(api.restore('oops'),[]); assert.deepEqual(api.restore('{}'),[]); assert.deepEqual(api.restore('[null]'),[]); }],
  ['produit et supplément inconnus', () => { assert.throws(() => api.quote({product:'__proto__',formula:'solo',quantity:1})); assert.throws(() => api.quote({product:'original',formula:'solo',quantity:1,extras:['inconnu']})); }],
  ['récapitulatif conserve les choix', () => { const details=api.details({product:'piment',formula:'menu',drink:'bissap',removals:['sauce'],extras:['eau'],quantity:2}); assert.ok(details.includes('Sans sauce relevée')); assert.ok(details.includes('En plus : Eau')); }],
  ['chaque recette a un prix cohérent', () => { for (const [product,p] of Object.entries(api.products)) { assert.equal(api.quote({product,formula:'solo',quantity:1}).total,p.price); assert.equal(api.quote({product,formula:'menu',drink:'bissap',quantity:1}).total,p.price+1500); } }]
];
for (const [name, run] of tests) { run(); console.log('OK: ' + name); }
console.log(tests.length + ' tests passed');
