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
    .map((type) => (type != null ? `spid-button-${type}` : null))
    .filter<string>((name: string | null): name is string => name != null);
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

export function getDefinedClasses(
  klasses: string[],
  styles: Record<string, string>
) {
  return klasses
    ?.map((klass) => styles[klass])
    .filter(Boolean)
    .join(' ');
}
