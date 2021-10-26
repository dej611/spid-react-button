import type { Languages } from './types';

const translations = {
  naviga_indietro: {
    it: 'Torna indietro',
    en: 'Go back',
    de: 'Gehen Sie zurück',
    es: 'Regresar',
    fr: 'Revenir'
  },
  alt_logo_SPID: {
    it: 'Logo SPID',
    en: 'Logo SPID',
    de: 'Logo SPID',
    es: 'Logo SPID',
    fr: 'Logo SPID'
  },
  scegli_provider_SPID: {
    it: 'Scegli il tuo provider SPID',
    en: 'Choose your SPID provider',
    de: 'Wähle Ihren SPIDProvider',
    es: 'Escoge tu proveedor SPID',
    fr: 'Choisissez votre fournisseur SPID'
  },
  annulla_accesso: {
    it: 'Annulla',
    en: 'Cancel',
    de: 'Zurücknehmen',
    es: 'Cancelar',
    fr: 'Annuler'
  },
  non_hai_SPID: {
    it: 'Non hai SPID?',
    en: "Don't have SPID?",
    de: 'Haben Sie nicht SPID?',
    es: 'No tiene SPID?',
    fr: "Vous ñ'avez pas de SPID?"
  },
  cosa_SPID: {
    it: "Cos'è SPID?",
    en: 'What is SPID?',
    de: 'Was ist SPID?',
    es: 'Qué es SPID?',
    fr: 'Qu’est-ce que SPID?'
  },
  entra_con_SPID: {
    it: 'Entra con SPID',
    en: 'Sign in with SPID',
    de: 'Loggen Sie mit SPID',
    es: 'Ingresa con SPID',
    fr: 'Connectez-vous avec SPID'
  },
  scopri_di_piu: {
    it: 'Scopri di più.',
    en: 'Learn more.',
    de: 'Finde mehr heraus.',
    es: 'Saber más',
    fr: 'En savoir plus.'
  },
  accedi_con_idp: {
    it: 'Accedi a SPID con {0}',
    en: 'Access to SPID with {0}',
    de: 'Zugriff auf SPID mit {0}',
    es: 'Accede a SPID con {0}',
    fr: 'Accès à SPID avec {0}'
  },
  idp_disabled: {
    it: 'Provider non attivo',
    en: 'Provider not enabled',
    de: 'Provider nicht aktiviert',
    es: 'Proveedor no disponible',
    fr: 'Fournisseur non activé'
  },
  maggiori_info: {
    it: 'Maggiori info',
    en: 'More info',
    de: 'Mehr info',
    es: 'Más información',
    fr: 'Plus d’info'
  }
} as const;
const placeholderRegex = /\{\d}/;

export type labelKeys = keyof typeof translations;

export type TranslateFn = (
  labelKey: labelKeys,
  placeholderValue?: string
) => string;

let currentLang = 'it';
export const getTranslationFn = (language: Languages): TranslateFn => {
  currentLang = language;
  return (labelKey: labelKeys, placeholderValue?: string) => {
    const text = translations[labelKey] && translations[labelKey][currentLang];
    if (!text) {
      throw Error(
        `labelKey ${labelKey} non presente per la lingua selezionata ${currentLang}`
      );
    }
    if (placeholderValue != null) {
      return text.replace(placeholderRegex, placeholderValue);
    }
    return text;
  };
};
/**
 * Returns the list of supported languages for the UI
 */
export const getSupportedLanguages = (): Languages[] =>
  Object.keys(Object.values(translations)[0]) as Languages[];
