import { alsoFamiliar, skillGroups } from '../data'

export default function Skills() {
  return (
    <section id="skills" className="border-y border-ink-900/10 dark:border-ink-100/10 bg-ink-100/30 dark:bg-ink-900/25">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal mb-2">03 — Capabilities</p>
        <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink-900 dark:text-ink-50 mb-12">
          Stack & systems
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-ink-900/10 dark:bg-ink-100/10 border border-ink-900/10 dark:border-ink-100/10">
          {skillGroups.map((g) => (
            <div key={g.title} className="bg-ink-50 dark:bg-ink-950 p-6 sm:p-7">
              <h3 className="font-mono text-[11px] tracking-[0.22em] uppercase text-brass mb-4">{g.title}</h3>
              <ul className="space-y-1.5">
                {g.items.map((item) => (
                  <li key={item} className="text-sm text-ink-800 dark:text-ink-100 flex gap-2">
                    <span className="text-signal mt-0.5">▹</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-10">
          <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-ink-400 mb-4">Also familiar with</p>
          <div className="flex flex-wrap gap-2">
            {alsoFamiliar.map((item) => (
              <span
                key={item}
                className="font-mono text-[11px] px-3 py-1.5 bg-ink-900 text-ink-50 dark:bg-ink-100 dark:text-ink-950"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
