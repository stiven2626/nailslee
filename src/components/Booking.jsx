import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { colores, diasCerrados, horas, negocio, servicios, waLink } from '../config'
import LogoArt from './LogoArt'
import { SectionHead, WhatsAppIcon } from './ui'

const todos = servicios.flatMap((g) => g.items)
const hoyISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}
const fechaLarga = (iso) =>
  iso ? new Intl.DateTimeFormat('es-CO', { weekday: 'long', day: 'numeric', month: 'long' }).format(new Date(`${iso}T12:00:00`)) : ''

export function construirMensaje({ nombre, sel, fecha, hora, color, notas }) {
  const nombres = sel.map((id) => todos.find((s) => s.id === id)?.nombre).filter(Boolean)
  const lineas = [
    `Hola ${negocio.nombre}, quiero agendar una cita.`,
    '',
    `• Nombre: ${nombre || '—'}`,
    `• Servicio: ${nombres.length ? nombres.join(', ') : '—'}`,
    `• Fecha: ${fecha ? fechaLarga(fecha) : '—'}`,
    `• Hora: ${hora || '—'}`,
  ]
  if (color) lineas.push(`• Color: ${color}`)
  if (notas.trim()) lineas.push(`• Notas: ${notas.trim()}`)
  lineas.push('', '¿Me confirman disponibilidad? Gracias.')
  return lineas.join('\n')
}

export default function Booking({ selected, toggle, color, setColor }) {
  const [nombre, setNombre] = useState('')
  const [fecha, setFecha] = useState('')
  const [hora, setHora] = useState('')
  const [notas, setNotas] = useState('')
  const [errores, setErrores] = useState({})
  const [listo, setListo] = useState(null) // url de WhatsApp cuando el mensaje está listo
  const [copiado, setCopiado] = useState(false)

  const cerrado = fecha && diasCerrados.includes(new Date(`${fecha}T12:00:00`).getDay())
  const mensaje = useMemo(
    () => construirMensaje({ nombre, sel: selected, fecha, hora, color, notas }),
    [nombre, selected, fecha, hora, color, notas],
  )

  const enviar = (e) => {
    e.preventDefault()
    const err = {}
    if (!nombre.trim()) err.nombre = 'Escribe tu nombre para saber a quién esperamos.'
    if (!selected.length) err.servicio = 'Elige al menos un servicio.'
    if (!fecha) err.fecha = 'Elige el día de tu cita.'
    else if (cerrado) err.fecha = 'Ese día no atendemos. Elige otra fecha.'
    if (!hora) err.hora = 'Elige un horario.'
    setErrores(err)
    if (Object.keys(err).length) {
      document.getElementById(`campo-${Object.keys(err)[0]}`)?.focus()
      return
    }
    const url = waLink(mensaje)
    setListo(url)
    try { window.open(url, '_blank', 'noopener') } catch { /* el botón de abajo queda disponible */ }
  }

  const copiar = async () => {
    try {
      await navigator.clipboard.writeText(mensaje)
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2200)
    } catch {
      const el = document.getElementById('ticket-texto')
      const r = document.createRange(); r.selectNodeContents(el)
      const s = window.getSelection(); s.removeAllRanges(); s.addRange(r)
    }
  }

  const Error = ({ k }) => (
    <AnimatePresence>
      {errores[k] && (
        <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-[14px] text-[#A3222D]" role="alert">
          {errores[k]}
        </motion.p>
      )}
    </AnimatePresence>
  )

  return (
    <section id="reserva" className="bg-paper py-24 md:py-32">
      <div className="gutter mx-auto grid max-w-[1240px] gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-20">
        <form onSubmit={enviar} noValidate className="flex min-w-0 flex-col gap-10">
          <SectionHead label="Reserva" title="Agenda tu cita" intro="Completa los datos y te llevamos a WhatsApp con el mensaje listo. Te confirmamos la disponibilidad por ese medio." />

          <div className="flex flex-col gap-2">
            <label htmlFor="campo-nombre" className="label">Tu nombre</label>
            <input id="campo-nombre" className="field" autoComplete="given-name" placeholder="¿Cómo te llamas?" value={nombre} onChange={(e) => setNombre(e.target.value)} />
            <Error k="nombre" />
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="label mb-3">Servicio</legend>
            <div className="flex flex-wrap gap-2">
              {todos.map((s, i) => (
                <button key={s.id} id={i === 0 ? 'campo-servicio' : undefined} type="button" className="chip" aria-pressed={selected.includes(s.id)} onClick={() => toggle(s.id)}>
                  {s.nombre}
                </button>
              ))}
            </div>
            <Error k="servicio" />
          </fieldset>

          <div className="grid gap-10 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="campo-fecha" className="label">Día</label>
              <input id="campo-fecha" type="date" min={hoyISO()} className="field" value={fecha} onChange={(e) => setFecha(e.target.value)} />
              {cerrado && !errores.fecha && <p className="text-[14px] text-[#A3222D]">Ese día no atendemos. Elige otra fecha.</p>}
              <Error k="fecha" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="campo-color" className="label">Color (opcional)</label>
              <select id="campo-color" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 fill=%22none%22 stroke=%22%2386662B%22 stroke-width=%221.4%22/></svg>')] bg-[right_4px_center] bg-no-repeat pr-8" value={color} onChange={(e) => setColor(e.target.value)}>
                <option value="">Lo decido en el estudio</option>
                {colores.map((c) => <option key={c.nombre} value={c.nombre}>{c.nombre}</option>)}
              </select>
            </div>
          </div>

          <fieldset className="flex flex-col gap-3">
            <legend className="label mb-3">Hora</legend>
            <div className="flex flex-wrap gap-2">
              {horas.map((h, i) => (
                <button key={h} id={i === 0 ? 'campo-hora' : undefined} type="button" className="chip tabular-nums" aria-pressed={hora === h} onClick={() => setHora(h)}>
                  {h}
                </button>
              ))}
            </div>
            <Error k="hora" />
          </fieldset>

          <div className="flex flex-col gap-2">
            <label htmlFor="campo-notas" className="label">Notas (opcional)</label>
            <textarea id="campo-notas" rows={3} className="field resize-none" placeholder="Largo, forma, una foto de referencia que te gustó…" value={notas} onChange={(e) => setNotas(e.target.value)} />
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <motion.button type="submit" className="btn btn-primary" whileTap={{ scale: 0.97 }}>
              <WhatsAppIcon className="h-[18px] w-[18px]" /> Enviar por WhatsApp
            </motion.button>
            <span className="text-[14px] text-vino-soft">Respondemos en horario de atención.</span>
          </div>

          <AnimatePresence>
            {listo && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex flex-col gap-3 rounded-2xl border border-gold/60 bg-cream p-5"
                role="status"
              >
                <p className="text-[16px] leading-relaxed text-vino">
                  Tu mensaje está listo. Envíalo en WhatsApp y te confirmamos la cita. Si WhatsApp no se abrió, usa este botón:
                </p>
                <div className="flex flex-wrap gap-3">
                  <a href={listo} target="_blank" rel="noopener noreferrer" className="btn btn-primary !min-h-[44px] !py-2.5">Abrir WhatsApp</a>
                  <button type="button" onClick={copiar} className="btn btn-ghost !min-h-[44px] !py-2.5">{copiado ? 'Copiado' : 'Copiar mensaje'}</button>
                </div>
                <p className="text-[14px] text-vino-soft">También puedes escribirnos al <span className="select-all tabular-nums text-vino">{negocio.whatsappVisible}</span>.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>

        {/* Vista previa del mensaje, como una nota de papel */}
        <aside className="min-w-0 lg:sticky lg:top-28 lg:self-start" aria-label="Vista previa del mensaje">
          <span className="label">Así llegará tu mensaje</span>
          <motion.div
            layout
            className="relative mt-4 overflow-hidden rounded-[22px] bg-cream p-7 shadow-[0_30px_60px_-30px_rgba(90,26,43,0.35)] ring-1 ring-line md:p-9"
          >
            <div className="flex items-center justify-between gap-4">
              <LogoArt animate={false} className="w-[120px]" />
              <span className="text-right text-[11px] uppercase leading-relaxed tracking-[0.24em] text-gold-deep">
                Solicitud
                <br />
                de cita
              </span>
            </div>
            <div className="my-6 border-t border-dashed border-gold/70" />
            <pre id="ticket-texto" className="whitespace-pre-wrap break-words font-sans text-[15px] leading-[1.75] text-vino">
              {mensaje}
            </pre>
            <div className="my-6 border-t border-dashed border-gold/70" />
            <p className="font-display text-[22px] italic text-vino-soft">Te esperamos.</p>
            {/* recortes laterales tipo ticket */}
            <span aria-hidden="true" className="absolute -left-3 top-[118px] h-6 w-6 rounded-full bg-paper ring-1 ring-line" />
            <span aria-hidden="true" className="absolute -right-3 top-[118px] h-6 w-6 rounded-full bg-paper ring-1 ring-line" />
          </motion.div>
        </aside>
      </div>
    </section>
  )
}
