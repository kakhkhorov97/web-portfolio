export type Locale = 'en' | 'ko';

// Page counts of the PDFs in public/files (checked on 2026-11-08). Update when the exports change.
export const pageCounts = { resume: 1, portfolio: 22 } as const;

const pages = (n: number) => (n === 1 ? '1 page' : `${n} pages`);

export const files = {
  resume: '/files/Sean-Kakhkhorov-Resume-KO.pdf',
  resumeAi: '/files/Sean-Kakhkhorov-Resume-AI-Engineer-KO.pdf',
  portfolio: '/files/Sean-Kakhkhorov-Portfolio-KO.pdf',
} as const;

export const downloadList = [
  { href: files.resume, kind: { en: `Résumé · ${pages(pageCounts.resume)}`, ko: `이력서 · ${pageCounts.resume}쪽` }, title: { en: '이력서, 한국어', ko: '이력서, 한국어' }, lang: 'ko' },
  { href: files.resumeAi, kind: { en: `AI-engineering résumé · ${pages(pageCounts.resume)}`, ko: `AI 엔지니어링 이력서 · ${pageCounts.resume}쪽` }, title: { en: 'AI 엔지니어링 이력서, 한국어', ko: 'AI 엔지니어링 이력서, 한국어' }, lang: 'ko' },
  { href: files.portfolio, kind: { en: `Portfolio · ${pages(pageCounts.portfolio)}`, ko: `포트폴리오 · ${pageCounts.portfolio}쪽` }, title: { en: '포트폴리오, 한국어', ko: '포트폴리오, 한국어' }, lang: 'ko' },
] as const;

export const links = {
  email: 'kakhkhorov97@gmail.com',
  github: 'https://github.com/kakhkhorov97',
  creatorhub: 'https://creatorhub.site',
};
