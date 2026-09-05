import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../theme'

const CHARS = '01<>{}[]()/=+*#&|;:~$@%^_\\-'.repeat(4) + 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

export default function BootScreen({ onDone }: { onDone: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { theme } = useTheme()
  const [fading, setFading] = useState(false)

  const isDark = theme === 'dark'
  const palette = isDark
    ? { bg: '#070706', char: '#2ee59d', head: '#5fffc0', fade: 'rgba(7, 7, 6, 0.08)' }
    : { bg: '#f4f1ea', char: '#8a8478', head: '#1a9e6c', fade: 'rgba(244, 241, 234, 0.28)' }

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const fontSize = 18
    let columns = 0
    let drops: number[] = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      columns = Math.ceil(canvas.clientWidth / fontSize)
      drops = Array.from({ length: columns }, () => Math.floor(Math.random() * -50))
    }

    const draw = () => {
      ctx.fillStyle = palette.fade
      ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      ctx.font = `${fontSize}px "IBM Plex Mono", ui-monospace, monospace`
      ctx.textBaseline = 'top'

      for (let i = 0; i < columns; i++) {
        const char = CHARS[Math.floor(Math.random() * CHARS.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        ctx.fillStyle = palette.head
        ctx.fillText(char, x, y)

        for (let t = 1; t < 12; t++) {
          const trailChar = CHARS[Math.floor(Math.random() * CHARS.length)]
          ctx.fillStyle = palette.char
          ctx.globalAlpha = 1 - t * 0.09
          ctx.fillText(trailChar, x, y - t * fontSize)
        }
        ctx.globalAlpha = 1

        if (y > canvas.clientHeight && Math.random() > 0.975) {
          drops[i] = Math.floor(Math.random() * -20)
        } else {
          drops[i]++
        }
      }
      raf = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [palette.bg, palette.char, palette.head, palette.fade])

  useEffect(() => {
    const runTimer = window.setTimeout(() => setFading(true), 3000)
    const fadeTimer = window.setTimeout(() => onDone(), 3700)
    return () => {
      window.clearTimeout(runTimer)
      window.clearTimeout(fadeTimer)
    }
  }, [onDone])

  return (
    <div
      className={`fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-700 ${
        fading ? 'opacity-0' : 'opacity-100'
      }`}
      style={{ backgroundColor: palette.bg }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            isDark
              ? 'radial-gradient(ellipse at center, transparent 40%, rgba(7,7,6,0.7) 100%)'
              : 'radial-gradient(ellipse at center, transparent 45%, rgba(244,241,234,0.85) 100%)',
        }}
      />
      <div className="relative z-10 px-6 text-center">
        <p
          className="font-mono text-[11px] tracking-[0.34em] uppercase"
          style={{ color: isDark ? palette.head : palette.char }}
        >
          Efezino Alvin Melchizedek
        </p>
        <p
          className="mt-2 font-mono text-[13px] sm:text-sm"
          style={{ color: isDark ? palette.char : palette.head }}
        >
          ~/portfolio $ ./booting.sh
          <span className="cursor-blink ml-1 inline-block" style={{ color: isDark ? palette.head : palette.char }}>
            █
          </span>
        </p>
      </div>
    </div>
  )
}
