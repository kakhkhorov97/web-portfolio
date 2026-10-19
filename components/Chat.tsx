import { useEffect, useRef, useState } from 'react';
import type { Content } from '../content/en';
import type { Locale } from '../lib/files';

type Turn = { role: 'user' | 'model'; text: string };

export function Chat({ c, locale, onClose }: { c: Content; locale: Locale; onClose: () => void }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight });
  }, [turns, busy]);

  async function send(text: string) {
    const q = text.trim().slice(0, 1500);
    if (!q || busy) return;
    const next = [...turns, { role: 'user' as const, text: q }];
    setTurns(next);
    setDraft('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-9), locale }),
      });
      const data = (await res.json()) as { reply?: string };
      setTurns([...next, { role: 'model', text: res.ok && data.reply ? data.reply : c.chat.error }]);
    } catch {
      setTurns([...next, { role: 'model', text: c.chat.error }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="chat" role="dialog" aria-label={c.chat.title}>
      <header>
        <b>{c.chat.title}</b>
        <button type="button" className="close m" onClick={onClose}>
          {c.chat.close}
        </button>
      </header>
      <div className="log" ref={logRef} aria-live="polite">
        <p className="m" style={{ margin: 0 }}>
          {c.chat.hint}
        </p>
        {turns.length === 0 ? (
          <div className="sugg">
            {c.chat.suggestions.map((s) => (
              <button type="button" key={s} onClick={() => send(s)}>
                {s}
              </button>
            ))}
          </div>
        ) : null}
        {turns.map((t, i) => (
          <div key={i} className={`msg ${t.role}`}>
            {t.text}
          </div>
        ))}
        {busy ? <div className="msg model m">{c.chat.thinking}</div> : null}
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder={c.chat.placeholder}
          maxLength={1500}
          aria-label={c.chat.placeholder}
        />
        <button type="submit" disabled={busy || !draft.trim()}>
          {c.chat.send}
        </button>
      </form>
    </div>
  );
}
