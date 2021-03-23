// export the list of official providers
export {
  getShuffledProviders,
  providersCopy as providers
} from './shared/utils';

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
