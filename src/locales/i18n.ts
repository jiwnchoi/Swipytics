// src/i18n.ts
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    supportedLngs: ["en", "ko"],
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
    backend: {
      loadPath: "/Swipytics/locales/{{lng}}/translation.json", // JSON 파일 경로
    },
    react: { useSuspense: true },
  });

export default i18n;
