import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import type { Content } from '../content/en';
import { files, type Locale } from '../lib/files';

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
      <span aria-hidden="true">{theme === 'light' ? '◐' : '◑'}</span>
      <span className="tlabel">{theme === 'light' ? c.nav.toDark : c.nav.toLight}</span>
    </button>
  );
}

export function Header({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <header className="top" id="hd">
      <div className="w hd">
        <a className="logo" href="#top">
          <i>SK</i>Sean Kakhkhorov
        </a>
        <nav className="nav" aria-label="Sections">
          <a href="#work">{c.nav.work}</a>
          <a href="#notes">{c.nav.notes}</a>
          <a href="#cv">{c.nav.cv}</a>
          <a href="#skills">{c.nav.skills}</a>
          <a href="#contact">{c.nav.contact}</a>
        </nav>
        <div className="lang">
          <ThemeSwitch c={c} />
          <Link className={locale === 'en' ? 'on' : undefined} href="/" locale="en" scroll={false}>
            EN
          </Link>
          <span>/</span>
          <Link className={`kr${locale === 'ko' ? ' on' : ''}`} href="/" locale="ko" scroll={false}>
            한국어
          </Link>
          <a className="btn a cvl" href={files.resume[locale]} download>
            {c.nav.resume}
          </a>
        </div>
      </div>
    </header>
  );
}

function Portrait({ c }: { c: Content }) {
  const ref = useRef<HTMLDivElement>(null);
  function move(e: React.PointerEvent) {
    const el = ref.current;
    if (!el || e.pointerType !== 'mouse' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.transform = `rotateY(${(x - 0.5) * 10}deg) rotateX(${(0.5 - y) * 10}deg)`;
    el.style.setProperty('--gx', `${x * 100}%`);
    el.style.setProperty('--gy', `${y * 100}%`);
  }
  return (
    <div
      className="photo fade"
      style={{ '--d': '.3s' } as React.CSSProperties}
      onPointerMove={move}
      onPointerLeave={() => ref.current && (ref.current.style.transform = '')}
    >
      <div className="card3d" ref={ref}>
        <Image src="/images/portrait-v2.jpg" alt={c.hero.photoAlt} width={1145} height={1374} sizes="(max-width: 900px) 340px, 380px" priority />
      </div>
      <div className="badge">
        <b>{c.hero.badgeValue}</b>
        <span>{c.hero.badgeText}</span>
      </div>
    </div>
  );
}

export function Hero({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <>
      <section className="hero" id="top">
        <div>
          <span className="chip fade" style={{ '--d': '.1s' } as React.CSSProperties}>
            <i />
            {c.hero.status}
          </span>
          <h1>
            <span className="ln">
              <span>{c.hero.first}</span>
            </span>
            <span className="ln">
              <span>{c.hero.last}</span>
            </span>
          </h1>
          <p className="sub fade" style={{ '--d': '.45s' } as React.CSSProperties}>
            {c.hero.sub.map((s, i) => ('b' in s && s.b ? <b key={i}>{s.t}</b> : <span key={i}>{s.t}</span>))}
          </p>
          <div className="ctas fade" style={{ '--d': '.6s' } as React.CSSProperties}>
            <a className="btn a" href={files.resume[locale]} download>
              {c.hero.resumeButton} <small>{c.hero.resumeHint}</small>
            </a>
            <a className="btn" href="#work">
              {c.hero.seeWork}
            </a>
            <a className="btn" href={files.portfolio[locale]} download>
              {c.hero.portfolioButton} <small>{c.hero.portfolioHint}</small>
            </a>
          </div>
          <p className="name-kr fade" style={{ '--d': '.75s' } as React.CSSProperties}>
            Kakhkhorov Shokhjakhon · <span className="kr">카흐호로프 쇼흐자혼</span>
          </p>
        </div>
        <Portrait c={c} />
      </section>
      <div className="stats rv">
        {c.stats.map((s) => (
          <div key={s.label}>
            <b data-to={s.to} data-s={s.suffix}>
              {s.to}
              {s.suffix}
            </b>
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </>
  );
}
