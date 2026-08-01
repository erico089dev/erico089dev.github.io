import es from './es.json';
import en from './en.json';
import ca from './ca.json';

export const locales = ['es', 'en', 'ca'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

// Diccionarios por idioma (ES/EN/CAT).
const dictionaries: Record<Locale, Record<string, unknown>> = {
  es,
  en,
  ca,
};

/** Deriva el idioma del primer segmento de la URL (/es/… → 'es'). */
export function getLocaleFromUrl(url: URL): Locale {
  const [, maybeLocale] = url.pathname.split('/');
  return (locales as readonly string[]).includes(maybeLocale)
    ? (maybeLocale as Locale)
    : defaultLocale;
}

/** Resuelve una clave anidada ('a.b.c') dentro de un diccionario. */
function resolve(dict: Record<string, unknown>, key: string): unknown {
  return key.split('.').reduce<unknown>((acc, part) => {
    if (acc && typeof acc === 'object' && part in acc) {
      return (acc as Record<string, unknown>)[part];
    }
    return undefined;
  }, dict);
}

/** Devuelve una función t('a.b.c') que resuelve claves anidadas string del diccionario. */
export function useTranslations(locale: Locale) {
  const dict = dictionaries[locale] ?? dictionaries[defaultLocale];
  return function t(key: string): string {
    const value = resolve(dict, key);
    return typeof value === 'string' ? value : key;
  };
}

/**
 * Como `t()` pero devuelve el valor crudo (array/objeto) sin forzar a string.
 * Para listas de copy (stack, stats, cards…). Tipado genérico con fallback opcional.
 */
export function useRawTranslations(locale: Locale) {
  const dict = dictionaries[locale] ?? dictionaries[defaultLocale];
  return function tRaw<T = unknown>(key: string, fallback?: T): T {
    const value = resolve(dict, key);
    return (value === undefined ? (fallback as T) : (value as T));
  };
}
