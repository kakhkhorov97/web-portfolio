export type Locale = 'en' | 'ko';

export const files = {
  resume: {
    en: '/files/Sean-Kakhkhorov-Resume-EN.pdf',
    ko: '/files/Sean-Kakhkhorov-Resume-KO.pdf',
  },
  portfolio: {
    en: '/files/Sean-Kakhkhorov-Portfolio-EN.pdf',
    ko: '/files/Sean-Kakhkhorov-Portfolio-KO.pdf',
  },
} as const;

export const downloadList = [
  { href: files.resume.en, kind: { en: 'Résumé · 1 page', ko: '이력서 · 1쪽' }, title: { en: 'Résumé, English', ko: '이력서, 영어' }, lang: 'en' },
  { href: files.resume.ko, kind: { en: 'Résumé · 1 page', ko: '이력서 · 1쪽' }, title: { en: '이력서, 한국어', ko: '이력서, 한국어' }, lang: 'ko' },
  { href: files.portfolio.en, kind: { en: 'Portfolio · 38 pages', ko: '포트폴리오 · 38쪽' }, title: { en: 'Portfolio, English', ko: '포트폴리오, 영어' }, lang: 'en' },
  { href: files.portfolio.ko, kind: { en: 'Portfolio · 38 pages', ko: '포트폴리오 · 38쪽' }, title: { en: '포트폴리오, 한국어', ko: '포트폴리오, 한국어' }, lang: 'ko' },
] as const;

export const links = {
  email: 'kakhkhorov97@gmail.com',
  github: 'https://github.com/kakhkhorov97',
  creatorhub: 'https://creatorhub.site',
};
