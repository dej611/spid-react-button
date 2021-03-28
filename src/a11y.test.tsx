import React from 'react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import '@testing-library/jest-dom/extend-expect';
import { SPIDReactButton } from './component';
import {
  types,
  defaultURL,
  TestHelper,
  configurations,
  createHelper
} from './test/utils';

expect.extend(toHaveNoViolations);

describe('A11y tests', () => {
  for (const type of types) {
    describe(`[${type.toUpperCase()}] Full component`, () => {
      describe(`[${type.toUpperCase()}] rendering button`, () => {
        it('should pass basic a11y checks for the button', async () => {
          const { container } = render(
            <SPIDReactButton url={defaultURL} type={type} />
          );

          const result = await axe(container);
          expect(result).toHaveNoViolations();
        });
      });
    });

    for (const configuration of configurations) {
      describe(`[${type.toUpperCase()}] [${
        configuration.method
      }] button list`, () => {
        let helper: TestHelper;

        beforeAll(() => {
          helper = createHelper(type, configuration.method);
        });

        it(`should render all providers`, async () => {
          const { container } = render(
            <SPIDReactButton
              url={defaultURL}
              configuration={configuration}
              type={type}
            />
          );

          helper.openList();

          const result = await axe(container);
          expect(result).toHaveNoViolations();
        });
      });
    }
  }
});
