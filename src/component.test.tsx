import React from 'react';
import { render, fireEvent, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { ConfigurationGET, ConfigurationPOST } from '.';
import { providers } from './shared/providers';
import { SPIDReactButton } from './component';
import { Types } from './shared/types';

jest.useFakeTimers();
const TIMEOUT_VALUE = 2500;
const defaultURL = '/myLogin/idp={{idp}}';

const configurations: [ConfigurationGET, ConfigurationPOST] = [
  { method: 'GET' },
  { method: 'POST', fieldName: 'a' }
];

const types: Types[] = ['modal', 'dropdown'];

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
function muteConsoleWithCheck(
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

type TestHelper = {
  getMainButton: () => HTMLElement;
  openList: () => void;
  closeList: () => void;
  clickProvider: (provider: HTMLElement) => boolean;
  getEnabledProviders: () => HTMLElement[];
  getDisabledProviders: () => HTMLElement[];
  getProviders: () => HTMLElement[];
};
function createHelper(
  type: Types,
  method: (ConfigurationGET | ConfigurationPOST)['method']
): TestHelper {
  const buttonRole = type === 'dropdown' ? 'link' : 'button';
  const getMainButton = () =>
    screen.getByRole(buttonRole, { name: /Entra con SPID/ });
  const openList = () => {
    act(() => {
      fireEvent.click(getMainButton());
      jest.advanceTimersByTime(TIMEOUT_VALUE);
    });
  };
  const closeList = () => {
    act(() => {
      if (type === 'modal') {
        fireEvent.click(screen.getByRole('button', { name: /Annulla/ }));
      } else {
        fireEvent.click(
          screen.getByRole(buttonRole, { name: /Entra con SPID/ })
        );
      }
      jest.advanceTimersByTime(TIMEOUT_VALUE);
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

for (const type of types) {
  describe(`[${type.toUpperCase()}] Full component`, () => {
    describe(`[${type.toUpperCase()}] rendering button`, () => {
      const buttonRole = type === 'dropdown' ? 'link' : 'button';
      it('should render the button and no modal', () => {
        render(<SPIDReactButton url={defaultURL} type={type} />);

        expect(screen.getByRole(buttonRole)).toHaveTextContent(
          'Entra con SPID'
        );
        expect(screen.queryByRole('header')).toBeNull();
      });

      it('should render with the correct language', () => {
        render(<SPIDReactButton url={defaultURL} lang='en' type={type} />);

        expect(screen.getByRole(buttonRole)).toHaveTextContent(
          'Sign in with SPID'
        );
      });

      it('should throw if a wrong URL is passed', () => {
        muteConsoleWithCheck(() => {
          expect(() =>
            render(<SPIDReactButton url='idp' type={type} />)
          ).toThrow();
        });
      });

      if (type === 'modal') {
        it('should render the modal on button click', () => {
          render(<SPIDReactButton url={defaultURL} type={type} />);
          fireEvent.click(screen.getByRole(buttonRole));

          expect(screen.getByRole('heading')).toHaveTextContent(
            'Scegli il tuo provider SPID'
          );
        });
      }
    });

    for (const configuration of configurations) {
      describe(`[${type.toUpperCase()}] [${
        configuration.method
      }] button`, () => {
        let helper: TestHelper;

        beforeAll(() => {
          helper = createHelper(type, configuration.method);
        });

        it(`should render all providers`, () => {
          render(
            <SPIDReactButton
              url={defaultURL}
              configuration={configuration}
              type={type}
            />
          );

          helper.openList();

          expect(helper.getProviders()).toHaveLength(providers.length);
        });

        it(`should render all providers`, () => {
          render(
            <SPIDReactButton
              url={defaultURL}
              configuration={configuration}
              type={type}
            />
          );
          helper.openList();

          expect(helper.getProviders()).toHaveLength(providers.length);
        });

        it(`should enable only supported providers`, () => {
          render(
            <SPIDReactButton
              url={defaultURL}
              supported={[providers[0].entityID]}
              configuration={configuration}
              type={type}
            />
          );
          helper.openList();

          expect(helper.getEnabledProviders()).toHaveLength(1);
        });

        it(`should disable all official providers if any extra is passed`, () => {
          render(
            <SPIDReactButton
              url={defaultURL}
              configuration={configuration}
              extraProviders={[{ entityID: 'a', entityName: 'A' }]}
              // Enable the custom one in the supported list
              supported={[providers[0].entityID, 'a']}
              type={type}
            />
          );
          helper.openList();

          expect(helper.getEnabledProviders()).toHaveLength(1);

          expect(helper.getDisabledProviders()).toHaveLength(providers.length);
        });

        it(`should call all the handlers passed`, () => {
          const onShowCallback = jest.fn();
          const onHideCallback = jest.fn();
          const onClickCallback = jest.fn();
          render(
            <SPIDReactButton
              url={defaultURL}
              configuration={configuration}
              type={type}
              onProvidersShown={onShowCallback}
              onProvidersHidden={onHideCallback}
              onProviderClicked={onClickCallback}
            />
          );
          helper.openList();

          const [firstProviderAvailable] = helper.getEnabledProviders();

          helper.clickProvider(firstProviderAvailable);

          helper.closeList();
          const providerID = firstProviderAvailable.id?.trim();
          const provider = providers.find(
            ({ entityID }) => providerID === entityID
          );

          expect(onShowCallback).toHaveBeenCalledTimes(1);
          expect(onHideCallback).toHaveBeenCalledTimes(1);
          expect(onClickCallback).toHaveBeenCalledTimes(1);
          expect(onClickCallback).toHaveBeenCalledWith(
            provider,
            expect.stringContaining('/myLogin/idp'),
            // React mouse event
            expect.anything()
          );
        });

        it('should have the custom id for each clicked IDP', () => {
          const onClickCallback = jest.fn();
          const customMapping = providers.reduce((memo, { entityID }, i) => {
            memo[entityID] = i;
            return memo;
          }, {});
          render(
            <SPIDReactButton
              url={defaultURL}
              configuration={configuration}
              type={type}
              onProviderClicked={onClickCallback}
              mapping={customMapping}
            />
          );
          helper.openList();

          const [firstProviderAvailable] = helper.getEnabledProviders();

          helper.clickProvider(firstProviderAvailable);

          helper.closeList();
          const indexID = firstProviderAvailable.id?.trim();
          const provider = providers[indexID]!;

          console.log({ indexID, provider });
          expect(onClickCallback).toHaveBeenCalledWith(
            provider,
            '/myLogin/idp=' +
              encodeURIComponent(customMapping[provider.entityID]),
            // React mouse event
            expect.anything()
          );
        });
      });
    }
  });
}
