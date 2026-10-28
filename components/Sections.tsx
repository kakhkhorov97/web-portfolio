import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
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

type Row = Content['work']['rows'][number];

function ProjectDetail({ c, id }: { c: Content; id: string }) {
  if (id === 'creatorhub') {
    const ch = c.creatorhub;
    return (
      <>
        <div className="pj-h">
          <span className="k">01</span>
          <h3>CreatorHub</h3>
        </div>
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
            <a className="btn a" href={links.creatorhub} target="_blank" rel="noopener noreferrer">
              {ch.visit}
            </a>
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
              <Image src={s.src} alt={s.caption} width={1000} height={625} sizes="(max-width: 520px) 50vw, 240px" />
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      </>
    );
  }
  const job = c.cv.items.find((j) => j.id === id);
  if (job) {
    return (
      <>
        <div className="pj-h">
          <h3>{job.title}</h3>
        </div>
        <p className="r">{job.sub}</p>
        <ul className="dl-list">
          {job.points.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </>
    );
  }
  const pr = c.projects;
  const p = pr.items.find((x) => x.id === id);
  if (!p) return null;
  return (
    <>
      <div className="pj-h">
        <span className="k">{p.n}</span>
        <h3>{p.title}</h3>
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
      {p.shots.length ? (
        <div className="pj-shots">
          {p.shots.map((s) => (
            <figure key={s.src}>
              <a href={s.src} target="_blank" rel="noopener noreferrer">
                <Image src={s.src} alt={s.caption} width={1680} height={928} sizes="(max-width: 900px) 100vw, 440px" />
              </a>
              <figcaption>{s.caption}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </>
  );
}

// The website each card links to: the live site, or the code when there is no public site yet.
function siteLink(c: Content, id: string) {
  if (id === 'creatorhub') return { href: links.creatorhub, label: c.work.visit.replace('{host}', 'creatorhub.site') };
  const l = c.projects.items.find((p) => p.id === id)?.links[0];
  if (!l) return null;
  const host = new URL(l.href).host;
  return { href: l.href, label: host === 'github.com' ? l.text : c.work.visit.replace('{host}', host) };
}

function WorkCard({ c, r, onOpen }: { c: Content; r: Row; onOpen: (id: string) => void }) {
  const id = r.href.slice(1);
  const site = siteLink(c, id);
  return (
    <article className="wc feat rv" id={id}>
      <button type="button" className="wc-img" onClick={() => onOpen(id)} aria-label={`${r.title}: ${c.work.more}`}>
        {r.preview ? <Image src={r.preview} alt="" width={2000} height={1250} sizes="(max-width: 900px) 100vw, 680px" /> : null}
      </button>
      <div className="wc-b">
        <span className="k">
          {r.n} · {r.year}
        </span>
        <h3>{r.title}</h3>
        <span className="role">{r.role}</span>
        <p>{r.body}</p>
        <div className="tags">
          {r.tags.slice(0, 7).map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        <div className="wc-f">
          <button type="button" className="more" onClick={() => onOpen(id)}>
            {c.work.more}
          </button>
          {site ? (
            <a className="btn a" href={site.href} target="_blank" rel="noopener noreferrer">
              {site.label}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export function Work({ c }: { c: Content }) {
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);
  // Client sites are told in the CV; every other project shows once, here.
  const rows = c.work.rows.filter((r) => r.preview);
  return (
    <section id="work">
      <SectionHead label={c.work.label} title={c.work.title} intro={c.work.lead} />
      <div className="wlist">
        {rows.map((r) => (
          <WorkCard c={c} r={r} key={r.n} onOpen={setOpen} />
        ))}
      </div>
      <dialog className="pdlg" ref={ref} onClose={() => setOpen(null)} onClick={(e) => e.target === e.currentTarget && setOpen(null)} aria-label={c.work.title}>
        <div className="pdlg-in">
          <button type="button" className="pdlg-x" onClick={() => setOpen(null)} aria-label={c.chat.close}>
            ✕
          </button>
          {open ? <ProjectDetail c={c} id={open} /> : null}
        </div>
      </dialog>
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
        {c.cv.items
          .filter((j) => j.id !== 'sofiya')
          .map((j) => (
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
