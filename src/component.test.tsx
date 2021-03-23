import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { config } from 'react-transition-group';
import { ConfigurationGET, ConfigurationPOST } from '.';
import { providers } from './shared/providers';
import { SPIDReactButton } from './component';
import { Types } from './shared/types';

const defaultURL = '/myLogin/idp={{idp}}';

config.disabled = true;

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

for (const type of types) {
  describe(`[${type.toUpperCase}] Full component`, () => {
    it('should render the button and no modal', () => {
      render(<SPIDReactButton url={defaultURL} type={type} />);

      expect(screen.getByRole('button')).toHaveTextContent('Entra con SPID');
      expect(screen.queryByRole('header')).toBeNull();
    });

    it('should render with the correct language', () => {
      render(<SPIDReactButton url={defaultURL} lang='en' type={type} />);

      expect(screen.getByRole('button')).toHaveTextContent('Sign in with SPID');
    });

    it('should throw if a wrong URL is passed', () => {
      const originalError = console.error;
      console.error = jest.fn();
      expect(() => render(<SPIDReactButton url='idp' type={type} />)).toThrow();

      expect(console.error).toHaveBeenCalled();
      console.error = originalError;
    });

    it('should render the modal on button click', () => {
      render(<SPIDReactButton url={defaultURL} type={type} />);
      fireEvent.click(screen.getByRole('button'));

      expect(screen.getByRole('heading')).toHaveTextContent(
        'Scegli il tuo provider SPID'
      );
    });

    for (const configuration of configurations) {
      it(`[${configuration.method} version] should render all providers`, () => {
        render(
          <SPIDReactButton
            url={defaultURL}
            configuration={configuration}
            type={type}
          />
        );
        fireEvent.click(screen.getByRole('button'));

        expect(getAllProvidersButtons(configuration.method)).toHaveLength(
          providers.length
        );
      });

      it(`[${configuration.method} version] should render all providers`, () => {
        render(
          <SPIDReactButton
            url={defaultURL}
            configuration={configuration}
            type={type}
          />
        );
        fireEvent.click(screen.getByRole('button'));

        expect(getAllProvidersButtons(configuration.method)).toHaveLength(
          providers.length
        );
      });

      it(`[${configuration.method} version] should enable only supported providers`, () => {
        render(
          <SPIDReactButton
            url={defaultURL}
            supported={[providers[0].entityID]}
            configuration={configuration}
            type={type}
          />
        );
        fireEvent.click(screen.getByRole('button'));

        const enabledProviders = getOnlyEnabledProviders(configuration.method);
        expect(enabledProviders).toHaveLength(1);
      });

      it(`[${configuration.method} version] should disable all official providers if any extra is passed`, () => {
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
        fireEvent.click(screen.getByRole('button'));

        const enabledProviders = getOnlyEnabledProviders(configuration.method);
        expect(enabledProviders).toHaveLength(1);

        const disabledProviders = getOnlyDisabledProviders(
          configuration.method
        );
        expect(disabledProviders).toHaveLength(providers.length);
      });
    }
  });
}
