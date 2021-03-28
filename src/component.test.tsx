import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { providers } from './shared/providers';
import { SPIDReactButton } from './component';
import {
  types,
  configurations,
  createHelper,
  defaultURL,
  TestHelper,
  muteConsoleWithCheck
} from './test/utils';

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
