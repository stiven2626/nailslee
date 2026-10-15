import { motion, useReducedMotion } from 'framer-motion'

// Trazos del logo (casa tradicional + cerezo + frasco de esmalte), en el orden en que se dibujan.
const GROUND = 'M18 150 L230 150'
const HOUSE = [
  'M102 150 L102 143 L182 143 L182 150',
  'M110 143 L110 104 M174 143 L174 104',
  'M84 102 Q98 103 108 93 L176 93 Q186 103 200 102',
  'M110 104 L174 104',
  'M126 143 L126 110 L158 110 L158 143 M142 110 L142 143 M126 126 L158 126',
  'M124 93 L124 72 M160 93 L160 72',
  'M134 93 L134 78 L150 78 L150 93',
  'M104 72 Q116 72 124 60 L160 60 Q168 72 180 72',
  'M124 72 L160 72',
  'M134 60 Q142 52 150 60',
  'M142 55 L142 44',
]
const TREE = [
  'M58 150 C61 132 54 118 62 102 C68 90 78 82 92 76',
  'M62 112 C52 105 44 102 32 101',
  'M70 90 C72 80 70 72 66 64',
]
const BOTTLE = [
  'M200 121.5 C196 122.5 193.6 125.5 193.2 130.5 L195.4 147 Q195.9 150 199 150 L211 150 Q214.1 150 214.6 147 L216.8 130.5 C216.4 125.5 214 122.5 210 121.5',
  'M199 118 L211 118 L211 121.5 L199 121.5 Z',
  'M202.6 88 Q205 87 207.4 88 L210 118 L200 118 Z',
]
const BLOSSOMS = [
  [30, 98, 4.5], [40, 92, 3.5], [46, 101, 3], [64, 60, 4.5], [74, 64, 3.5], [58, 70, 3],
  [90, 72, 4.5], [86, 62, 3.5], [80, 78, 3], [96, 80, 3], [72, 84, 3.5],
]
const BUDS = [[52, 84, 3.5], [98, 66, 2.5], [36, 108, 2.5], [82, 62, 3]]

export default function LogoArt({ className = '', animate = true, delay = 0 }) {
  const reduce = useReducedMotion()
  const play = animate && !reduce
  const draw = (i, dur = 0.9) =>
    play
      ? {
          initial: { pathLength: 0, opacity: 0 },
          animate: { pathLength: 1, opacity: 1 },
          transition: { pathLength: { delay: delay + i * 0.11, duration: dur, ease: [0.65, 0, 0.35, 1] }, opacity: { delay: delay + i * 0.11, duration: 0.01 } },
        }
      : {}
  const pop = (i) =>
    play
      ? {
          initial: { scale: 0, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { delay: delay + 1.6 + i * 0.06, type: 'spring', stiffness: 260, damping: 14 },
        }
      : {}

  let k = 0
  return (
    <svg viewBox="14 40 222 114" className={className} role="img" aria-label="Logo Nails Lee: casa tradicional, cerezo en flor y frasco de esmalte">
      <g fill="none" stroke="#D1AE6A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <motion.path d={GROUND} {...draw(k++, 1.2)} />
        {HOUSE.map((d) => <motion.path key={d} d={d} {...draw(k++)} />)}
        {TREE.map((d) => <motion.path key={d} d={d} {...draw(k++ - 9)} />)}
        {BOTTLE.map((d) => <motion.path key={d} d={d} {...draw(k++ - 9)} />)}
        <motion.path d="M203.6 92 L202.6 114" strokeWidth="1" opacity="0.5" {...draw(k++ - 9, 0.5)} />
        <g strokeWidth="1">
          {BUDS.map(([cx, cy, r], i) => (
            <motion.circle key={`b${i}`} cx={cx} cy={cy} r={r} style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'view-box' }} {...pop(i + 6)} />
          ))}
        </g>
      </g>
      <g fill="#E9A8B6">
        {BLOSSOMS.map(([cx, cy, r], i) => (
          <motion.circle key={`f${i}`} cx={cx} cy={cy} r={r} style={{ transformOrigin: `${cx}px ${cy}px`, transformBox: 'view-box' }} {...pop(i)} />
        ))}
        <motion.path
          d="M194.4 131 L215.6 131 L214.1 146.6 Q213.8 148.8 211 148.8 L199 148.8 Q196.2 148.8 195.9 146.6 Z"
          opacity="0.8"
          style={{ transformOrigin: '205px 149px', transformBox: 'view-box' }}
          {...(play ? { initial: { scaleY: 0 }, animate: { scaleY: 1 }, transition: { delay: delay + 1.9, duration: 0.9, ease: 'easeOut' } } : {})}
        />
      </g>
    </svg>
  )
}

// Frasco suelto (misma silueta del logo) para la paleta de colores
export function Bottle({ color, className = '' }) {
  return (
    <svg viewBox="188 84 34 70" className={className} aria-hidden="true">
      <path d="M194.4 131 L215.6 131 L214.1 146.6 Q213.8 148.8 211 148.8 L199 148.8 Q196.2 148.8 195.9 146.6 Z" fill={color} />
      <g fill="none" stroke="#D1AE6A" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        {BOTTLE.map((d) => <path key={d} d={d} />)}
        <path d="M203.6 92 L202.6 114" strokeWidth="1" opacity="0.5" />
      </g>
    </svg>
  )
}
