import { createI18n } from 'vue-i18n';
import { en } from './languages/en.ts';
import { de } from './languages/de.ts';
import { es } from './languages/es.ts';
import { ja } from './languages/ja.ts';

const messages = {
  en: en,
  de: de,
  es: es,
  ja: ja
};

export const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages
});