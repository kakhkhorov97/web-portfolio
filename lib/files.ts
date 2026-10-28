export type Locale = 'en' | 'ko';

// Page counts of the PDFs in public/files (checked with pdfinfo on 2026-10-28). Update when the exports change.
export const pageCounts = { resume: 1, portfolio: 22 } as const;

const pages = (n: number) => (n === 1 ? '1 page' : `${n} pages`);

export const files = {
  resume: {
    en: '/files/Sean-Kakhkhorov-Resume-EN.pdf',
    ko: '/files/Sean-Kakhkhorov-Resume-KO.pdf',
  },
  resumeAi: {
    en: '/files/Sean-Kakhkhorov-Resume-AI-Engineer-EN.pdf',
    ko: '/files/Sean-Kakhkhorov-Resume-AI-Engineer-KO.pdf',
  },
  portfolio: {
    en: '/files/Sean-Kakhkhorov-Portfolio-EN.pdf',
    ko: '/files/Sean-Kakhkhorov-Portfolio-KO.pdf',
  },
} as const;

export const downloadList = [
  { href: files.resume.en, kind: { en: `Résumé · ${pages(pageCounts.resume)}`, ko: `이력서 · ${pageCounts.resume}쪽` }, title: { en: 'Résumé, English', ko: '이력서, 영어' }, lang: 'en' },
  { href: files.resume.ko, kind: { en: `Résumé · ${pages(pageCounts.resume)}`, ko: `이력서 · ${pageCounts.resume}쪽` }, title: { en: '이력서, 한국어', ko: '이력서, 한국어' }, lang: 'ko' },
  { href: files.resumeAi.en, kind: { en: `AI-engineering résumé · ${pages(pageCounts.resume)}`, ko: `AI 엔지니어링 이력서 · ${pageCounts.resume}쪽` }, title: { en: 'AI-engineering résumé, English', ko: 'AI 엔지니어링 이력서, 영어' }, lang: 'en' },
  { href: files.resumeAi.ko, kind: { en: `AI-engineering résumé · ${pages(pageCounts.resume)}`, ko: `AI 엔지니어링 이력서 · ${pageCounts.resume}쪽` }, title: { en: 'AI 엔지니어링 이력서, 한국어', ko: 'AI 엔지니어링 이력서, 한국어' }, lang: 'ko' },
  { href: files.portfolio.en, kind: { en: `Portfolio · ${pages(pageCounts.portfolio)}`, ko: `포트폴리오 · ${pageCounts.portfolio}쪽` }, title: { en: 'Portfolio, English', ko: '포트폴리오, 영어' }, lang: 'en' },
  { href: files.portfolio.ko, kind: { en: `Portfolio · ${pages(pageCounts.portfolio)}`, ko: `포트폴리오 · ${pageCounts.portfolio}쪽` }, title: { en: '포트폴리오, 한국어', ko: '포트폴리오, 한국어' }, lang: 'ko' },
] as const;

export const links = {
  email: 'kakhkhorov97@gmail.com',
  github: 'https://github.com/kakhkhorov97',
  creatorhub: 'https://creatorhub.site',
};
