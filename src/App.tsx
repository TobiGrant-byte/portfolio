import { useState } from 'react'
import { ThemeProvider } from './theme'
import BootScreen from './components/BootScreen'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

function Shell() {
  const [booted, setBooted] = useState(false)

  return (
    <div className="min-h-screen bg-ink-50 text-ink-900 dark:bg-ink-950 dark:text-ink-50">
      <div className="grain" aria-hidden />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Skills />
        <About />
        <Contact />
      </main>
      <Footer />
      {!booted && <BootScreen onDone={() => setBooted(true)} />}
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  )
}
