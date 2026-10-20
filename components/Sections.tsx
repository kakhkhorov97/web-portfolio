import Image from 'next/image';
import type { Content } from '../content/en';
import { downloadList, links, type Locale } from '../lib/files';

function SectionHead({ label, intro }: { label: string; intro?: React.ReactNode }) {
  return (
    <>
      <hr className="hr sc" />
      <div className="sh">
        <h2 className="m">{label}</h2>
        {intro ? <p>{intro}</p> : null}
      </div>
    </>
  );
}

export function Work({ c }: { c: Content }) {
  return (
    <section className="sec" id="work">
      <SectionHead label={c.work.label} />
      {c.work.rows.map((r) => (
        <div className="item" key={r.n}>
          <a className="row" href={r.href}>
            <span className="m">{r.n}</span>
            <span className="t">{r.title}</span>
            <span className="m hide">{r.role}</span>
            <span className="m hide">{r.stack}</span>
            <span className="m ar">{r.year} →</span>
          </a>
          {'preview' in r && r.preview ? (
            <div className="prev" aria-hidden="true">
              <span />
              <Image src={r.preview} alt="" width={2000} height={1250} sizes="760px" />
            </div>
          ) : 'cover' in r && r.cover ? (
            <div className="prev alt" aria-hidden="true">
              <b>{r.cover}</b>
            </div>
          ) : null}
        </div>
      ))}
      <div className="end" />
    </section>
  );
}

export function CreatorHub({ c }: { c: Content }) {
  const ch = c.creatorhub;
  return (
    <section className="sec" id="creatorhub">
      <div className="creator">
        <div className="sh">
          <h2 className="m">{ch.label}</h2>
          <div>
            <p>{ch.intro}</p>
            <a className="b solid visit" href={links.creatorhub} target="_blank" rel="noopener noreferrer">
              {ch.visit}
            </a>
          </div>
        </div>
        <figure className="big sv">
          <a href={links.creatorhub} target="_blank" rel="noopener noreferrer" aria-label={ch.visit}>
            <Image src="/images/creatorhub-home.jpg" alt={ch.homeAlt} width={2000} height={1250} sizes="(max-width: 820px) 100vw, 760px" />
          </a>
        </figure>
        <div className="cols">
          <div className="m">
            {ch.stack.map((s) => (
              <div key={s}>{s}</div>
            ))}
          </div>
          <div>
            {ch.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
          </div>
          <div className="num">
            {ch.numbers.map((n) => (
              <div key={n.value}>
                <b>{n.value}</b>
                <span className="m">{n.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="thumbs">
          {ch.shots.map((s) => (
            <figure className="sv" key={s.src}>
              <Image src={s.src} alt={s.caption} width={1000} height={625} sizes="(max-width: 820px) 50vw, 220px" />
              <figcaption className="m">{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Notes({ c }: { c: Content }) {
  return (
    <section className="sec" id="notes">
      <SectionHead label={c.notes.label} intro={c.notes.intro} />
      {c.notes.items.map((n) => (
        <div className="note sv" key={n.tag}>
          <span className="m">{n.tag}</span>
          <h3>{n.title}</h3>
          <p>{n.body}</p>
        </div>
      ))}
    </section>
  );
}

export function Skills({ c }: { c: Content }) {
  return (
    <section className="sec" id="skills">
      <SectionHead label={c.skills.label} intro={c.skills.intro} />
      {c.skills.items.map((s, i) => (
        <div className="skill sv" key={s.title}>
          <span className="m">{String(i + 1).padStart(2, '0')}</span>
          <div>
            <h3>{s.title}</h3>
            <div className="st">{s.tools}</div>
          </div>
          <p>{s.body}</p>
        </div>
      ))}
      <div className="end" />
    </section>
  );
}

export function Cv({ c }: { c: Content }) {
  return (
    <section className="sec" id="cv">
      <SectionHead label={c.cv.label} intro={c.cv.intro} />
      {c.cv.items.map((j) => (
        <div className="job sv" id={j.id} key={j.id}>
          <span className="m">{j.when}</span>
          <div>
            <h3>{j.title}</h3>
            <span className="m">{j.sub}</span>
            {j.points.length ? (
              <ul>
                {j.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ))}
      <div className="end" />
    </section>
  );
}

export function Downloads({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <section className="sec" id="downloads">
      <SectionHead label={c.downloads.label} intro={c.downloads.intro} />
      {downloadList.map((d) => (
        <a className="dl" href={d.href} download key={d.href}>
          <span className="m hide">{d.kind[locale]}</span>
          <span className={`t${d.lang === 'ko' ? ' kr' : ''}`}>{d.title[locale]}</span>
          <span className="m hide">PDF</span>
          <span className="m go">{c.downloads.button}</span>
        </a>
      ))}
      <div className="end" />
    </section>
  );
}

export function Contact({ c, onAsk }: { c: Content; onAsk: () => void }) {
  return (
    <section className="sec" id="contact">
      <SectionHead label={c.contact.label} intro={c.contact.intro} />
      <a className="mail ul" href={`mailto:${links.email}`}>
        {links.email}
      </a>
      <div className="cl m">
        <a className="ul" href={links.github} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
        <span>{c.contact.kakao}</span>
        <a className="ul" href="#downloads">
          {c.contact.files}
        </a>
        <button type="button" className="ul askbtn m" onClick={onAsk}>
          {c.contact.ask}
        </button>
      </div>
    </section>
  );
}
