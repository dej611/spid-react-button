export type Protocols = 'SAML' | 'OIDC';
export type Languages = 'it' | 'en' | 'de';
export type Sizes = 'sm' | 'md' | 'l' | 'xl';
export type ColorTheme = 'positive' | 'negative';
export type CornerType = 'rounded' | 'sharp';
export type ConfigurationGET = { method: 'GET' };
export type ConfigurationPOST = {
  method: 'POST';
  fieldName: string;
  extraFields?: Record<string, string>;
};

export type Types = 'modal' | 'dropdown';

export interface ProviderRecord {
  entityID: string;
  entityName: string;
  protocols?: Protocols[];
  logo?: string;
}

export type RegisteredProviderRecord = Omit<ProviderRecord, 'protocols'> & {
  protocols: Protocols[];
  active: boolean;
};

// public types: do not use utilities here,
// but just base all the internal types from this extended version
export type SPIDButtonProps = {
  /**
   * The way to present the providers once clicked. The default value is `"modal"`.
   */
  type?: Types;
  /**
   * The language used for the UI. The default value is `"it"`.
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
   * The default value is all the official providerss.
   */
  supported?: ProviderRecord['entityID'][];
  /**
   * The protocol to use for the current instance.
   * Only Providers who support the declared protocol are enabled.
   * The default value is `"SAML"`.
   */
  protocol?: Protocols;
  /**
   * Each Provider button will use this configuration for its button.
   * The default value is `{"method": "GET"}`
   */
  configuration?: ConfigurationGET | ConfigurationPOST;
  /**
   * The size of the button. Options are: `"sm"` (small), `"md"` (medium), `"l"` (large) and `"xl"` (extra large - dropdown only).
   * The modal version does not support the `"xl"` size and will fallback to `"l"` if passed.
   * The default value is `"md"`.
   */
  size?: Sizes;
  /**
   * The theme used for the button:
   * * "positive" has a blue background with white text,
   * * "negative" has a white background and blue text.
   * The default value is `"positive"`.
   */
  theme?: ColorTheme;
  /**
   * This controls the width of the button: when fluid it will fill all the available space.
   * The default value is `false`.
   */
  fluid?: boolean;
  /**
   * The type of corner for the button: rounded or sharp.
   * The default value is `"rounded"`.
   */
  corners?: CornerType;
  /**
   * This is called when the providers are shown on the screen (fully loaded)
   */
  onProvidersShown?: () => void;
  /**
   * This is called when the providers are hidden on the screen (fully hidden)
   */
  onProvidersHidden?: () => void;
  /**
   * This is called when a user clicks on a provider button.
   * @param providerEntry The full entry of the provider clicked
   */
  onProviderClicked?: (providerEntry: ProviderRecord) => void;
  /**
   * Used for testing. Do not use in production
   */
  extraProviders?: ProviderRecord[];
};
