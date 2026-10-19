import Head from 'next/head';
import { useRouter } from 'next/router';
import { useCallback, useState } from 'react';
import { Chat } from '../components/Chat';
import { Contact, CreatorHub, Cv, Downloads, Notes, Skills, Work } from '../components/Sections';
import { Header, Hero } from '../components/Top';
import { en } from '../content/en';
import { ko } from '../content/ko';
import type { Locale } from '../lib/files';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? '';

export default function Home() {
  const { locale: rawLocale } = useRouter();
  const locale: Locale = rawLocale === 'ko' ? 'ko' : 'en';
  const c = locale === 'ko' ? ko : en;
  const [chatOpen, setChatOpen] = useState(false);
  const closeChat = useCallback(() => setChatOpen(false), []);

  return (
    <>
      <Head>
        <title>{c.meta.title}</title>
        <meta name="description" content={c.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={c.meta.title} />
        <meta property="og:description" content={c.meta.description} />
        <meta property="og:image" content={`${SITE_URL}/images/og.jpg`} />
        <meta property="og:locale" content={locale === 'ko' ? 'ko_KR' : 'en_US'} />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="alternate" hrefLang="en" href={`${SITE_URL}/`} />
        <link rel="alternate" hrefLang="ko" href={`${SITE_URL}/ko`} />
      </Head>
      <a className="skip" href="#work">
        Skip to content
      </a>
      <div className={`p ${locale}`}>
        <div className="w">
          <Header c={c} locale={locale} />
          <main>
            <Hero c={c} locale={locale} />
            <Work c={c} />
            <CreatorHub c={c} />
            <Notes c={c} />
            <Skills c={c} />
            <Cv c={c} />
            <Downloads c={c} locale={locale} />
            <Contact c={c} onAsk={() => setChatOpen(true)} />
          </main>
          <footer className="foot m">
            <span>© 2026 Sean Kakhkhorov</span>
            <span>{c.footer.place}</span>
          </footer>
        </div>
        {chatOpen ? <Chat c={c} locale={locale} onClose={closeChat} /> : null}
      </div>
    </>
  );
}
