import { getTranslationFn } from './i18n';

describe('i18n', () => {
  it('should throw if an unknown language or key is passed', () => {
    // Wrong language
    // @ts-expect-error
    expect(() => getTranslationFn('kk')('naviga_indietro')).toThrowError();
    // Wrong key
    // @ts-expect-error
    expect(() => getTranslationFn('it')('blah_blah')).toThrowError();
  });
});
