
## Components

### SPIDReactButton

**Type**: `Component`  

**Props**: `SPIDButtonProps`  

The main component for the button.  
Use this component with the `type` prop to select the version you prefer.


The SPIDButtonProps object contains the following properties:

#### configuration

**Type**: `ConfigurationGET | ConfigurationPOST`  

**Required**: No  

**Default value**: `{"method": "GET"}`


Each Provider button will use this configuration for its button.  
The default value is `{"method": "GET"}`


#### corners

**Type**: `CornerType`  

**Required**: No  

**Default value**: `"rounded"`


The type of corner for the button: rounded or sharp.  
The default value is `"rounded"`.


#### extraProviders

**Type**: `ProviderRecord[]`  

**Required**: No  



Used for testing. *Do not use in production*


#### fluid

**Type**: `boolean`  

**Required**: No  

**Default value**: `false`


This controls the width of the button: when fluid it will fill all the available space.  
It applies only to the modal version.  
The default value is `false`.


#### lang

**Type**: `Languages`  

**Required**: No  

**Default value**: `"it"`


The language used for the UI. The default value is `"it"`.


#### mapping

**Type**: `Record<string | string>`  

**Required**: No  



An object containing the mapping for the providers.  
This is useful when a Service Provider identifies the IDP with a different string than the entityID


#### onProviderClicked

**Type**: `(
providerEntry : ProviderRecord,
loginURL : string | undefined,
event : React.MouseEvent<HTMLAnchorElement | MouseEvent> | React.MouseEvent<HTMLButtonElement | MouseEvent>) => void`  

**Required**: No  



This is called when a user clicks on a provider button.


#### onProvidersHidden

**Type**: `() => void`  

**Required**: No  



This is called when the providers are hidden on the screen (as soon as the animation starts)


#### onProvidersShown

**Type**: `() => void`  

**Required**: No  



This is called when the providers are shown on the screen (as soon as the animation starts)


#### protocol

**Type**: `Protocols`  

**Required**: No  

**Default value**: `"SAML"`


The protocol to use for the current instance.  
Only Providers who support the declared protocol are enabled.  
The default value is `"SAML"`.


#### size

**Type**: `Sizes`  

**Required**: No  

**Default value**: `"md"`


The size of the button. Options are: `"sm"` (small), `"md"` (medium), `"l"` (large) and `"xl"` (extra large - dropdown only).  
The modal version does not support the `"xl"` size and will fallback to `"l"` if passed.  
The default value is `"md"`.


#### supported

**Type**: `ProviderRecord["entityID"][]`  

**Required**: No  

**Default value**: All providers


The list of entityID supported by the button instance.  
The default value is all the official providers.


#### theme

**Type**: `ColorTheme`  

**Required**: No  

**Default value**: `"positive"`


The theme used for the button:  
* "positive" has a blue background with white text,  
* "negative" has a white background and blue text.  
The default value is `"positive"`.


#### type

**Type**: `Types`  

**Required**: No  

**Default value**: `"modal"`


The way to present the providers once clicked. The default value is `"modal"`.


#### url

**Type**: `string`  

**Required**: Yes  



The URL used by the buttons.  
It can be either absolute or relative.  
It must contains the `"{{idp}}"` string in it, which will be replaced by the entityID of each provider  
(unless specified otherwise with the `mapping` prop - see below).  
This props is *mandatory*.





___

### SPIDReactButtonDropdown

**Type**: `Component`  

**Props**: `SPIDButtonProps`  

The specific component button with the dropdown.  
Use this component when you want to minimize the footprint in your project.  
It accepts the same props as the main component. The `type` prop is ignored in this case.







___

### SPIDReactButtonModal

**Type**: `Component`  

**Props**: `SPIDButtonProps`  

The specific component button with the modal.  
Use this component when you want to minimize the footprint in your project.  
It accepts the same props as the main component. The `type` prop is ignored in this case.






___


## Types

**ColorTheme**: `"positive" | "negative"`  

The theme used for the button:  
* "positive" has a blue background with white text,  
* "negative" has a white background and blue text.

___

**ConfigurationGET**: `{method: "GET"}`  

Each Provider button will use this configuration for its button.  
This is the specific GET type.

___

**ConfigurationPOST**: `{extraFields: Record<string | string>, fieldName: string, method: "POST"}`  

Each Provider button will use this configuration for its button.  
This is the specific POST type

___

**CornerType**: `"rounded" | "sharp"`  

The type of corner for the button: rounded or sharp.

___

**Languages**: `"it" | "en" | "de"`  

The language used for the UI.

___

**Protocols**: `"SAML" | "OIDC"`  

The protocol to use for the current instance.\n  
Only Providers who support the declared protocol are enabled.

___

**Sizes**: `"sm" | "md" | "l" | "xl"`  

The size of the button. Options are: `"sm"` (small), `"md"` (medium), `"l"` (large) and `"xl"` (extra large - dropdown only).\n  
The modal version does not support the `"xl"` size and will fallback to `"l"` if passed.

___

**Types**: `"modal" | "dropdown"`  

The way to present the providers once clicked.


___


**ProviderRecord**

The object format of a Identity Provider object.

* entityID: `string`  


* entityName: `string`  


* logo: `string` - Optional  


* protocols: `Protocols[]` - Optional  




___


## Utilites

#### getShuffledProviders


`getShuffledProviders() => RegisteredProviderRecord[]`

Returns a copy of the list of the official providers, already shuffled

