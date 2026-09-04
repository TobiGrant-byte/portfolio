import { useEffect, useState } from 'react'

type PhotoSlotProps = {
  label: string
  caption?: string
  className?: string
  aspect?: string
  src?: string
  alt?: string
}

export default function PhotoSlot({
  label,
  caption,
  className = '',
  aspect = 'aspect-[4/5]',
  src,
  alt,
}: PhotoSlotProps) {
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <figure className={`relative ${className}`}>
      <div
        className={`clip-frame border border-ink-900/15 dark:border-ink-100/15 bg-ink-100/50 dark:bg-ink-900/60 ${aspect} w-full overflow-hidden flex items-center justify-center ${
          src
            ? 'cursor-zoom-in transition-transform duration-300 ease-out hover:-translate-y-2 hover:scale-[1.05] hover:shadow-glow'
            : 'photo-slot'
        }`}
        onClick={() => src && setOpen(true)}
        onMouseEnter={() => src && setHover(true)}
        onMouseLeave={() => setHover(false)}
        role={src ? 'button' : undefined}
        tabIndex={src ? 0 : undefined}
        onKeyDown={(e) => {
          if (!src) return
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt ?? label}
            className="absolute inset-0 h-full w-full object-cover object-top"
          />
        ) : (
          <>
            <div className="absolute inset-3 border border-dashed border-ink-800/30 dark:border-signal/25 pointer-events-none" />
            <div className="relative z-10 text-center px-4">
              <p className="font-mono text-[10px] tracking-[0.28em] uppercase text-signal">
                IMG SLOT
              </p>
              <p className="mt-2 font-display text-lg sm:text-xl font-semibold text-ink-800 dark:text-ink-50">
                {label}
              </p>
              {caption && (
                <p className="mt-1 text-xs text-ink-600 dark:text-ink-400 max-w-[16rem] mx-auto">{caption}</p>
              )}
            </div>
            <span className="absolute top-3 left-3 font-mono text-[10px] text-ink-400">[ DROP PHOTO ]</span>
            <span className="absolute bottom-3 right-3 font-mono text-[10px] text-ink-400">4:5</span>
          </>
        )}
      </div>

      {hover && src && !open && (
        <div className="hidden lg:flex pointer-events-none fixed inset-0 z-[110] items-center justify-center p-10">
          <img
            src={src}
            alt=""
            className="max-h-[86vh] max-w-[86vw] object-contain bg-ink-50 dark:bg-ink-950 shadow-[0_32px_90px_rgba(0,0,0,0.58)] border border-ink-900/10 dark:border-ink-100/20"
          />
        </div>
      )}

      {open && src && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-ink-950/85 p-4 sm:p-8"
          onClick={() => setOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label={alt ?? label}
        >
          <img
            src={src}
            alt={alt ?? label}
            className="max-h-[92vh] max-w-[92vw] object-contain"
          />
        </div>
      )}
    </figure>
  )
}
