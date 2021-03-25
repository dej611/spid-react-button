import { useRef } from 'react';
import { ProviderRecord } from '..';
import { providers } from './providers';
import {
  ConfigurationGET,
  ConfigurationPOST,
  Protocols,
  RegisteredProviderRecord,
  SPIDButtonProps
} from './types';

export function mergeProviders(
  providers: Readonly<RegisteredProviderRecord>[],
  extraProviders: ProviderRecord[]
): RegisteredProviderRecord[] {
  return [
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
export const providersCopy = dirtyCopy(providers);

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

export function useCallbacksRef(
  onShown: SPIDButtonProps['onProvidersShown'],
  onHidden: SPIDButtonProps['onProvidersHidden']
) {
  const onShownRef = useRef(onShown);
  const onHiddenRef = useRef(onHidden);

  if (onShownRef?.current !== onShown) {
    onShownRef.current = onShown;
  }
  if (onHiddenRef?.current !== onHidden) {
    onHiddenRef.current = onHidden;
  }
  return [onShownRef, onHiddenRef];
}
