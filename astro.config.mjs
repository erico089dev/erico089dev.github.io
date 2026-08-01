// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // User site → se sirve en la raíz (sin `base`).
  site: 'https://erico089dev.github.io',

  integrations: [sitemap()],

  // Trilingüe. Se maqueta ES primero; EN/CAT llegan después sin tocar componentes.
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'ca'],
    routing: {
      // Todas las rutas con prefijo de idioma (/es/…, /en/…, /ca/…).
      prefixDefaultLocale: true,
    },
  },

  // La raíz redirige al idioma por defecto. Además, el proyecto "inbox" se renombró
  // a "triagebox" (nombre del repo real); mantenemos redirects de las URLs antiguas.
  redirects: {
    '/': '/es/',
    '/es/inbox': '/es/triagebox',
    '/en/inbox': '/en/triagebox',
    '/ca/inbox': '/ca/triagebox',
  },
});
