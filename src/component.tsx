import React from 'react';

import { SPIDReactButton as SPIDReactButtonModal } from './modalVariant';
import { SPIDReactButton as SPIDReactButtonDropdown } from './dropdownVariant';
import type { SPIDButtonProps } from './shared/types';
/**
 * The main component for the button.
 * Use this component with the `type` prop to select the version you prefer.
 * @param props
 */
export const SPIDReactButton = ({
  type = 'modal',
  ...props
}: SPIDButtonProps) => {
  if (type === 'modal') {
    return <SPIDReactButtonModal {...props} />;
  }
  return <SPIDReactButtonDropdown {...props} />;
};
