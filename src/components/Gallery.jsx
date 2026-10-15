import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { trabajos } from '../config'
import { Reveal, SectionHead } from './ui'

export default function Gallery() {
  const [open, setOpen] = useState(null)

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
      <div className="mt-14 columns-2 gap-3 md:columns-3 md:gap-4">
        {trabajos.map((src, i) => (
          <Reveal key={src} delay={(i % 3) * 0.06} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setOpen(i)}
              className="group block w-full overflow-hidden rounded-[18px] bg-line"
              aria-label={`Ver trabajo ${i + 1} en grande`}
            >
              <img
                src={src}
                alt={`Diseño de uñas Nails Lee ${i + 1}`}
                loading="lazy"
                decoding="async"
                className="w-full transition-transform duration-700 group-hover:scale-[1.04]"
              />
            </button>
          </Reveal>
        ))}
      </div>

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
