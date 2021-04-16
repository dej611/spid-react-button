import { ProviderRecord } from '..';
import { providers } from './providers';
import {
  ConfigurationGET,
  ConfigurationPOST,
  Protocols,
  RegisteredProviderRecord
} from './types';

// avoid http/https confusion and centralize this URL
export const SPID_URL = 'https://www.spid.gov.it';

export function mergeProviders(
  providers: Readonly<RegisteredProviderRecord>[],
  extraProviders: ProviderRecord[],
  { sorted }: { sorted?: boolean } = {}
): RegisteredProviderRecord[] {
  const mergedList = [
    ...providers.map((idp) => ({
      ...idp,
      active: !extraProviders.length
    })),
    ...extraProviders.map((idp) => ({
      ...idp,
      protocols: idp.protocols ?? ['SAML'],
      active: true
    }))
  ];
  if (!sorted) {
    return mergedList;
  }
  return mergedList.sort((idpA, idpB) =>
    idpA.entityName.localeCompare(idpB.entityName)
  );
}

export function validateURL(url: string | undefined) {
  if (url == null || url.indexOf('{{idp}}') < 0) {
    throw Error('URL parameter must contain the "{{idp}} string');
  }
}

export function isGetMethod(
  configuration: ConfigurationGET | ConfigurationPOST
): configuration is ConfigurationGET {
  return configuration.method.toUpperCase() === 'GET';
}

function dirtyCopy<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}
// Used for exporting
/**
 * Returns a copy of the list of the official providers.
 * @private
 */
export const providersCopy = dirtyCopy(providers) as RegisteredProviderRecord[];

/**
 * Returns a copy of the list of the official providers, already shuffled
 */
export function getShuffledProviders() {
  return providersCopy.sort(() => Math.random() - 0.5);
}

export function isProviderActive(
  idp: RegisteredProviderRecord,
  supported: string[],
  protocol: Protocols,
  extraProviders: ProviderRecord[]
) {
  const isExtraProviders = extraProviders.some(
    ({ entityID }) => entityID === idp.entityID
  );
  return (
    supported.indexOf(idp.entityID) > -1 &&
    idp.protocols.indexOf(protocol) > -1 &&
    (extraProviders.length === 0 || isExtraProviders) &&
    idp.active
  );
}
