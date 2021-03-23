import { possibleStates } from './constants';
import { computeButtonClasses, isVisible } from './utils';

describe('Modal Utils', () => {
  describe('computeButtonClasses', () => {
    it('should fallback to large if `xl` is passed', () => {
      // @ts-expect-error
      expect(computeButtonClasses({ size: 'xl' })).toEqual(
        'spid-button-size-large'
      );
    });

    it('should return no class for fluid falsy', () => {
      // @ts-expect-error
      expect(computeButtonClasses({ fluid: false })).toEqual('');
    });
  });

  describe('isVisible', () => {
    it('should return false for all non entering states', () => {
      for (const state of [
        possibleStates.INIT,
        possibleStates.EXITED,
        possibleStates.EXITING
      ]) {
        expect(isVisible(state)).toEqual(false);
      }
    });
  });
});
