import { useEffect, useRef, useState } from 'react'
import { answer, starterQuestions, type AssistantReply } from '../lib/assistant'

type Msg = {
  role: 'bot' | 'user'
  text: string
  cta?: AssistantReply['cta']
  chips?: string[]
}

export default function AskMe() {
  const [open, setOpen] = useState(false)
  const [thinking, setThinking] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([
    {
      role: 'bot',
      text: "Hi — I'm the offline assistant for Efezino's portfolio, powered by his actual CV data. Ask me anything about him.",
      chips: starterQuestions,
    },
  ])
  const scrollRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, thinking, open])

  const send = (raw: string) => {
    const text = raw.trim()
    if (!text || thinking) return
    setMessages((m) => [...m, { role: 'user', text }])
    setThinking(true)
    window.setTimeout(() => {
      const r = answer(text)
      setMessages((m) => [...m, { role: 'bot', text: r.lines.join('\n'), cta: r.cta, chips: r.chips }])
      setThinking(false)
    }, 550)
  }

  const lastChips = [...messages].reverse().find((m) => m.chips)?.chips

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[155] bg-ink-950/30 dark:bg-ink-950/50 lg:hidden" onClick={() => setOpen(false)} />
      )}

      <div
        className={`fixed z-[175] flex flex-col border border-ink-900/15 dark:border-ink-100/15 bg-ink-50 dark:bg-ink-950 shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition-all duration-300 origin-bottom-right ${
          open
            ? 'opacity-100 scale-100 bottom-24 right-3 sm:right-5 w-[calc(100vw-1.5rem)] sm:w-[400px] h-[min(620px,calc(100dvh-8rem))]'
            : 'pointer-events-none opacity-0 scale-90 bottom-20 right-5 w-[400px] h-0'
        }`}
      >
        <div className="flex items-center gap-3 border-b border-ink-900/10 dark:border-ink-100/10 px-4 py-3">
          <div className="flex h-9 w-9 items-center justify-center bg-signal text-ink-950 font-display font-extrabold text-sm">
            EAM
          </div>
          <div className="min-w-0">
            <p className="font-display font-bold text-sm text-ink-900 dark:text-ink-50 leading-tight">Ask Efezino</p>
            <p className="font-mono text-[10px] tracking-widest uppercase text-ink-400">
              offline · answers from his CV
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="ml-auto h-8 w-8 flex items-center justify-center border border-ink-900/15 dark:border-ink-100/15 text-ink-600 dark:text-ink-400 hover:border-signal hover:text-signal"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-3 chat-scroll">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] ${m.role === 'user' ? '' : 'max-w-[90%]'}`}>
                <div
                  className={`px-3.5 py-2.5 text-[13.5px] leading-relaxed whitespace-pre-line ${
                    m.role === 'user'
                      ? 'bg-ink-900 text-ink-50 dark:bg-signal dark:text-ink-950'
                      : 'border border-ink-900/10 dark:border-ink-100/10 bg-ink-100/60 dark:bg-ink-900/50 text-ink-800 dark:text-ink-100'
                  }`}
                >
                  {m.text}
                </div>
                {m.cta && (
                  <a
                    href={m.cta.url}
                    target={m.cta.url.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className="mt-2 inline-block border border-signal px-3 py-1.5 font-mono text-[10px] tracking-[0.18em] uppercase text-signal hover:bg-signal hover:text-ink-950 transition-colors"
                  >
                    {m.cta.label} →
                  </a>
                )}
              </div>
            </div>
          ))}
          {thinking && (
            <div className="flex justify-start">
              <div className="border border-ink-900/10 dark:border-ink-100/10 bg-ink-100/60 dark:bg-ink-900/50 px-4 py-3 flex gap-1.5">
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-signal inline-block" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-signal inline-block" />
                <span className="typing-dot h-1.5 w-1.5 rounded-full bg-signal inline-block" />
              </div>
            </div>
          )}
        </div>

        {!thinking && lastChips && lastChips.length > 0 && (
          <div className="flex gap-2 overflow-x-auto px-4 py-2 border-t border-ink-900/10 dark:border-ink-100/10">
            {lastChips.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => send(c)}
                className="shrink-0 px-2.5 py-1 border border-ink-900/20 dark:border-ink-100/20 font-mono text-[10px] tracking-wide text-ink-600 dark:text-ink-400 hover:border-signal hover:text-signal transition-colors"
              >
                {c}
              </button>
            ))}
          </div>
        )}

        <form
          className="flex items-center gap-2 border-t border-ink-900/10 dark:border-ink-100/10 px-3 py-3"
          onSubmit={(e) => {
            e.preventDefault()
            send(input)
            setInput('')
          }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about Efezino…"
            aria-label="Ask a question about Efezino"
            className="min-w-0 flex-1 bg-transparent text-sm text-ink-900 dark:text-ink-50 placeholder:text-ink-400 outline-none"
          />
          <button
            type="submit"
            disabled={!input.trim() || thinking}
            aria-label="Send question"
            className="flex h-8 w-8 shrink-0 items-center justify-center bg-signal text-ink-950 disabled:opacity-40 hover:opacity-90 transition-opacity"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
            </svg>
          </button>
        </form>
      </div>

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close Ask Efezino chat' : 'Open Ask Efezino chat'}
        className="fixed bottom-5 right-4 sm:right-6 z-[180] flex items-center gap-2.5 border border-ink-900/15 dark:border-ink-100/15 bg-ink-900 text-ink-50 dark:bg-signal dark:text-ink-950 pl-4 pr-5 py-3 shadow-[0_12px_40px_rgba(0,0,0,0.25)] hover:bg-signal hover:text-ink-950 dark:hover:bg-ink-900 dark:hover:text-signal transition-colors"
      >
        {open ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
        <span className="font-mono text-[10px] tracking-[0.2em] uppercase">
          {open ? 'Close' : 'Ask Efezino'}
        </span>
      </button>
    </>
  )
}
