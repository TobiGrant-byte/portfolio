import { useTheme } from '../theme'

const links = [
  { href: '#work', label: 'Work' },
  { href: '#skills', label: 'Stack' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav() {
  const { theme, toggle } = useTheme()

  return (
    <header className="sticky top-0 z-40 border-b border-ink-900/10 dark:border-ink-100/10 bg-ink-50/80 dark:bg-ink-950/80 backdrop-blur-md">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 h-16 flex items-center justify-between">
        <a href="#top" className="flex items-baseline gap-2 group">
          <span className="font-display font-extrabold text-lg tracking-tight text-ink-900 dark:text-ink-50">
            EAM
          </span>
          <span className="hidden sm:inline font-mono text-[10px] tracking-[0.2em] uppercase text-ink-400 group-hover:text-signal transition-colors">
            / portfolio
          </span>
        </a>
        <nav className="flex items-center gap-1 sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-2.5 py-1.5 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-600 dark:text-ink-400 hover:text-ink-900 dark:hover:text-signal transition-colors"
            >
              {l.label}
            </a>
          ))}
          <button
            type="button"
            onClick={toggle}
            aria-label="Toggle color theme"
            className="ml-2 h-9 w-9 border border-ink-900/15 dark:border-ink-100/15 flex items-center justify-center hover:border-signal hover:text-signal transition-colors text-ink-800 dark:text-ink-100"
          >
            {theme === 'dark' ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M21 14.3A8.5 8.5 0 1 1 9.7 3 7 7 0 0 0 21 14.3z" />
              </svg>
            )}
          </button>
        </nav>
      </div>
    </header>
  )
}
