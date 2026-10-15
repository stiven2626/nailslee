import { AnimatePresence, motion } from 'framer-motion'
import { servicios } from '../config'
import { Reveal, SectionHead } from './ui'

export default function Services({ selected, toggle }) {
  return (
    <section id="servicios" className="gutter mx-auto max-w-[1240px] py-24 md:py-32">
      <div className="grid gap-14 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.6fr)] md:gap-20">
        <div className="md:sticky md:top-28 md:self-start">
          <SectionHead
            label="Carta de servicios"
            title="Lo que hacemos"
            intro="Toca un servicio para agregarlo a tu cita. Lo verás listo en el formulario de reserva."
          />
        </div>

        <div className="flex min-w-0 flex-col gap-16">
          {servicios.map((g) => (
            <div key={g.grupo} className="flex flex-col">
              <div className="mb-2 flex items-center gap-4">
                <h3 className="label !text-[12px]">{g.grupo}</h3>
                <span className="h-px flex-1 bg-gold/60" />
              </div>
              <ul className="flex flex-col">
                {g.items.map((s, i) => {
                  const on = selected.includes(s.id)
                  return (
                    <Reveal as="li" key={s.id} delay={i * 0.05}>
                      <button
                        type="button"
                        onClick={() => toggle(s.id)}
                        aria-pressed={on}
                        className="group grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-x-5 gap-y-1 border-b border-line py-6 text-left"
                      >
                        <span className="flex min-w-0 items-baseline gap-3">
                          <span className="font-display text-[clamp(24px,3.2vw,32px)] italic leading-tight text-vino transition-colors group-hover:text-sakura-deep">
                            {s.nombre}
                          </span>
                          <span className="mb-1.5 hidden h-px flex-1 border-b border-dotted border-gold sm:block" />
                        </span>
                        <span className="flex items-center gap-4 pt-2">
                          <span className="whitespace-nowrap text-[15px] tabular-nums text-vino">{s.precio ?? 'Consultar'}</span>
                          <span
                            className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${on ? 'border-vino bg-vino text-paper' : 'border-line text-vino group-hover:border-gold'}`}
                            aria-hidden="true"
                          >
                            <AnimatePresence mode="wait" initial={false}>
                              <motion.svg
                                key={on ? 'on' : 'off'}
                                viewBox="0 0 16 16"
                                className="h-4 w-4"
                                initial={{ scale: 0.4, rotate: -90, opacity: 0 }}
                                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                                exit={{ scale: 0.4, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.6"
                                strokeLinecap="round"
                              >
                                {on ? <path d="M3.5 8.5l3 3 6-7" /> : <path d="M8 3v10M3 8h10" />}
                              </motion.svg>
                            </AnimatePresence>
                          </span>
                        </span>
                        <span className="text-[15px] leading-relaxed text-vino-soft">
                          {s.detalle} <span className="whitespace-nowrap text-gold-deep">· {s.duracion}</span>
                        </span>
                        <span className="sr-only">{on ? 'Agregado a tu cita' : 'Agregar a tu cita'}</span>
                      </button>
                    </Reveal>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
