# spid-react-button

> Pulsante SSO per SPID in React

[![NPM](https://img.shields.io/npm/v/@dej611/spid-react-button.svg)](https://www.npmjs.com/package/@dej611/spid-react-button) ![Gzipped size](https://badgen.net/bundlephobia/minzip/@dej611/spid-react-button) ![Dependencies count](https://badgen.net/bundlephobia/dependency-count/@dej611/spid-react-button) ![Treeshaking supported](https://badgen.net/bundlephobia/tree-shaking/@dej611/spid-react-button)

## Install

```bash
npm install --save @dej611/spid-react-button typeface-titillium-web
```

The package depends on the Titillium font.  
An alternative to installing the local package is to use it via CDN, adding this line to your css file:
```css
@import url(https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700,900);
```

## Usage

```jsx
import React, { Component } from 'react'
// Import it via package or in your CSS file via the CDN @import
import 'typeface-titillium-web';
import {SPIDReactButton} from '@dej611/spid-react-button'

import '@dej611/spid-react-button/dist/index.css'


function Example(){
  return <SPIDReactButton url="/myLogin/{{idp}}"/>
}
```

# API


## Components

### SPIDReactButton

**Type**: `Component`  

**Props**: `SPIDButtonProps`  

The main component for the button.  
Use this component with the `type` prop to select the version you prefer.


The SPIDButtonProps object contains the following properties:

#### configuration

**Possible values**: `{            method : "GET"        } | {            extraFields ?: Record<string | string>, fieldName : string, method : "POST"        }`  

**Type**: `ConfigurationGET | ConfigurationPOST`  

**Required**: No  

**Default value**: `{"method": "GET"}`


Each Provider button will use this configuration for its button.  
The default value is `{"method": "GET"}`


#### corners

**Possible values**: `"rounded" | "sharp"`  

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

**Possible values**: `"it" | "en" | "de"`  

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

**Possible values**: `"SAML" | "OIDC"`  

**Type**: `Protocols`  

**Required**: No  

**Default value**: `"SAML"`


The protocol to use for the current instance.  
Only Providers who support the declared protocol are enabled.  
The default value is `"SAML"`.


#### size

**Possible values**: `"sm" | "md" | "l" | "xl"`  

**Type**: `Sizes`  

**Required**: No  

**Default value**: `"md"`


The size of the button. Options are: `"sm"` (small), `"md"` (medium), `"l"` (large) and `"xl"` (extra large - dropdown only).  
The modal version does not support the `"xl"` size and will fallback to `"l"` if passed.  
The default value is `"md"`.


#### supported

**Possible values**: `string[]`  

**Type**: `ProviderRecord["entityID"][]`  

**Required**: No  

**Default value**: All providers


The list of entityID supported by the button instance.  
The default value is all the official providers.


#### theme

**Possible values**: `"positive" | "negative"`  

**Type**: `ColorTheme`  

**Required**: No  

**Default value**: `"positive"`


The theme used for the button:  
* "positive" has a blue background with white text,  
* "negative" has a white background and blue text.  
The default value is `"positive"`.


#### type

**Possible values**: `"modal" | "dropdown"`  

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



## License

EUPL 1.2 © [dej611](https://github.com/dej611)
