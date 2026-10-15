# Nails Lee · Página web

Sitio en React con Framer Motion (animaciones), Tailwind CSS (estilos) y Lenis (scroll suave).

## 1. Pon tus datos reales

Abre **`src/config.js`** y cambia:

- `whatsapp`: tu número con código de país, sin `+` ni espacios (ej. `573001234567`).
- `whatsappVisible`: el número como quieres que se lea en la página.
- `instagram`, `direccion`, `ciudad`, `mapa` (enlace de Google Maps, opcional).
- `horario`, `diasCerrados` y `horas` (los horarios que se pueden elegir).
- `servicios`: nombres, descripciones, duración y `precio` (si lo dejas en `null` aparece "Consultar").
- `colores`: los frascos de la sección "Elige tu tono".

Todo lo que está entre [corchetes] es texto de ejemplo.

## 2. Verla en tu computador

Necesitas Node.js 18 o superior.

```bash
npm install
npm run dev
```

Abre la dirección que aparece (normalmente http://localhost:5173).

## 3. Publicarla

```bash
npm run build
```

Se crea la carpeta **`dist/`**. Esa carpeta es la página lista:

- **Netlify** (gratis): entra a app.netlify.com/drop y arrastra la carpeta `dist`.
- **Vercel** (gratis): importa el proyecto desde GitHub; detecta Vite solo.
- **Hosting propio (cPanel)**: sube el contenido de `dist/` a `public_html`.

Si necesitas todo en un solo archivo HTML: `npm run build:single`.

## Cómo funciona la reserva

El formulario no guarda datos en ningún servidor. Arma el mensaje con nombre, servicio, fecha, hora, color y notas, y abre WhatsApp con ese texto listo para enviar. Tú confirmas la cita por WhatsApp.

## Estructura

```
src/
  config.js            ← datos del negocio (lo único que necesitas editar)
  App.jsx              ← orden de las secciones
  components/
    Hero.jsx           ← portada con logo que se dibuja y pétalos
    Services.jsx       ← carta de servicios (toca para agregar a la cita)
    Ritual.jsx         ← la visita paso a paso
    Palette.jsx        ← frascos de colores
    Booking.jsx        ← formulario + vista previa del mensaje
    Visit.jsx          ← dirección, horario, cierre, pie y botón flotante
    LogoArt.jsx        ← el logo en SVG animado
```

Colores y tipografías de marca: `tailwind.config.js`.
