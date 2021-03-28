import { fireEvent, screen, act } from '@testing-library/react';
import { ConfigurationGET, ConfigurationPOST, Types } from '../shared/types';

export const TIMEOUT_VALUE = 2500;
export const defaultURL = '/myLogin/idp={{idp}}';

export const configurations: [ConfigurationGET, ConfigurationPOST] = [
  { method: 'GET' },
  { method: 'POST', fieldName: 'a' }
];

export const types: Types[] = ['modal', 'dropdown'];

function getAllProvidersButtons(
  method: (ConfigurationGET | ConfigurationPOST)['method'],
  criteria = /(Accedi a SPID con|Provider non)/
) {
  return screen.queryAllByRole(method === 'GET' ? 'link' : 'button', {
    name: criteria
  });
}

function getOnlyEnabledProviders(
  method: (ConfigurationGET | ConfigurationPOST)['method']
) {
  return getAllProvidersButtons(method, /Accedi a SPID con/);
}

function getOnlyDisabledProviders(
  method: (ConfigurationGET | ConfigurationPOST)['method']
) {
  return getAllProvidersButtons(method, /Provider non/);
}
// Sometimes it is useful to mute the console for internal warnings/error
// just be sure to check that we aren't hiding other errors with that
export function muteConsoleWithCheck(
  fn: Function,
  messageToFilter: string | RegExp = ''
) {
  const originalError = console.error;
  console.error = jest.fn();

  const result = fn();

  if (messageToFilter) {
    expect(console.error).toHaveBeenCalledWith(
      expect.stringMatching(messageToFilter),
      undefined
    );
  } else {
    expect(console.error).toHaveBeenCalled();
  }
  console.error = originalError;
  return result;
}

export type TestHelper = {
  getMainButton: () => HTMLElement;
  openList: () => void;
  closeList: () => void;
  clickProvider: (provider: HTMLElement) => boolean;
  getEnabledProviders: () => HTMLElement[];
  getDisabledProviders: () => HTMLElement[];
  getProviders: () => HTMLElement[];
};
export function createHelper(
  type: Types,
  method: (ConfigurationGET | ConfigurationPOST)['method']
): TestHelper {
  const buttonRole = type === 'dropdown' ? 'link' : 'button';
  const getMainButton = () =>
    screen.getByRole(buttonRole, { name: /Entra con SPID/ });
  const openList = () => {
    act(() => {
      jest.useFakeTimers();
      fireEvent.click(getMainButton());
      jest.advanceTimersByTime(TIMEOUT_VALUE);
      jest.useRealTimers();
    });
  };
  const closeList = () => {
    jest.useFakeTimers();
    act(() => {
      if (type === 'modal') {
        fireEvent.click(screen.getByRole('button', { name: /Annulla/ }));
      } else {
        fireEvent.click(
          screen.getByRole(buttonRole, { name: /Entra con SPID/ })
        );
      }
      jest.advanceTimersByTime(TIMEOUT_VALUE);
      jest.useRealTimers();
    });
  };
  return {
    getMainButton,
    openList,
    closeList,
    clickProvider: (provider: HTMLElement) => {
      if (method === 'POST') {
        return muteConsoleWithCheck(() => {
          // window.HTMLFormElement.prototype.submit = () => {};
          return fireEvent.click(provider);
        }, 'Error: Not implemented: HTMLFormElement.prototype.submit');
      }
      return fireEvent.click(provider);
    },
    getEnabledProviders: () => getOnlyEnabledProviders(method),
    getDisabledProviders: () => getOnlyDisabledProviders(method),
    getProviders: () => getAllProvidersButtons(method)
  };
}
