# Medios reales (paso 8)

Aquí van las **capturas, vídeo y audios de voz** reales. Los componentes ya están preparados: en cuanto
pongas un archivo aquí y añadas su ruta en `src/i18n/es.json`, aparece en la web (y desaparece el
placeholder). No hace falta tocar código.

## Dónde va cada cosa
```
public/media/
  acg/     capturas de ACG (dashboard, ACGManager, un Reel) + audios de voz clonada
  duna/    capturas de Duna (PWA móvil, chat, tareas/calendario)
  inbox/   (opcional) capturas del flujo de tickets
  cumple/  capturas de la web de cumpleaños (portada, escena, final con confeti)
```

> **Avatar de la portada:** ahora se usa tu foto de perfil de GitHub, guardada en `public/eric.png`.
> Si quieres otra foto, sustituye ese archivo (cuadrada, ~400×400px o más) y listo.

## Cómo enchufarlo (sin tocar componentes)

### Capturas (galería)
En `src/i18n/es.json`, cada item de galería acepta un campo `src` (y `alt` opcional). Ejemplo en
`acg.gallery.items`:
```json
{ "caption": "Dashboard de control del pipeline", "src": "/media/acg/dashboard.png",
  "alt": "Panel de control de ACG con el estado de los servicios" }
```
Sin `src` → se muestra el hueco "captura pendiente".

### Audios de voz (solo ACG)
En `acg.voice.samples`, añade `src` a cada muestra:
```json
{ "label": "Narración · voz A", "meta": "XTTS v2 · clonada · ES", "src": "/media/acg/voz-a.mp3" }
```
Sin `src` → botón "pendiente" deshabilitado.

> Nota: el reproductor de audio actual es visual (onda + botón). Cuando pongas `src`, el `<audio>` se
> incluye; si quieres reproducción real al pulsar, avísame y añado el handler de play/pausa (JS mínimo).

## Formatos recomendados
- **Capturas:** PNG o JPG, ancho ~1200–1600px. (Si más adelante quieres optimización WebP/AVIF
  automática, se migra a `astro:assets` con `<Image>`.)
- **Audio:** MP3 o M4A, cortos (5–15 s), con la etiqueta de voz/modelo en `meta`.
- **Vídeo (opcional):** MP4 (H.264) + poster; se integra con `<video preload="none">`.
