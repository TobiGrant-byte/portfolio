import { profile } from '../data'
import PhotoSlot from './PhotoSlot'

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg text-ink-900/[0.06] dark:text-ink-50/[0.04] pointer-events-none" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-16 sm:py-24 relative">
        <div className="flex items-center gap-3 mb-8 rise">
          <span className="h-2 w-2 rounded-full bg-signal shadow-glow" />
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-600 dark:text-ink-400">
            Available for work · {profile.location}
          </p>
        </div>

        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-10 lg:gap-16 items-end">
          <div>
            <p className="font-mono text-xs tracking-[0.28em] uppercase text-brass mb-4 rise">
              Full-Stack AI Engineer
            </p>
            <h1 className="font-display font-extrabold leading-[0.92] text-[clamp(2.6rem,8vw,5.4rem)] text-ink-900 dark:text-ink-50 rise">
              Efezino
              <br />
              Alvin
              <span className="block text-signal">Melchizedek</span>
            </h1>
            <p className="mt-8 max-w-xl text-[15px] sm:text-base leading-relaxed text-ink-600 dark:text-ink-400 rise">
              {profile.summary}
            </p>
            <div className="mt-8 flex flex-wrap gap-3 rise">
              <a
                href="#work"
                className="inline-flex items-center gap-2 bg-ink-900 dark:bg-signal text-ink-50 dark:text-ink-950 px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase hover:opacity-90 transition-opacity"
              >
                View selected work
                <span aria-hidden>→</span>
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 border border-ink-900/20 dark:border-ink-100/20 px-5 py-3 font-mono text-[11px] tracking-[0.2em] uppercase text-ink-800 dark:text-ink-100 hover:border-signal hover:text-signal transition-colors"
              >
                Email me
              </a>
            </div>
            <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-ink-500 dark:text-ink-400">
              {profile.roles.map((r) => (
                <li key={r} className="flex items-center gap-2">
                  <span className="text-signal">/</span>
                  {r}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative rise">
            <div className="absolute -inset-4 border border-ink-900/10 dark:border-ink-100/10 hidden sm:block pointer-events-none" />
            <PhotoSlot
              label="Portrait"
              aspect="aspect-[4/5]"
              src={profile.portrait}
              alt={`${profile.name} headshot`}
            />
            <div className="mt-3 flex justify-between font-mono text-[10px] tracking-widest uppercase text-ink-400">
              <span>Fig. 01 — Identity</span>
              <span>NG · 2026</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
