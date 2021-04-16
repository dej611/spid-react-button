import { ProviderRecord, RegisteredProviderRecord } from './types';
import { isProviderActive, mergeProviders, validateURL } from './utils';

describe('Shared utils', () => {
  describe('validateURL', () => {
    it('should pass if the {{idp}} string is within the URL', () => {
      expect(() => validateURL('{{idp}}')).not.toThrowError();
      expect(() => validateURL('/myLogin/{{idp}}')).not.toThrowError();
      expect(() => validateURL('www.myidp.it/{{idp}}')).not.toThrowError();
    });

    it('should throw if the URL does not contain the {{idp}} string', () => {
      expect(() => validateURL('')).toThrowError();
      expect(() => validateURL('idp')).toThrowError();
      expect(() => validateURL('{{idp')).toThrowError();
    });
  });

  describe('isProviderActive', () => {
    it('should return true if all checks are right', () => {
      expect(
        isProviderActive(
          { entityID: 'a', entityName: 'A', protocols: ['SAML'], active: true },
          ['a'],
          'SAML',
          []
        )
      ).toEqual(true);
    });
    it('should return false if not supported', () => {
      expect(
        isProviderActive(
          { entityID: 'a', entityName: 'A', protocols: ['SAML'], active: true },
          [],
          'SAML',
          []
        )
      ).toEqual(false);
    });
    it('should return false if has an unsupported protocol', () => {
      expect(
        isProviderActive(
          { entityID: 'a', entityName: 'A', protocols: ['OIDC'], active: true },
          ['a'],
          'SAML',
          []
        )
      ).toEqual(false);
    });
    it('should return false if there are any extraProviders', () => {
      expect(
        isProviderActive(
          { entityID: 'a', entityName: 'A', protocols: ['OIDC'], active: true },
          ['a'],
          'SAML',
          [{ entityID: 'b', entityName: 'B' }]
        )
      ).toEqual(false);
    });
    it('should return false if the record is not active for some reason', () => {
      expect(
        isProviderActive(
          {
            entityID: 'a',
            entityName: 'A',
            protocols: ['OIDC'],
            active: false
          },
          ['a'],
          'SAML',
          []
        )
      ).toEqual(false);
    });
  });

  describe('mergeProviders', () => {
    it('should always prepend the official providers', () => {
      const officialIdps: RegisteredProviderRecord[] = [
        {
          entityID: 'a',
          entityName: 'A',
          protocols: ['OIDC'],
          active: true
        }
      ];
      const extraIdps: ProviderRecord[] = [{ entityID: 'b', entityName: 'B' }];
      const merged = mergeProviders(officialIdps, extraIdps);
      merged.slice(0, officialIdps.length).forEach(({ entityID }, i) => {
        expect(entityID).toEqual(officialIdps[i].entityID);
      });
    });

    it('should always disable the official providers if any extra one is passed', () => {
      const officialIdps: RegisteredProviderRecord[] = [
        {
          entityID: 'a',
          entityName: 'A',
          protocols: ['OIDC'],
          active: true
        }
      ];
      const extraIdps: ProviderRecord[] = [{ entityID: 'b', entityName: 'B' }];
      const merged = mergeProviders(officialIdps, extraIdps);
      for (const { active } of merged.slice(0, officialIdps.length)) {
        expect(active).toEqual(false);
      }
    });

    it('should sort providers by name when requested', () => {
      const officialIdps: RegisteredProviderRecord[] = [
        {
          entityID: 'a',
          entityName: 'A',
          protocols: ['OIDC'],
          active: true
        },
        {
          entityID: 'c',
          entityName: 'C',
          protocols: ['OIDC'],
          active: true
        }
      ];
      const extraIdps: ProviderRecord[] = [{ entityID: 'b', entityName: 'B' }];
      const merged = mergeProviders(officialIdps, extraIdps, { sorted: true });
      expect(merged.map(({ entityName }) => entityName)).toEqual([
        'A',
        'B',
        'C'
      ]);
    });
  });
});
