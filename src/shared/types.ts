/**
 * The protocol to use for the current instance.
 * Only Providers who support the declared protocol are enabled.
 */
export type Protocols = 'SAML' | 'OIDC';
/**
 * The language used for the UI.
 */
export type Languages = 'it' | 'en' | 'de';
/**
 * The size of the button. Options are: `"sm"` (small), `"md"` (medium), `"l"` (large) and `"xl"` (extra large - dropdown only).
 * The modal version does not support the `"xl"` size and will fallback to `"l"` if passed.
 */
export type Sizes = 'sm' | 'md' | 'l' | 'xl';
/**
 * The theme used for the button:
 * * "positive" has a blue background with white text,
 * * "negative" has a white background and blue text.
 */
export type ColorTheme = 'positive' | 'negative';

/**
 * The type of corner for the button: rounded or sharp.
 */
export type CornerType = 'rounded' | 'sharp';
/**
 * Each Provider button will use this configuration for its button.
 * This is the specific GET type.
 */
export type ConfigurationGET = { method: 'GET' };
/**
 * Each Provider button will use this configuration for its button.
 * This is the specific POST type
 */
export type ConfigurationPOST = {
  method: 'POST';
  fieldName: string;
  extraFields?: Record<string, string>;
};

/**
 * The way to present the providers once clicked.
 */
export type Types = 'modal' | 'dropdown';
/**
 * The object format of a Identity Provider object.
 */
export interface ProviderRecord {
  entityID: string;
  entityName: string;
  protocols?: Protocols[];
  logo?: string;
}
/**
 * Format used internally for Providers, more strict compare to the one above
 * @private
 */
export type RegisteredProviderRecord = Omit<ProviderRecord, 'protocols'> & {
  protocols: Protocols[];
  active: boolean;
};

// public types: do not use utilities here,
// but just base all the internal types from this extended version
export type SPIDButtonProps = {
  /**
   * The way to present the providers once clicked. The default value is `"modal"`.
   * @defaultValue `"modal"`
   */
  type?: Types;
  /**
   * The language used for the UI. The default value is `"it"`.
   * @defaultValue `"it"`
   */
  lang?: Languages;
  /**
   * The URL used by the buttons.
   * It can be either absolute or relative.
   * It must contains the `"{{idp}}"` string in it, which will be replaced by the entityID of each provider
   * (unless specified otherwise with the `mapping` prop - see below).
   * This props is *mandatory*.
   */
  url: string;
  /**
   * An object containing the mapping for the providers.
   * This is useful when a Service Provider identifies the IDP with a different string than the entityID
   */
  mapping?: Record<string, string>;
  /**
   * The list of entityID supported by the button instance.
   * The default value is all the official providers.
   * @defaultValue All providers
   */
  supported?: ProviderRecord['entityID'][];
  /**
   * It forces an ascending order (A->Z) of the providers, based on the entityName string.
   * Note that this will sort with no distictions between official and extraProviders in the list.
   * @defaultValue `false`
   */
  sorted?: boolean;
  /**
   * The protocol to use for the current instance.
   * Only Providers who support the declared protocol are enabled.
   * The default value is `"SAML"`.
   * @defaultValue `"SAML"`
   */
  protocol?: Protocols;
  /**
   * Each Provider button will use this configuration for its button.
   * The default value is `{"method": "GET"}`
   * @defaultValue `{"method": "GET"}`
   */
  configuration?: ConfigurationGET | ConfigurationPOST;
  /**
   * The size of the button. Options are: `"sm"` (small), `"md"` (medium), `"l"` (large) and `"xl"` (extra large - dropdown only).
   * The modal version does not support the `"xl"` size and will fallback to `"l"` if passed.
   * The default value is `"md"`.
   * @defaultValue `"md"`
   */
  size?: Sizes;
  /**
   * The theme used for the button:
   * * "positive" has a blue background with white text,
   * * "negative" has a white background and blue text.
   * The default value is `"positive"`.
   * @defaultValue `"positive"`
   */
  theme?: ColorTheme;
  /**
   * This controls the width of the button: when fluid it will fill all the available space.
   * It applies only to the modal version.
   * The default value is `false`.
   * @defaultValue `false`
   */
  fluid?: boolean;
  /**
   * The type of corner for the button: rounded or sharp.
   * The default value is `"rounded"`.
   * @defaultValue `"rounded"`
   */
  corners?: CornerType;
  /**
   * This is called when the providers are shown on the screen (as soon as the animation starts)
   */
  onProvidersShown?: () => void;
  /**
   * This is called when the providers are hidden on the screen (as soon as the animation starts)
   */
  onProvidersHidden?: () => void;
  /**
   * This is called when a user clicks on a provider button.
   * @param providerEntry The full entry of the provider clicked is passed, together with the event
   * @param loginURL The final URL for the specific Identity Provider. It returns undefined if the button is disabled
   * @param event React original MouseEvent
   */
  onProviderClicked?: (
    providerEntry: ProviderRecord,
    loginURL: string | undefined,
    event:
      | React.MouseEvent<HTMLAnchorElement, MouseEvent>
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  /**
   * Used for testing. *Do not use in production*
   */
  extraProviders?: ProviderRecord[];
};
