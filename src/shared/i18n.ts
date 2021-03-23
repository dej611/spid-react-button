const translations = {
  it: {
    naviga_indietro: 'Torna indietro',
    alt_logo_SPID: 'Logo SPID',
    scegli_provider_SPID: 'Scegli il tuo provider SPID',
    annulla_accesso: 'Annulla',
    non_hai_SPID: 'Non hai SPID?',
    cosa_SPID: "Cos'è SPID?",
    entra_con_SPID: 'Entra con SPID',
    scopri_di_piu: 'Scopri di più.',
    accedi_con_idp: 'Accedi a SPID con {0}',
    idp_disabled: 'Provider non attivo',
    maggiori_info: 'Maggiori info'
  },
  en: {
    naviga_indietro: 'Go back',
    alt_logo_SPID: 'SPID logo',
    scegli_provider_SPID: 'Choose your SPID provider',
    annulla_accesso: 'Cancel',
    non_hai_SPID: "Don't have SPID?",
    cosa_SPID: 'What is SPID?',
    entra_con_SPID: 'Sign in with SPID',
    scopri_di_piu: 'Learn more.',
    accedi_con_idp: 'Access to SPID with {0}',
    idp_disabled: 'Provider not enabled',
    maggiori_info: 'More info'
  },
  de: {
    naviga_indietro: 'Gehen Sie zurück',
    alt_logo_SPID: 'SPID Logo',
    scegli_provider_SPID: 'Wähle Ihren SPIDProvider',
    annulla_accesso: 'Zurücknehmen',
    non_hai_SPID: 'Haben Sie nicht SPID?',
    cosa_SPID: 'Was ist SPID?',
    entra_con_SPID: 'Loggen Sie mit SPID',
    scopri_di_piu: 'Finde mehr heraus.',
    accedi_con_idp: 'Zugriff auf SPID mit {0}',
    idp_disabled: 'Provider nicht aktiviert',
    maggiori_info: 'Mehr info'
  }
} as const;

export type languages = keyof typeof translations;
export type labelKeys = keyof typeof translations[languages];

export type TranslateFn = (
  labelKey: labelKeys,
  placeholderValue?: string
) => string;

let currentLang = 'it';
export const getTranslationFn = (language: languages): TranslateFn => {
  currentLang = language;
  return (labelKey: labelKeys, placeholderValue?: string) => {
    const text = translations[currentLang]?.[labelKey];
    if (!text) {
      throw Error(
        `labelKey ${labelKey} non presente per la lingua selezionata ${currentLang}`
      );
    }
    const placeholderRegex = /\{\d}/;
    if (placeholderValue != null) {
      return text.replace(placeholderRegex, placeholderValue);
    }
    return text;
  };
};
