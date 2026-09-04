const items = [
  'MERN',
  'Next.js',
  'TypeScript',
  'Groq LLM',
  'Supabase',
  'Go',
  'PhantomDB',
  'RAG',
  'Docker',
  'AWS',
  'Socket.io',
  'NestJS',
  'Linux',
  'Security',
]

export default function Marquee() {
  const doubled = [...items, ...items]
  return (
    <div className="border-y border-ink-900/10 dark:border-ink-100/10 overflow-hidden bg-ink-100/40 dark:bg-ink-900/40">
      <div className="marquee-track flex w-max py-3">
        {doubled.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="px-6 font-mono text-[11px] tracking-[0.28em] uppercase text-ink-600 dark:text-ink-400"
          >
            <span className="text-signal mr-6">●</span>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
