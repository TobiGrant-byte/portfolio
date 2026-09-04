import { education, certifications, profile, asset } from '../data'
import PhotoSlot from './PhotoSlot'

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 sm:px-8 py-20 sm:py-28">
      <p className="font-mono text-[11px] tracking-[0.28em] uppercase text-signal mb-2">04 — Profile</p>
      <h2 className="font-display text-4xl sm:text-5xl font-extrabold text-ink-900 dark:text-ink-50 mb-12">
        Engineer, builder, lab rat
      </h2>

      <div className="grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <PhotoSlot
            label="Studio / lab"
            aspect="aspect-[4/3]"
            src={asset('images/studio.webp')}
            alt="Studio workspace scene"
          />
          <PhotoSlot
            label="Event still"
            aspect="aspect-[16/9]"
            src={asset('images/event.webp')}
            alt="Build With AI event still"
          />
        </div>
        <div className="lg:col-span-7">
          <p className="text-[16px] leading-relaxed text-ink-700 dark:text-ink-100/85">
            I ship full-stack JavaScript products and wire LLMs into interfaces people actually use. When an API dies
            on stage, I switch providers. When a query plan melts, I fix the N+1. When SQLite is not enough, I write a
            database in Go.
          </p>
          <p className="mt-4 text-[16px] leading-relaxed text-ink-700 dark:text-ink-100/85">
            Based in {profile.location}. Currently going deeper on AWS, Docker, CI/CD, RAG, and agentic tool-use —
            while keeping a homelab (OPNsense, Proxmox, WireGuard, Pi-hole) as a security playground.
          </p>

          <div className="mt-10 border border-ink-900/10 dark:border-ink-100/10 p-6 sm:p-8">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-brass mb-3">Education</p>
            <h3 className="font-display text-xl font-bold text-ink-900 dark:text-ink-50">{education.degree}</h3>
            <p className="mt-1 text-sm text-ink-600 dark:text-ink-400">{education.school}</p>
            <ul className="mt-5 grid sm:grid-cols-2 gap-2">
              {education.coursework.map((c) => (
                <li key={c} className="text-sm text-ink-700 dark:text-ink-100/80 pl-3 border-l border-signal/40">
                  {c}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6">
            <p className="font-mono text-[11px] tracking-[0.22em] uppercase text-brass mb-3">Certifications</p>
            <ul>
              {certifications.map((c) => (
                <li
                  key={c}
                  className="font-mono text-sm text-ink-800 dark:text-ink-100 border-b border-ink-900/10 dark:border-ink-100/10 py-3"
                >
                  {c}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
