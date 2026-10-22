import Image from 'next/image';
import type { Content } from '../content/en';
import { downloadList, files, links, type Locale } from '../lib/files';

function SectionHead({ id, label, title, intro }: { id?: string; label: string; title: string; intro?: React.ReactNode }) {
  return (
    <div className="sh rv" id={id}>
      <div>
        <span className="eyebrow">{`// ${label}`}</span>
        <h2>{title}</h2>
      </div>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}

export function Work({ c }: { c: Content }) {
  return (
    <section id="work">
      <SectionHead label={c.work.label} title={c.work.title} intro={c.work.lead} />
      <div className="stack">
        {c.work.rows.map((r, i) => (
          <article className="pc" key={r.n} style={{ '--i': i } as React.CSSProperties}>
            <div>
              <span className="k">
                {r.n} · {r.year} · {r.role}
              </span>
              <h3>{r.title}</h3>
              <p>{r.body}</p>
              <div className="tags">
                {r.tags.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {r.n === '01' ? (
                <a className="btn a" href={links.creatorhub} target="_blank" rel="noopener noreferrer">
                  {c.creatorhub.visit}
                </a>
              ) : null}
            </div>
            {r.preview ? (
              <div>
                <a className="shot" href={r.href} aria-label={r.title}>
                  <Image src={r.preview} alt="" width={2000} height={1250} sizes="(max-width: 900px) 100vw, 640px" />
                </a>
                {r.minis ? (
                  <div className="mini">
                    {r.minis.map((m) => (
                      <Image key={m.src} src={m.src} alt={m.alt} width={1000} height={625} sizes="(max-width: 900px) 33vw, 210px" />
                    ))}
                  </div>
                ) : null}
              </div>
            ) : (
              <div className="cover">
                <div>
                  <b>{r.cover}</b>
                  <span>{r.coverText}</span>
                </div>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}

export function CreatorHub({ c }: { c: Content }) {
  const ch = c.creatorhub;
  return (
    <section id="creatorhub">
      <SectionHead label={ch.label} title={ch.title} intro={ch.intro} />
      <div className="ch rv">
        <div className="chcols">
          <div>
            {ch.body.map((p) => (
              <p key={p.slice(0, 20)}>{p}</p>
            ))}
            <div className="tags">
              {ch.stack.map((s) => (
                <span key={s}>{s}</span>
              ))}
            </div>
          </div>
          <div className="num">
            {ch.numbers.map((n) => (
              <div key={n.value}>
                <b>{n.value}</b>
                <span>{n.text}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="thumbs">
          {ch.shots.map((s) => (
            <figure key={s.src}>
              <Image src={s.src} alt={s.caption} width={1000} height={625} sizes="(max-width: 520px) 50vw, (max-width: 900px) 33vw, 270px" />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Projects({ c }: { c: Content }) {
  const pr = c.projects;
  return (
    <section id="projects">
      <SectionHead label={pr.label} title={pr.title} intro={pr.intro} />
      <div className="prj">
        {pr.items.map((p) => (
          <article className="pj rv" id={p.id} key={p.id} aria-labelledby={`${p.id}-t`}>
            <div className="pj-h">
              <span className="k">{p.n}</span>
              <h3 id={`${p.id}-t`}>{p.title}</h3>
            </div>
            <dl className="pj-meta">
              <div>
                <dt>{pr.statusLabel}</dt>
                <dd>{p.status}</dd>
              </div>
              <div>
                <dt>{pr.roleLabel}</dt>
                <dd>{p.role}</dd>
              </div>
            </dl>
            <div className="pj-cols">
              <div>
                {p.body.map((t) => (
                  <p key={t.slice(0, 24)}>{t}</p>
                ))}
                <div className="tags">
                  {p.stack.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
                <div className="ctas">
                  {p.links.map((l) => (
                    <a className="btn" key={l.href} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.text}
                    </a>
                  ))}
                </div>
              </div>
              <div className="pj-lim">
                <h4>{pr.limitsLabel}</h4>
                <ul>
                  {p.limits.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>
            </div>
            {p.shots.length ? (
              <div className="pj-shots">
                {p.shots.map((s) => (
                  <figure key={s.src}>
                    <a href={s.src} target="_blank" rel="noopener noreferrer">
                      <Image src={s.src} alt={s.caption} width={1680} height={928} sizes="(max-width: 900px) 100vw, 560px" />
                    </a>
                    <figcaption>{s.caption}</figcaption>
                  </figure>
                ))}
              </div>
            ) : null}
            {p.diagram.length ? (
              <ol className="pj-flow" aria-label={`${p.title}: architecture`}>
                {p.diagram.map((d, i) => (
                  <li key={d}>
                    <span>{String(i + 1).padStart(2, '0')}</span>
                    {d}
                  </li>
                ))}
              </ol>
            ) : null}
          </article>
        ))}
      </div>
    </section>
  );
}

export function Notes({ c }: { c: Content }) {
  return (
    <section id="notes">
      <SectionHead label={c.notes.label} title={c.notes.title} intro={c.notes.intro} />
      <div className="notes">
        {c.notes.items.map((n, i) => (
          <div className="note rv" key={n.tag}>
            <span className="n">
              {String(i + 1).padStart(2, '0')} · {n.tag}
            </span>
            <h3>{n.title}</h3>
            <p>{n.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Cv({ c }: { c: Content }) {
  return (
    <section id="cv">
      <SectionHead label={c.cv.label} title={c.cv.title} intro={c.cv.intro} />
      <div className="tl" id="tl">
        <div className="fill" />
        {c.cv.items.map((j) => (
          <div className="job" id={j.id} key={j.id}>
            <span className="d">{j.when}</span>
            <div>
              <h3>{j.title}</h3>
              <span className="r">{j.sub}</span>
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
      </div>
    </section>
  );
}

export function Skills({ c }: { c: Content }) {
  return (
    <section id="skills">
      <SectionHead label={c.skills.label} title={c.skills.title} intro={c.skills.intro} />
      <div className="sk">
        {c.skills.items.map((s, i) => (
          <div className="s rv" key={s.title}>
            <span className="n">{String(i + 1).padStart(2, '0')}</span>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <p className="tools">{s.tools}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function Downloads({ c, locale }: { c: Content; locale: Locale }) {
  return (
    <section id="downloads">
      <SectionHead label={c.downloads.label} title={c.downloads.title} intro={c.downloads.intro} />
      <div className="dls rv">
        {downloadList.map((d) => (
          <a className="dl" href={d.href} download key={d.href}>
            <span className={`t${d.lang === 'ko' ? ' kr' : ''}`}>{d.title[locale]}</span>
            <span className="k">{d.kind[locale]} · PDF</span>
            <span className="go">{c.downloads.button}</span>
          </a>
        ))}
      </div>
    </section>
  );
}

export function Contact({ c, locale, onAsk }: { c: Content; locale: Locale; onAsk: () => void }) {
  return (
    <section className="ct rv" id="contact">
      <span className="eyebrow">{`// ${c.contact.label}`}</span>
      <h2>{c.contact.title}</h2>
      <p>{c.contact.intro}</p>
      <div className="ctas">
        <a className="btn" href={`mailto:${links.email}`}>
          {c.contact.email}
        </a>
        <a className="btn o" href={files.resume[locale]} download>
          {c.nav.resume}
        </a>
        <a className="btn o" href={links.github} target="_blank" rel="noopener noreferrer">
          GitHub ↗
        </a>
        <button type="button" className="btn o" onClick={onAsk}>
          {c.contact.ask}
        </button>
      </div>
      <span className="mail">
        {links.email} · {c.contact.kakao}
      </span>
    </section>
  );
}
