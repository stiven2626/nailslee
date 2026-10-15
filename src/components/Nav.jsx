import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { useState } from 'react'
import { scrollToId } from '../scroll'

const links = [
  ['servicios', 'Servicios'],
  ['experiencia', 'Experiencia'],
  ['trabajos', 'Trabajos'],
  ['colores', 'Colores'],
  ['visitanos', 'Visítanos'],
]

export default function Nav() {
  const { scrollY } = useScroll()
  const [solid, setSolid] = useState(false)
  useMotionValueEvent(scrollY, 'change', (v) => setSolid(v > 40))
  const go = (id) => (e) => { e.preventDefault(); scrollToId(id) }

  return (
    <motion.nav
      className={`fixed inset-x-0 top-0 z-40 transition-[background,box-shadow] duration-500 ${solid ? 'bg-cream/90 shadow-[0_1px_0_#E8DCCF] backdrop-blur-md' : 'bg-transparent'}`}
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
      aria-label="Principal"
    >
      <div className="gutter mx-auto flex h-[68px] max-w-[1240px] items-center justify-between gap-6">
        <a href="#inicio" onClick={go('inicio')} className="flex items-baseline gap-2" aria-label="Nails Lee, ir al inicio">
          <span className="font-display text-[26px] italic leading-none text-vino">Nails Lee</span>
        </a>
        <div className="hidden items-center gap-8 md:flex">
          {links.map(([id, t]) => (
            <a key={id} href={`#${id}`} onClick={go(id)} className="group relative py-2 text-[13px] uppercase tracking-[0.2em] text-vino-soft hover:text-vino">
              {t}
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-gold transition-transform duration-500 group-hover:scale-x-100" />
            </a>
          ))}
        </div>
        <a href="#reserva" onClick={go('reserva')} className="btn btn-primary !min-h-[42px] !px-5 !py-2.5 !text-[12px]">
          Reservar
        </a>
      </div>
    </motion.nav>
  )
}
