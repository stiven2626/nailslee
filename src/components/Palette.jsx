import { motion } from 'framer-motion'
import { colores } from '../config'
import { Bottle } from './LogoArt'
import { SectionHead } from './ui'

export default function Palette({ color, setColor }) {
  return (
    <section id="colores" className="gutter mx-auto max-w-[1240px] py-24 md:py-32">
      <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <SectionHead label="Colores de temporada" title="Elige tu tono" />
        <p className="max-w-[38ch] text-[16px] leading-relaxed text-vino-soft">
          Toca un frasco para llevarlo a tu reserva. Si prefieres otro, nos cuentas en las notas.
        </p>
      </div>

      <ul className="mt-14 flex flex-wrap justify-center gap-y-10">
        {colores.map((c, i) => {
          const on = color === c.nombre
          return (
            <li key={c.nombre} className="flex w-1/4 justify-center sm:w-[14.28%]">
              <motion.button
                type="button"
                onClick={() => setColor(on ? '' : c.nombre)}
                aria-pressed={on}
                className="group flex w-full flex-col items-center gap-3 rounded-lg py-2"
                whileHover={{ y: -6, rotate: i % 2 ? 3 : -3 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18 }}
              >
                <span className="relative">
                  <Bottle color={c.hex} className="h-[96px] w-auto md:h-[120px]" />
                  <motion.span
                    className="absolute -bottom-2 left-1/2 h-[3px] -translate-x-1/2 rounded-full bg-vino"
                    initial={false}
                    animate={{ width: on ? 34 : 0, opacity: on ? 1 : 0 }}
                  />
                </span>
                <span className={`text-[13px] tracking-[0.08em] ${on ? 'text-vino' : 'text-vino-soft'}`}>{c.nombre}</span>
              </motion.button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
