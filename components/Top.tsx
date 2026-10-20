import Image from 'next/image';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import type { Content } from '../content/en';
import { files, links, type Locale } from '../lib/files';

type Theme = 'light' | 'dark';

function ThemeSwitch({ c }: { c: Content }) {
  const [theme, setTheme] = useState<Theme | null>(null);
  useEffect(() => {
    setTheme(document.documentElement.dataset.theme === 'light' ? 'light' : 'dark');
  }, []);
  function toggle() {
    const next: Theme = theme === 'light' ? 'dark' : 'light';
    const root = document.documentElement;
    const apply = () => {
      root.dataset.theme = next;
      setTheme(next);
    };
    try {
      localStorage.setItem('theme', next);
    } catch {
      // Private mode: the switch still works for this visit.
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return apply();
    // Crossfade the whole page in one step where the browser supports it.
    const doc = document as Document & { startViewTransition?: (cb: () => void) => unknown };
    if (doc.startViewTransition) {
      doc.startViewTransition(apply);
      return;
    }
    // Fallback: briefly transition every colour together, then remove the rule.
    root.classList.add('theme-anim');
    apply();
    window.setTimeout(() => root.classList.remove('theme-anim'), 500);
  }
  return (
    <button type="button" className="theme m" onClick={toggle} aria-label={c.nav.themeLabel} title={c.nav.themeLabel}>
      {theme === 'light' ? `◐ ${c.nav.toDark}` : `◑ ${c.nav.toLight}`}
    </button>
  );
}

export function Header({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <header className="top">
      <a className="name" href="#top">
        Sean Kakhkhorov
      </a>
      <nav className="nav m" aria-label="Sections">
        <a href="#work">{c.nav.work}</a>
        <a href="#notes">{c.nav.notes}</a>
        <a href="#skills">{c.nav.skills}</a>
        <a href="#cv">{c.nav.cv}</a>
        <a href="#contact">{c.nav.contact}</a>
      </nav>
      <div className="lang m">
        <ThemeSwitch c={c} />
        <a className="cvl" href={files.resume[locale]} download>
          {c.nav.resume}
        </a>
        <span>&#160;&#160;</span>
        <Link className={locale === 'en' ? 'on' : undefined} href="/" locale="en" scroll={false}>
          EN
        </Link>
        <span>/</span>
        <Link className={`kr${locale === 'ko' ? ' on' : ''}`} href="/" locale="ko" scroll={false}>
          한국어
        </Link>
      </div>
    </header>
  );
}

export function Hero({ c, locale }: { c: Content; locale: Locale }) {
  const [l1, l2, l3] = c.hero.lines;
  return (
    <>
      <section className="hero" id="top">
        <div>
          <h1 className="h1">
            <span className="ln">
              <span>{l1}</span>
            </span>{' '}
            <span className="ln l2">
              <span>{l2}</span>
            </span>{' '}
            <span className="ln l3">
              <span>
                {l3} <em>{c.hero.lastWord}</em>
              </span>
            </span>
          </h1>
          <div className="roles m fd">
            <span className="lbl">{c.hero.rolesLabel}</span>
            {c.hero.roles.map((r) => (
              <span key={r}>{r}</span>
            ))}
          </div>
          <div className="ctas fd">
            <a className="b solid" href={files.resume[locale]} download>
              {c.hero.resumeButton} <small>{c.hero.resumeHint} · {locale.toUpperCase()}</small>
            </a>
            <a className="b" href={files.portfolio[locale]} download>
              {c.hero.portfolioButton} <small>{c.hero.portfolioHint}</small>
            </a>
          </div>
        </div>
        <figure className="ph fd">
          <Image src="/images/portrait.jpg" alt={c.hero.photoAlt} width={1666} height={2000} sizes="(max-width: 820px) 240px, 260px" priority />
          <figcaption className="m">
            Kakhkhorov Shokhjakhon · <span className="kr">카흐호로프 쇼흐자혼</span>
          </figcaption>
        </figure>
      </section>

      <hr className="hr" />
      <div className="facts fd">
        {c.hero.facts.map((f) => (
          <div key={f.label}>
            <span className="m">{f.label}</span>
            {f.text}
            {'link' in f && f.link ? (
              <>
                {' '}
                <a className="ul" href={f.link.href} target="_blank" rel="noopener noreferrer">
                  {f.link.text}
                </a>
              </>
            ) : null}
          </div>
        ))}
        <div>
          <span className="m">{c.hero.contactLabel}</span>
          <a className="ul" href={`mailto:${links.email}`}>
            {links.email}
          </a>
          <br />
          <a className="ul" href={links.github} target="_blank" rel="noopener noreferrer">
            github.com/kakhkhorov97
          </a>
        </div>
      </div>
    </>
  );
}
