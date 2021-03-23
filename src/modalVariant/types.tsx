import { possibleStates } from '../modalVariant/constants';

export type ModalState = typeof possibleStates[keyof typeof possibleStates];
