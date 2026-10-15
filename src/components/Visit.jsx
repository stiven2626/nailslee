import { motion, useReducedMotion } from 'framer-motion'
import { negocio, waLink } from '../config'
import LogoArt from './LogoArt'
import { Reveal, SectionHead, WhatsAppIcon } from './ui'

export function Visit() {
  return (
    <section id="visitanos" className="gutter mx-auto max-w-[1240px] py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-3 md:gap-10">
        <SectionHead label="Visítanos" title="Te esperamos" />
        <Reveal className="flex flex-col gap-3">
          <span className="label">Dirección</span>
          <p className="font-display text-[26px] italic leading-snug text-vino">{negocio.direccion}</p>
          <p className="text-[16px] text-vino-soft">{negocio.ciudad}</p>
          {negocio.mapa && (
            <a href={negocio.mapa} target="_blank" rel="noopener noreferrer" className="mt-2 w-fit border-b border-gold pb-0.5 text-[14px] uppercase tracking-[0.18em] text-vino hover:border-vino">
              Cómo llegar
            </a>
          )}
          <span className="label mt-6">Instagram</span>
          <a href={`https://instagram.com/${negocio.instagram}`} target="_blank" rel="noopener noreferrer" className="w-fit text-[18px] text-vino underline decoration-gold underline-offset-4 hover:decoration-vino">
            @{negocio.instagram}
          </a>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-3">
          <span className="label">Horario</span>
          <dl className="flex flex-col">
            {negocio.horario.map((h) => (
              <div key={h.dias} className="flex justify-between gap-4 border-b border-line py-3 text-[16px]">
                <dt className="text-vino">{h.dias}</dt>
                <dd className="text-right tabular-nums text-vino-soft">{h.horas}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-2 text-[14px] text-vino-soft">Atendemos con cita previa.</p>
        </Reveal>
      </div>
    </section>
  )
}

export function Closing() {
  const reduce = useReducedMotion()
  return (
    <section className="relative overflow-hidden bg-vino text-cream">
      <div className="gutter mx-auto flex max-w-[1240px] flex-col items-center gap-8 py-24 text-center md:py-28">
        <motion.div
          className="w-[220px] opacity-90"
          initial={reduce ? false : { opacity: 0.3, y: 10 }}
          whileInView={{ opacity: 0.9, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
        >
          <LogoArt animate={false} />
        </motion.div>
        <h2 className="font-display text-[clamp(40px,6.5vw,76px)] italic leading-[1] text-cream">Tu próxima cita, a un mensaje.</h2>
        <a href={waLink('Hola Nails Lee, quiero agendar una cita.')} target="_blank" rel="noopener noreferrer" className="btn bg-gold text-vino hover:bg-[#E0C285]">
          <WhatsAppIcon className="h-[18px] w-[18px]" /> Escríbenos
        </a>
        <p className="select-all text-[15px] tabular-nums tracking-[0.1em] text-cream/80">{negocio.whatsappVisible}</p>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer className="bg-vino text-cream/70">
      <div className="gutter mx-auto flex max-w-[1240px] flex-col items-center justify-between gap-3 border-t border-cream/15 py-8 text-[12px] uppercase tracking-[0.2em] sm:flex-row" style={{ paddingBottom: 'max(2rem, env(safe-area-inset-bottom, 0px))' }}>
        <span>© {new Date().getFullYear()} Nails Lee · Nail Studio</span>
        <span>{negocio.direccion}, Santander</span>
        <span>
          Creado por{' '}
          <a href="https://www.ideasantander.com/" target="_blank" rel="noopener noreferrer" className="text-gold underline-offset-4 hover:underline">
            Idea Santander
          </a>
        </span>
      </div>
    </footer>
  )
}

export function WhatsAppFab() {
  const reduce = useReducedMotion()
  return (
    <motion.a
      href={waLink('Hola Nails Lee, quiero agendar una cita.')}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Escribir a Nails Lee por WhatsApp"
      className="fixed z-50 flex h-14 items-center gap-2 rounded-full bg-vino pl-4 pr-4 text-cream shadow-[0_12px_30px_-8px_rgba(90,26,43,0.55)] md:pr-5"
      style={{ right: 'calc(18px + env(safe-area-inset-right, 0px))', bottom: 'calc(18px + env(safe-area-inset-bottom, 0px))' }}
      initial={reduce ? false : { scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 2.6, type: 'spring', stiffness: 220, damping: 16 }}
      whileHover={{ y: -3 }}
    >
      {!reduce && (
        <motion.span
          className="absolute inset-0 rounded-full ring-2 ring-gold"
          animate={{ scale: [1, 1.18], opacity: [0.6, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, repeatDelay: 3 }}
          aria-hidden="true"
        />
      )}
      <WhatsAppIcon className="h-6 w-6 text-gold" />
      <span className="hidden text-[13px] uppercase tracking-[0.18em] md:inline">WhatsApp</span>
    </motion.a>
  )
}
