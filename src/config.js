// ─────────────────────────────────────────────────────────────
//  DATOS DEL NEGOCIO — edita solo este archivo
//  Todo lo que está entre [corchetes] es un texto de ejemplo
//  que debes reemplazar por la información real.
// ─────────────────────────────────────────────────────────────

export const negocio = {
  nombre: 'Nails Lee',
  // Número de WhatsApp con código de país, sin +, espacios ni guiones.
  // Ejemplo Colombia: 573001234567
  whatsapp: '573204291507',
  whatsappVisible: '+57 320 429 1507',
  instagram: 'nailslee', // usuario sin @
  direccion: 'Bucaramanga',
  ciudad: 'Santander, Colombia',
  // Enlace de Google Maps (opcional). Déjalo vacío '' si no lo tienes.
  mapa: '',
  horario: [
    { dias: 'Lunes a viernes', horas: '9:00 a. m. – 7:00 p. m.' },
    { dias: 'Sábados', horas: '9:00 a. m. – 5:00 p. m.' },
    { dias: 'Domingos', horas: 'Cerrado' },
  ],
}

// Días en que NO se atiende (0 = domingo, 1 = lunes … 6 = sábado)
export const diasCerrados = [0]

// Horarios que la clienta puede elegir en el formulario
export const horas = ['9:00 a. m.', '10:30 a. m.', '12:00 m.', '2:00 p. m.', '3:30 p. m.', '5:00 p. m.']

// Servicios. Si `precio` es null se muestra "Consultar".
// Ejemplo de precio: precio: '$45.000'
export const servicios = [
  {
    grupo: 'Manos',
    items: [
      { id: 'mani-trad', nombre: 'Manicure tradicional', detalle: 'Limado, cutícula, hidratación y esmalte clásico.', duracion: '45 min', precio: null },
      { id: 'semi', nombre: 'Semipermanente', detalle: 'Brillo que dura hasta tres semanas, sin perder la uña natural.', duracion: '60 min', precio: null },
      { id: 'acrilico', nombre: 'Uñas acrílicas', detalle: 'Largo y forma a tu medida: almendra, cuadrada, coffin o stiletto.', duracion: '2 h', precio: null },
      { id: 'polygel', nombre: 'Polygel', detalle: 'Extensión ligera y flexible, ideal si es tu primera vez.', duracion: '1 h 45 min', precio: null },
    ],
  },
  {
    grupo: 'Pies',
    items: [
      { id: 'pedi-trad', nombre: 'Pedicure tradicional', detalle: 'Limpieza, exfoliación suave y esmalte.', duracion: '50 min', precio: null },
      { id: 'pedi-spa', nombre: 'Pedicure spa', detalle: 'Baño tibio, exfoliación, mascarilla y masaje.', duracion: '75 min', precio: null },
    ],
  },
  {
    grupo: 'Detalles',
    items: [
      { id: 'nail-art', nombre: 'Nail art', detalle: 'Diseños a mano alzada, francés, foil o piedras. Por uña o completo.', duracion: 'Según diseño', precio: null },
      { id: 'retiro', nombre: 'Retiro y cuidado', detalle: 'Retiro seguro de acrílico o semipermanente y tratamiento fortalecedor.', duracion: '30 min', precio: null },
    ],
  },
]

// Colores de temporada que se muestran como frascos en la página
export const colores = [
  { nombre: 'Sakura', hex: '#E9A8B6' },
  { nombre: 'Vino', hex: '#5A1A2B' },
  { nombre: 'Nácar', hex: '#EFE3D6' },
  { nombre: 'Arena', hex: '#C9A58A' },
  { nombre: 'Matcha', hex: '#A3B18A' },
  { nombre: 'Laca roja', hex: '#A3222D' },
  { nombre: 'Noche', hex: '#2B2530' },
]

// Fotos de trabajos (carpeta public/trabajos). Para agregar más,
// copia la foto ahí y súmala a esta lista.
export const trabajos = Array.from({ length: 14 }, (_, i) => `/trabajos/trabajo-${String(i + 1).padStart(2, '0')}.jpeg`)

export const waLink =(texto = '') =>
  `https://wa.me/${negocio.whatsapp}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`
