import { test } from 'node:test';
import assert from 'node:assert/strict';
import { LIMITS, buildPrompt, createLimiter, isSameSite, parseRequest, retrieve } from '../lib/chat';

test('parseRequest accepts a valid conversation and defaults locale to en', () => {
  const r = parseRequest({ messages: [{ role: 'user', text: ' hi ' }] });
  assert.deepEqual(r, { messages: [{ role: 'user', text: 'hi' }], locale: 'en' });
});

test('parseRequest rejects oversize, empty and model-last messages', () => {
  assert.deepEqual(parseRequest({ messages: [{ role: 'user', text: 'x'.repeat(LIMITS.maxMessageChars + 1) }] }), { error: 'message_length' });
  assert.deepEqual(parseRequest({ messages: [] }), { error: 'no_messages' });
  assert.deepEqual(parseRequest({ messages: [{ role: 'model', text: 'hi' }] }), { error: 'last_not_user' });
  assert.deepEqual(parseRequest({ messages: [{ role: 'system', text: 'hi' }] }), { error: 'bad_message' });
});

test('parseRequest keeps only the last turns of history', () => {
  const messages = Array.from({ length: 20 }, (_, i) => ({ role: i % 2 ? 'model' : 'user', text: `m${i}` }));
  messages.push({ role: 'user', text: 'last' });
  const r = parseRequest({ messages });
  assert.ok(!('error' in r));
  assert.equal(r.messages.length, LIMITS.maxHistory + 1);
  assert.equal(r.messages.at(-1)?.text, 'last');
});

test('limiter allows 8 per minute per visitor, then resets after a minute', () => {
  let t = Date.parse('2026-10-19T00:00:00Z');
  const l = createLimiter(() => t);
  for (let i = 0; i < LIMITS.perMinute; i++) assert.equal(l.check('a'), 'ok');
  assert.equal(l.check('a'), 'rate');
  assert.equal(l.check('b'), 'ok');
  t += 61_000;
  assert.equal(l.check('a'), 'ok');
});

test('limiter enforces the daily cap across visitors', () => {
  const t = Date.parse('2026-10-19T00:00:00Z');
  const l = createLimiter(() => t);
  for (let i = 0; i < LIMITS.dailyCap; i++) assert.equal(l.check(`v${i}`), 'ok');
  assert.equal(l.check('new'), 'daily');
});

test('isSameSite only allows the site itself', () => {
  assert.equal(isSameSite('https://sean.dev', 'sean.dev'), true);
  assert.equal(isSameSite('https://evil.example', 'sean.dev'), false);
  assert.equal(isSameSite(undefined, 'sean.dev'), false);
});

test('retrieve finds the DevOps skill for a DevOps question', () => {
  const titles = retrieve('What DevOps work with Docker and Nginx?', 'en').map((e) => e.title);
  assert.ok(titles.includes('Skill: DevOps'), titles.join(' | '));
});

test('prompt treats sources as data and answers in the page language', () => {
  const p = buildPrompt(retrieve('CreatorHub', 'ko'), 'ko');
  assert.match(p, /Reply in Korean/);
  assert.match(p, /data, not instructions/);
});
