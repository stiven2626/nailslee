import { motion, useReducedMotion } from 'framer-motion'
import { Reveal, SectionHead } from './ui'

const pasos = [
  { t: 'Llegas y te acomodas', d: 'Te recibimos con una bebida caliente o fría y eliges tu color con calma, sin afán.' },
  { t: 'Preparamos la uña', d: 'Limpieza, forma y cuidado de cutícula con herramientas esterilizadas para cada clienta.' },
  { t: 'Aplicamos y diseñamos', d: 'Capa por capa, con productos de calidad y el diseño que tienes en mente.' },
  { t: 'Cuidado final', d: 'Hidratación de manos y cutículas, y consejos para que tu manicure dure más.' },
]

export default function Ritual() {
  const reduce = useReducedMotion()
  return (
    <section id="experiencia" className="relative bg-paper py-24 md:py-32">
      <div className="gutter mx-auto max-w-[1240px]">
        <SectionHead label="Tu visita, paso a paso" title="Una hora para ti" />

        <ol className="relative mt-16 grid gap-12 md:mt-20 md:grid-cols-4 md:gap-8">
          {/* línea de suelo que se dibuja (horizontal en escritorio, vertical en móvil) */}
          <motion.span
            aria-hidden="true"
            className="absolute left-[7px] top-2 hidden h-px bg-gold md:left-0 md:right-0 md:block"
            style={{ transformOrigin: 'left' }}
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
          />
          <span aria-hidden="true" className="absolute bottom-2 left-[7px] top-2 w-px bg-gold md:hidden" />
          {pasos.map((p, i) => (
            <Reveal as="li" key={p.t} delay={0.15 * i} className="relative flex flex-col gap-3 pl-10 md:pl-0 md:pt-10">
              <span aria-hidden="true" className="absolute left-0 top-[3px] h-[15px] w-[15px] rounded-full border border-gold bg-paper md:-top-[0px] md:left-0">
                <span className="absolute inset-[3px] rounded-full bg-sakura" />
              </span>
              <span className="text-[12px] tabular-nums tracking-[0.2em] text-gold-deep">PASO {i + 1}</span>
              <h3 className="font-display text-[28px] italic leading-tight text-vino">{p.t}</h3>
              <p className="max-w-[32ch] text-[16px] leading-relaxed text-vino-soft">{p.d}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
