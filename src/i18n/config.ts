import i18n from 'i18next';
import translationEng from './en/translation.json';
import { initReactI18next } from 'react-i18next';


import detector from "i18next-browser-languagedetector";


export const resources = {
  en: {
    translation: translationEng,
  },
} as const;

i18n
  .use(initReactI18next)
  .use(detector)
  .init({
    lng: 'en',
    resources,
    debug: true,
  });

export default i18n;