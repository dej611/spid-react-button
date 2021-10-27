import { getShuffledProviders } from "@dej611/spid-react-button";

import {Protocols, Languages, Sizes, CornerType, ColorTheme, ConfigurationGET, ConfigurationPOST, Types, SPIDButtonProps, getSupportedLanguages} from '@dej611/spid-react-button'

export const defaultURL = "/myLogin/idp={{idp}}";
export const providersList = [...getShuffledProviders()].sort((idpA, idpB) => idpA.entityName.localeCompare(idpB.entityName));
export const languages: Languages[] = getSupportedLanguages()
export const configurations: [ConfigurationGET, ConfigurationPOST] = [{ method: 'GET' }, { method: 'POST', fieldName: 'prova' }]
export const protocols: Protocols[] = ['SAML', 'OIDC']
export const sizes: Sizes[] = ['sm', 'md', 'l']
export const colorThemes: ColorTheme[] = ['positive', 'negative']
export const cornerTypes: CornerType[] = ['rounded', 'sharp']
export const types: Types[] = ['modal', 'dropdown']


export type NoFunctionProps = Required<Omit<SPIDButtonProps, 'onProvidersShown' | 'onProvidersHidden' | 'onProviderClicked'>>

export const initState: NoFunctionProps = {
    lang: languages[0],
    url: defaultURL,
    mapping: {},
    supported: providersList.slice(0, 4).map(({entityID}) => entityID),
    protocol: protocols[0],
    size: sizes[1],
    theme: colorThemes[0],
    fluid: false,
    corners: cornerTypes[0],
    configuration: configurations[0],
    extraProviders: [],
    type: types[0],
    sorted: false
  }