import { initReactI18next } from "react-i18next";
import i18next from "i18next";
import FetchBackEnd from "i18next-fetch-backend";

const DEFAULT_LANG = "en";
export const AppTranslation = i18next;

export const initializeTranslationService = (lang?: string): void => {
  if (AppTranslation.isInitialized) {
    console.log("AppTranslation is initialized");
  }
  console.log("AppTranslation is being initialized");

  AppTranslation.use(initReactI18next)
    .use(FetchBackEnd)
    .init({
      debug: false,
      lng: lang,
      defaultNS: "translation",
      fallbackLng: DEFAULT_LANG,
      returnEmptyString: false,
      saveMissing: false,
      backend: {
        loadPath: () => {
          const baseUrl = window.location.origin;
          return `${baseUrl}/translations/{{lng}}.json`;
        },
        allowMultiLoading: false,
      },
      react: {
        useSuspense: false,
      },
    });
};

export const detectLanguageFromBrowser = (): string => {
  return navigator.language;
};
