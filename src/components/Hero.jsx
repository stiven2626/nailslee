import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useMemo, useRef } from 'react'
import LogoArt from './LogoArt'
import { WhatsAppIcon } from './ui'
import { negocio, waLink } from '../config'
import { scrollToId } from '../scroll'

function Petals({ count = 10 }) {
  const reduce = useReducedMotion()
  const petals = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        left: 4 + ((i * 37) % 92),
        size: 7 + ((i * 5) % 7),
        dur: 11 + ((i * 7) % 9),
        delay: (i * 1.7) % 9,
        drift: (i % 2 ? 1 : -1) * (30 + ((i * 13) % 50)),
        rot: (i * 47) % 360,
      })),
    [count],
  )
  if (reduce) return null
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {petals.map((p, i) => (
        <motion.svg
          key={i}
          width={p.size * 1.6}
          height={p.size}
          viewBox="0 0 16 10"
          className="absolute -top-6"
          style={{ left: `${p.left}%` }}
          initial={{ y: -40, x: 0, rotate: p.rot, opacity: 0 }}
          animate={{ y: ['-5vh', '95vh'], x: [0, p.drift, p.drift * 0.4], rotate: [p.rot, p.rot + 220], opacity: [0, 0.9, 0.9, 0] }}
          transition={{ duration: p.dur, delay: 2.4 + p.delay, repeat: Infinity, ease: 'linear', times: [0, 0.1, 0.85, 1] }}
        >
          <ellipse cx="8" cy="5" rx="7" ry="3.6" fill="#E9A8B6" />
        </motion.svg>
      ))}
    </div>
  )
}

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const artY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const reduce = useReducedMotion()

  const rise = (d) =>
    reduce ? {} : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { delay: d, duration: 1, ease: [0.22, 1, 0.36, 1] } }

  return (
    <header ref={ref} id="inicio" className="relative overflow-hidden">
      <Petals />
      <div className="gutter mx-auto grid max-w-[1240px] items-center gap-10 pb-20 pt-28 md:grid-cols-[1.05fr_1fr] md:gap-6 md:pb-28 md:pt-36">
        <div className="order-2 flex flex-col gap-7 md:order-1">
          <motion.span className="label" {...rise(0.2)}>Nail studio · {negocio.ciudad}</motion.span>
          <motion.h1
            className="font-display text-[clamp(52px,9.5vw,112px)] font-normal leading-[0.92] tracking-[-0.01em] text-vino"
            {...rise(0.35)}
          >
            El detalle,
            <br />
            <em className="text-sakura-deep">sin prisa.</em>
          </motion.h1>
          <motion.p className="max-w-[40ch] text-[18px] leading-relaxed text-vino-soft" {...rise(0.5)}>
            Manicure, pedicure y diseño de uñas en un espacio tranquilo, pensado para que te sientas como en casa mientras cuidamos cada uña.
          </motion.p>
          <motion.div className="flex flex-wrap gap-3" {...rise(0.65)}>
            <a href="#reserva" onClick={(e) => { e.preventDefault(); scrollToId('reserva') }} className="btn btn-primary">
              Reservar cita
            </a>
            <a href={waLink('Hola, quiero información sobre los servicios de Nails Lee.')} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <WhatsAppIcon className="h-[18px] w-[18px]" /> Escribir
            </a>
          </motion.div>
        </div>

        <motion.div style={reduce ? undefined : { y: artY }} className="order-1 flex flex-col items-center md:order-2">
          <LogoArt className="w-full max-w-[520px]" delay={0.2} />
          <motion.div className="mt-5 flex flex-col items-center gap-2" {...rise(2.2)}>
            <span className="font-display text-[clamp(38px,5vw,54px)] italic leading-none text-gold-deep">Nails Lee</span>
            <span className="flex items-center gap-3 text-[11px] uppercase tracking-label text-gold-deep">
              <span className="h-px w-8 bg-gold" /> Nail Studio <span className="h-px w-8 bg-gold" />
            </span>
          </motion.div>
        </motion.div>
      </div>
    </header>
  )
}
