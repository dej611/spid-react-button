import { sizeMapping } from './constants';

import type { Sizes } from '../shared/types';

export const getButtonSizeClass = (size: Sizes | 'xl') => {
  return sizeMapping[size];
};

export const getIdpButtonSizeClass = (size: Sizes | 'xl') => {
  const currentSize = sizeMapping[size];
  return 'idpButton' + currentSize[0].toUpperCase() + currentSize.slice(1);
};
