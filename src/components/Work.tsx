import { projects } from '../data'
import PhotoSlot from './PhotoSlot'

export default function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-12">
        <div>
          <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal mb-2">02 — Selected work</p>
          <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink-900 dark:text-ink-50">
            Shipped products
          </h2>
        </div>
        <p className="max-w-sm text-sm text-ink-600 dark:text-ink-400">
          Freelance, event, and personal systems — from live AI demos to an embedded database engine in Go.
        </p>
      </div>

      <div className="space-y-16">
        {projects.map((p, i) => {
          const reverse = i % 2 === 1
          return (
            <article
              key={p.code}
              className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-start border-t border-ink-900/10 dark:border-ink-100/10 pt-10"
            >
              <div className={`lg:col-span-5 ${reverse ? 'lg:order-2' : ''}`}>
                <PhotoSlot
                  label={`${p.title} still`}
                  caption={`Project screenshot or architecture diagram for ${p.title}.`}
                  aspect="aspect-[16/10]"
                  src={p.image}
                  alt={`${p.title} screenshot`}
                />
              </div>
              <div className={`lg:col-span-7 ${reverse ? 'lg:order-1' : ''}`}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="font-mono text-signal text-sm">{p.code}</span>
                  <span className="h-px flex-1 bg-ink-900/10 dark:bg-ink-100/10" />
                  <span className="font-mono text-[11px] text-ink-400">{p.year}</span>
                </div>
                <p className="font-mono text-[11px] tracking-[0.2em] uppercase text-brass mb-1">{p.tag}</p>
                <h3 className="font-display text-3xl font-bold text-ink-900 dark:text-ink-50">{p.title}</h3>
                <p className="mt-1 text-sm text-ink-500 dark:text-ink-400">{p.context}</p>
                <ul className="mt-5 space-y-3 text-[15px] leading-relaxed text-ink-700 dark:text-ink-100/80">
                  {p.bullets.map((b) => (
                    <li key={b} className="pl-4 border-l-2 border-signal/50">
                      {b}
                    </li>
                  ))}
                </ul>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <li
                      key={s}
                      className="font-mono text-[10px] tracking-wider uppercase px-2.5 py-1 border border-ink-900/15 dark:border-ink-100/15 text-ink-600 dark:text-ink-400"
                    >
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
