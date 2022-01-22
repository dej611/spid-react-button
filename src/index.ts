// export the list of official providers
export {
  getShuffledProviders,
  providersCopy as providers
} from './shared/utils';

// export a helper to get the list of supported languages
export { getSupportedLanguages } from './shared/i18n';

// export the types
export type {
  SPIDButtonProps,
  Protocols,
  ProviderRecord,
  Languages,
  Sizes,
  ColorTheme,
  CornerType,
  ConfigurationGET,
  ConfigurationPOST,
  Types
} from './shared/types';

export { SPIDReactButton } from './component';
export { SPIDReactButton as SPIDReactButtonModal } from './modalVariant';
export { SPIDReactButton as SPIDReactButtonDropdown } from './dropdownVariant';
