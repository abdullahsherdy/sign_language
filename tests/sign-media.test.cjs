const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');

function app(reduced = false) {
  const context = vm.createContext({
    document: { getElementById() {}, addEventListener() {} },
    window: { matchMedia: () => ({ matches: reduced }) },
    localStorage: { getItem: () => null },
    setTimeout, clearTimeout,
  });
  vm.runInContext(fs.readFileSync('app.js', 'utf8').replace(/start\(\);\s*$/, ''), context);
  const data = JSON.parse(fs.readFileSync('data/signs.json', 'utf8'));
  context.data = data;
  vm.runInContext('state.data = data; state.lang = "en";', context);
  return { run: code => vm.runInContext(code, context), data };
}

test('every dictionary entry offers a recorded signing demonstration with a credited source', () => {
  const { data } = app();
  for (const sign of data.signs) {
    assert.ok(sign.demonstration?.src, `${sign.id}: missing movement recording`);
    assert.ok(sign.demonstration.poster, `${sign.id}: missing signing still`);
    assert.ok(sign.demonstration.sourceUrl, `${sign.id}: missing source`);
    assert.ok(sign.demonstration.languageEn, `${sign.id}: missing sign language label`);
  }
});

test('cards show a signer still without playing recordings inside a navigation link', () => {
  const { run } = app();
  const html = run('stickerCard(findSign("toilet"))');
  assert.doesNotMatch(html, /icons\/toilet\.svg|<video|<button/);
  assert.match(html, /data-sign-poster/);
});

test('opening a sign offers motion, playback controls, and its regional source', () => {
  const { run } = app();
  const html = run('renderSign("food")');
  assert.match(html, /data-sign-player/);
  assert.match(html, /data-action="toggle-sign"/);
  assert.match(html, /sshi\.sa/);
});

test('reduced motion keeps demonstrations still until deliberately played', () => {
  const { run } = app(true);
  const html = run('renderSign("food")');
  assert.match(html, /data-playing="false"/);
  assert.doesNotMatch(html, / autoplay/);
});
