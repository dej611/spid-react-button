import { SPIDButtonProps } from '../shared/types';
import {
  buttonIconAnimationClass,
  possibleStates,
  sizeMapping,
  emptyClass
} from './constants';
import { ModalState } from './types';

import styles from './index.module.css';

// the css module is fake for the modal, so we can just centralize the renaming logic here
export function getDefinedClasses(klasses: (string | undefined)[]) {
  return klasses
    .map((klass) => (klass && styles[klass]) || emptyClass)
    .join(' ');
}

// do not wrap these results with the getDefinedClasses yet as they will be wrapped later on
// on the components
type classesProps = Pick<
  SPIDButtonProps,
  'theme' | 'corners' | 'size' | 'fluid'
>;
export function computeButtonClasses({
  theme,
  corners,
  size,
  fluid
}: classesProps): string[] {
  if (process.env.NODE_ENV === 'production') {
    if (size === 'xl') {
      console.log(
        'Size "xl" is not supported by SPID React Button with Modal variant'
      );
    }
  }
  return [
    theme,
    corners,
    size ? `size-${sizeMapping[size] ?? 'large'}` : null,
    fluid ? 'fluid' : null
  ]
    .map((type) => (type != null ? `spid-button-${type}` : ''))
    .filter(Boolean);
}

const emptyClasses: string[] = [];
export function computeButtonTransitionClasses({
  type
}: ModalState): { wrapper: string[]; icon: string[] } {
  const inClass = 'in';
  switch (type) {
    case possibleStates.ENTERING.type:
      return {
        wrapper: ['spid-button-transition'],
        icon: [buttonIconAnimationClass, inClass]
      };
    case possibleStates.ENTERED.type:
      return {
        wrapper: emptyClasses,
        icon: [buttonIconAnimationClass, inClass]
      };
    case possibleStates.EXITING.type:
      return {
        wrapper: ['spid-button-reverse-enter-transition'],
        icon: [buttonIconAnimationClass]
      };
    case possibleStates.EXITED.type:
      return { wrapper: emptyClasses, icon: [buttonIconAnimationClass] };
    case possibleStates.INIT.type:
      return { wrapper: emptyClasses, icon: emptyClasses };
  }
}

export function isVisible(modalState: ModalState) {
  return modalState.type.includes('enter');
}
