import { test } from 'node:test';
import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import { en } from '../content/en';
import { ko } from '../content/ko';
import { downloadList, files, pageCounts } from '../lib/files';

test('both locales describe the same projects with matching anchors', () => {
  assert.deepEqual(en.projects.items.map((p) => p.id), ko.projects.items.map((p) => p.id));
  assert.deepEqual(en.work.rows.map((r) => r.href), ko.work.rows.map((r) => r.href));
  for (const p of en.projects.items) assert.ok(en.work.rows.some((r) => r.href === `#${p.id}`), p.id);
});

test('portfolio page counts match the exported PDFs', () => {
  assert.ok(en.hero.portfolioHint.includes(String(pageCounts.portfolio)));
  assert.ok(ko.hero.portfolioHint.includes(String(pageCounts.portfolio)));
  for (const d of downloadList) assert.ok(!/38/.test(d.kind.en + d.kind.ko), d.href);
});

test('download links and project images point to real files', () => {
  for (const f of [files.resume, files.resumeAi, files.portfolio]) assert.ok(existsSync(`public${f}`), f);
  for (const p of [...en.projects.items, ...ko.projects.items]) for (const s of p.shots) assert.ok(existsSync(`public${s.src}`), s.src);
});

test('no stale wording: latest project, exact 290 tests, fixed 15 servers', () => {
  const all = JSON.stringify([en, ko]);
  assert.ok(!/Latest project|최근 프로젝트/.test(all));
  assert.ok(!/"290"|290 tests|tests in CreatorHub CI/.test(all));
  assert.ok(![...en.stats, ...ko.stats].some((s) => s.to === 15));
});

test('page-count labels match the PDFs in public/files', () => {
  const count = (f: string) => (readFileSync(`public${f}`, 'latin1').match(/\/Type\s*\/Page[^s]/g) ?? []).length;
  for (const f of [files.resume, files.resumeAi]) assert.equal(count(f), pageCounts.resume, f);
  assert.equal(count(files.portfolio), pageCounts.portfolio, files.portfolio);
  assert.ok(downloadList.some((d) => d.kind.en === 'Résumé · 1 page'));
});

test('deployed status matches across locales', () => {
  const live = (c: typeof en) => c.work.rows.filter((r) => /Live|운영 중/.test(r.year)).map((r) => r.title);
  assert.deepEqual(live(en), live(ko));
  assert.deepEqual(live(en), ['CreatorHub', 'Sofiya', 'Korea Visa Assistant', 'CargoCheck AI', 'Lexara']);
});

test('hosting domains stay behind project names, and CreatorHub starts in July 2026', () => {
  const text = (c: typeof en) => JSON.stringify(c).replace(/"href":"[^"]*"/g, '');
  for (const c of [en, ko]) {
    assert.ok(!/vercel\.app/.test(text(c)), 'a vercel.app address is visible');
    // IT Local legitimately ends 2026.04; only CreatorHub must never be dated April 2026
    const creatorhub = JSON.stringify([c.creatorhub, c.work.rows.find((r) => r.title === 'CreatorHub')]);
    assert.ok(!/2026\.04|April 2026|2026년 4월/.test(creatorhub));
    assert.ok(/2026\.07|July 2026|2026년 7월/.test(creatorhub));
  }
});

test('work history matches the résumés (owner, 2026-11-08)', () => {
  for (const c of [en, ko]) {
    const cv = JSON.stringify(c.cv);
    assert.ok(cv.includes('2023.09 – 2026.04') && cv.includes('2023.04 – 2023.09') && cv.includes('Golden Valley Investment'));
    assert.ok(!/2023\.11|2026\.02|2 years 10|2y 10m|2년 10개월|conversational|회화/.test(JSON.stringify(c)));
  }
});
