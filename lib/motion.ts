import { useEffect } from 'react';

// Scroll effects: reveal on enter, count-up stats, stacking project cards, timeline fill.
// Re-run on locale change because the section nodes are re-rendered.
export function useScrollMotion(key: string) {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const header = document.getElementById('hd');
    const cards = [...document.querySelectorAll<HTMLElement>('.pc')];
    const tl = document.getElementById('tl');
    const fill = tl?.querySelector<HTMLElement>('.fill');
    const jobs = tl ? [...tl.querySelectorAll<HTMLElement>('.job')] : [];

    function count(el: HTMLElement) {
      const to = Number(el.dataset.to);
      const suffix = el.dataset.s ?? '';
      const t0 = performance.now();
      const step = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        el.textContent = Math.round(to * (1 - Math.pow(1 - k, 4))) + suffix;
        if (k < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }

    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add('v');
          io.unobserve(e.target);
          if (!reduce) e.target.querySelectorAll<HTMLElement>('[data-to]').forEach(count);
        }),
      { rootMargin: '0px 0px -10% 0px' },
    );
    document.querySelectorAll('.rv').forEach((el) => io.observe(el));

    let frame = 0;
    function update() {
      frame = 0;
      header?.classList.toggle('scr', window.scrollY > 10);
      const mid = window.innerHeight * 0.6;
      if (tl && fill) {
        const r = tl.getBoundingClientRect();
        fill.style.height = `${Math.max(0, Math.min(1, (mid - r.top) / r.height)) * 100}%`;
        jobs.forEach((j) => j.classList.toggle('on', j.getBoundingClientRect().top < mid));
      }
      if (reduce) return;
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (!next) return;
        const a = card.getBoundingClientRect();
        const k = Math.max(0, Math.min(1, 1 - (next.getBoundingClientRect().top - a.top) / a.height));
        card.style.transform = k ? `scale(${1 - k * 0.06})` : '';
        card.style.filter = k ? `brightness(${1 - k * 0.35})` : '';
      });
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [key]);
}
