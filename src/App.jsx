import Lenis from 'lenis'
import { useEffect, useState } from 'react'
import Booking from './components/Booking'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Nav from './components/Nav'
import Palette from './components/Palette'
import Ritual from './components/Ritual'
import Services from './components/Services'
import { GroundLine } from './components/ui'
import { Closing, Footer, Visit, WhatsAppFab } from './components/Visit'
import { setLenis } from './scroll'

export default function App() {
  const [selected, setSelected] = useState([])
  const [color, setColor] = useState('')
  const toggle = (id) => setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const lenis = new Lenis({ duration: 1.15, smoothWheel: true })
    setLenis(lenis)
    let id
    const raf = (t) => { lenis.raf(t); id = requestAnimationFrame(raf) }
    id = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(id); lenis.destroy(); setLenis(null) }
  }, [])

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <div className="gutter mx-auto max-w-[1240px]"><GroundLine /></div>
        <Services selected={selected} toggle={toggle} />
        <Ritual />
        <Gallery />
        <Palette color={color} setColor={setColor} />
        <Booking selected={selected} toggle={toggle} color={color} setColor={setColor} />
        <Visit />
        <Closing />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
