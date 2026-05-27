'use server';

import { cookies } from 'next/headers';
import en from '../i18n/en.json';
import hu from '../i18n/hu.json';

export type Localization = typeof en;

const locales = [
  { key: 'en', localization: en },
  { key: 'hu', localization: hu },
];

export async function getLocalization(langParam?: string) {
  const cookieStore = await cookies();

  if (langParam) {
    const found = locales.find((item) => item.key === langParam);
    if (found) {
      try {
        cookieStore.set('language', langParam);
      } catch (e) {
        // Ignore error if set during layout/page rendering (read-only context)
      }
      return found.localization as Localization;
    }
  }

  const lang = cookieStore.get('language')?.value || 'en';
  const local = locales.find((item) => item.key === lang) || locales[0];
  return local.localization as Localization;
}
