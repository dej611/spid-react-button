const translations = {
  naviga_indietro: {
    it: 'Torna indietro',
    en: 'Go back',
    de: 'Gehen Sie zurück'
  },
  alt_logo_SPID: { it: 'Logo SPID', en: 'Logo SPID', de: 'Logo SPID' },
  scegli_provider_SPID: {
    it: 'Scegli il tuo provider SPID',
    en: 'Choose your SPID provider',
    de: 'Wähle Ihren SPIDProvider'
  },
  annulla_accesso: { it: 'Annulla', en: 'Cancel', de: 'Zurücknehmen' },
  non_hai_SPID: {
    it: 'Non hai SPID?',
    en: "Don't have SPID?",
    de: 'Haben Sie nicht SPID?'
  },
  cosa_SPID: { it: "Cos'è SPID?", en: 'What is SPID?', de: 'Was ist SPID?' },
  entra_con_SPID: {
    it: 'Entra con SPID',
    en: 'Sign in with SPID',
    de: 'Loggen Sie mit SPID'
  },
  scopri_di_piu: {
    it: 'Scopri di più.',
    en: 'Learn more.',
    de: 'Finde mehr heraus.'
  },
  accedi_con_idp: {
    it: 'Accedi a SPID con {0}',
    en: 'Access to SPID with {0}',
    de: 'Zugriff auf SPID mit {0}'
  },
  idp_disabled: {
    it: 'Provider non attivo',
    en: 'Provider not enabled',
    de: 'Provider nicht aktiviert'
  },
  maggiori_info: { it: 'Maggiori info', en: 'More info', de: 'Mehr info' }
} as const;

export type labelKeys = keyof typeof translations;
export type languages = keyof typeof translations[labelKeys];

export type TranslateFn = (
  labelKey: labelKeys,
  placeholderValue?: string
) => string;

let currentLang = 'it';
export const getTranslationFn = (language: languages): TranslateFn => {
  currentLang = language;
  return (labelKey: labelKeys, placeholderValue?: string) => {
    const text = translations[labelKey] && translations[labelKey][currentLang];
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
