import React from 'react';

import { SPIDReactButton as SPIDReactButtonModal } from './modalVariant';
import { SPIDReactButton as SPIDReactButtonDropdown } from './dropdownVariant';
import type { SPIDButtonProps } from './shared/types';

export const SPIDReactButton = ({
  type = 'modal',
  ...props
}: SPIDButtonProps) => {
  if (type === 'modal') {
    return <SPIDReactButtonModal {...props} />;
  }
  return <SPIDReactButtonDropdown {...props} />;
};
