import { profile } from '../data'

export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg text-ink-900/[0.06] dark:text-ink-50/[0.04] pointer-events-none" />
      <div className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28 relative">
        <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal mb-2">05 — Contact</p>
        <h2 className="font-display text-4xl sm:text-6xl font-extrabold text-ink-900 dark:text-ink-50 leading-[0.95] max-w-3xl">
          Let’s build the next thing.
        </h2>
        <p className="mt-6 max-w-lg text-ink-600 dark:text-ink-400">
          Freelance, product, or AI integration work. Drop a line — I reply from the same inbox I demo from.
        </p>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-ink-900/10 dark:bg-ink-100/10 border border-ink-900/10 dark:border-ink-100/10">
          <a
            href={`mailto:${profile.email}`}
            className="bg-ink-50 dark:bg-ink-950 p-6 hover:bg-signal/10 transition-colors group"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-400 mb-2">Email</p>
            <p className="font-display font-semibold text-ink-900 dark:text-ink-50 group-hover:text-signal break-all">
              {profile.email}
            </p>
          </a>
          <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="bg-ink-50 dark:bg-ink-950 p-6 hover:bg-signal/10 transition-colors group">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-400 mb-2">Phone</p>
            <p className="font-display font-semibold text-ink-900 dark:text-ink-50 group-hover:text-signal">
              {profile.phone}
            </p>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="bg-ink-50 dark:bg-ink-950 p-6 hover:bg-signal/10 transition-colors group"
          >
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-400 mb-2">GitHub</p>
            <p className="font-display font-semibold text-ink-900 dark:text-ink-50 group-hover:text-signal">
              {profile.githubHandle}
            </p>
          </a>
          <div className="bg-ink-50 dark:bg-ink-950 p-6">
            <p className="font-mono text-[10px] tracking-[0.22em] uppercase text-ink-400 mb-2">Location</p>
            <p className="font-display font-semibold text-ink-900 dark:text-ink-50">{profile.location}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
