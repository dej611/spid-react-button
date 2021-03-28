import { SPIDButtonProps } from '../shared/types';
import {
  buttonIconAnimationClass,
  possibleStates,
  sizeMapping
} from './constants';
import { ModalState } from './types';

type classesProps = Pick<
  SPIDButtonProps,
  'theme' | 'corners' | 'size' | 'fluid'
>;
export function computeButtonClasses({
  theme,
  corners,
  size,
  fluid
}: classesProps) {
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
    .map((type) => (type != null ? `spid-button-${type}` : null))
    .filter(Boolean)
    .join(' ');
}

export function computeButtonTransitionClasses({ type }: ModalState) {
  switch (type) {
    case possibleStates.ENTERING.type:
      return {
        wrapper: 'spid-button-transition',
        icon: `${buttonIconAnimationClass} in`
      };
    case possibleStates.ENTERED.type:
      return { wrapper: '', icon: `${buttonIconAnimationClass} in` };
    case possibleStates.EXITING.type:
      return {
        wrapper: 'spid-button-reverse-enter-transition',
        icon: buttonIconAnimationClass
      };
    case possibleStates.EXITED.type:
      return { wrapper: '', icon: buttonIconAnimationClass };
    case possibleStates.INIT.type:
      return { wrapper: '', icon: '' };
  }
}

export function isVisible(modalState: ModalState) {
  return modalState.type.includes('enter');
}
