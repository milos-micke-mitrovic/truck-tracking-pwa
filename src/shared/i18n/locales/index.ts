import { en, type TranslationKeys } from './en';

export type Locale = 'en';

export const locales: Record<Locale, TranslationKeys> = {
  en,
};

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
};

export type { TranslationKeys };
