import { ThemeProvider } from './theme'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import Work from './components/Work'
import Skills from './components/Skills'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <ThemeProvider>
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
      </div>
    </ThemeProvider>
  )
}
