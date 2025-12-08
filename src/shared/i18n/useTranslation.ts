import { useCallback } from 'react';
import { useI18nContext } from './context';
import type { TranslationKeys } from './locales';

type NestedKeyOf<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeyOf<T[K]>}` | K
          : K
        : never;
    }[keyof T]
  : never;

type TranslationKey = NestedKeyOf<TranslationKeys>;

interface InterpolationValues {
  [key: string]: string | number;
}

function getNestedValue(obj: unknown, path: string): string {
  const keys = path.split('.');
  let result: unknown = obj;

  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = (result as Record<string, unknown>)[key];
    } else {
      return path; // Return the key if not found
    }
  }

  return typeof result === 'string' ? result : path;
}

function interpolate(template: string, values: InterpolationValues): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    return values[key]?.toString() ?? `{{${key}}}`;
  });
}

export function useTranslation() {
  const { locale, setLocale, t } = useI18nContext();

  const translate = useCallback(
    (key: TranslationKey, values?: InterpolationValues): string => {
      const translation = getNestedValue(t, key);

      if (values) {
        return interpolate(translation, values);
      }

      return translation;
    },
    [t]
  );

  return {
    t: translate,
    locale,
    setLocale,
    translations: t,
  };
}
