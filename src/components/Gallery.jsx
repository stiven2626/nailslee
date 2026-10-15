import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { trabajos } from '../config'
import { Reveal, SectionHead } from './ui'

export default function Gallery() {
  const [open, setOpen] = useState(null)
  const track = useRef(null)
  const slide = (dir) => {
    const el = track.current
    if (!el) return
    const end = el.scrollLeft + el.clientWidth >= el.scrollWidth - 4
    const start = el.scrollLeft <= 4
    if (dir > 0 && end) return el.scrollTo({ left: 0, behavior: 'smooth' })
    if (dir < 0 && start) return el.scrollTo({ left: el.scrollWidth, behavior: 'smooth' })
    el.scrollBy({ left: dir * el.clientWidth * 0.9, behavior: 'smooth' })
  }

  useEffect(() => {
    if (open === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(null)
      if (e.key === 'ArrowRight') setOpen((i) => (i + 1) % trabajos.length)
      if (e.key === 'ArrowLeft') setOpen((i) => (i - 1 + trabajos.length) % trabajos.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section id="trabajos" className="gutter mx-auto max-w-[1240px] py-24 md:py-32">
      <SectionHead label="Trabajos" title="Hecho a mano" intro="Algunos diseños recientes del estudio. Cada set es único, pensado para quien lo lleva." />
      <Reveal className="relative mt-14">
        <div
          ref={track}
          className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-px-5 px-5 pb-2 md:mx-0 md:gap-4 md:scroll-px-0 md:px-0"
        >
          {trabajos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(i)}
              className="group relative aspect-[4/5] w-[72%] shrink-0 snap-start overflow-hidden rounded-[18px] bg-line sm:w-[44%] md:w-[calc((100%-2rem)/3)]"
              aria-label={`Ver trabajo ${i + 1} en grande`}
            >
              <img
                src={src}
                alt={`Diseño de uñas Nails Lee ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </button>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-4">
          <span className="text-[13px] uppercase tracking-[0.18em] text-vino-soft">Desliza para ver más</span>
          <div className="flex gap-2">
            <button type="button" onClick={() => slide(-1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-vino/30 text-[22px] text-vino hover:bg-vino hover:text-cream" aria-label="Trabajos anteriores">‹</button>
            <button type="button" onClick={() => slide(1)} className="flex h-11 w-11 items-center justify-center rounded-full border border-vino/30 text-[22px] text-vino hover:bg-vino hover:text-cream" aria-label="Más trabajos">›</button>
          </div>
        </div>
      </Reveal>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-vino/90 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.img
              key={trabajos[open]}
              src={trabajos[open]}
              alt={`Diseño de uñas Nails Lee ${open + 1}`}
              className="max-h-[86vh] max-w-full rounded-[14px] object-contain shadow-2xl"
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={(e) => e.stopPropagation()}
            />
            <button type="button" onClick={() => setOpen(null)} className="absolute right-5 top-5 text-[28px] leading-none text-cream" aria-label="Cerrar">×</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open - 1 + trabajos.length) % trabajos.length) }} className="absolute left-3 top-1/2 -translate-y-1/2 p-3 text-[32px] text-cream/80 hover:text-cream" aria-label="Anterior">‹</button>
            <button type="button" onClick={(e) => { e.stopPropagation(); setOpen((open + 1) % trabajos.length) }} className="absolute right-3 top-1/2 -translate-y-1/2 p-3 text-[32px] text-cream/80 hover:text-cream" aria-label="Siguiente">›</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
