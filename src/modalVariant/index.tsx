import React, { useState, useEffect } from 'react';
import SpidIcoCircleLbUrl from './/../shared/svgs/spid-ico-circle-lb.svg';
import SpidIcoCircleBbUrl from './/../shared/svgs/spid-ico-circle-lb.svg';

import { getTranslationFn } from '../shared/i18n';
import {
  computeButtonClasses,
  computeButtonTransitionClasses,
  isVisible,
  getDefinedClasses
} from './utils';

import { DEFAULT_TRANSITION_TIME, possibleStates } from './constants';
import {
  mergeProviders,
  validateURL,
  getShuffledProviders
} from '../shared/utils';
import { ProvidersModal } from './ProvidersModal';

import type { TranslateFn } from '../shared/i18n';
import type { SPIDButtonProps } from '../shared/types';
import type { ModalState } from './types';

const providersList = getShuffledProviders();

const LoginButton = ({
  i18n,
  theme,
  corners,
  fluid,
  size,
  toggleModal,
  modalVisibility
}: Pick<SPIDButtonProps, 'theme' | 'corners' | 'fluid' | 'size'> & {
  i18n: TranslateFn;
  modalVisibility: ModalState;
  toggleModal: (prevState: boolean) => void;
}) => {
  const customStylingClasses = computeButtonClasses({
    theme,
    corners,
    size,
    fluid
  });
  const {
    wrapper: wrapperTransitionClasses,
    icon: iconButtonClasses
  } = computeButtonTransitionClasses(modalVisibility);
  const buttonImageUrl =
    theme === 'negative' ? SpidIcoCircleLbUrl : SpidIcoCircleBbUrl;
  return (
    <button
      className={getDefinedClasses([
        'spid-button',
        ...customStylingClasses,
        ...wrapperTransitionClasses
      ])}
      onClick={() => toggleModal(true)}
    >
      <span
        aria-hidden={!isVisible(modalVisibility)}
        className={getDefinedClasses([
          'spid-button-icon',
          ...iconButtonClasses
        ])}
      >
        <img
          src={buttonImageUrl}
          alt='Login logo'
          className={getDefinedClasses(['spid-button-image-fix'])}
        />
      </span>
      <span className={getDefinedClasses(['spid-button-text'])}>
        {i18n('entra_con_SPID')}
      </span>
    </button>
  );
};

/**
 * The specific component button with the modal.
 * Use this component when you want to minimize the footprint in your project.
 * It accepts the same props as the main component. The `type` prop is ignored in this case.
 *
 * @param props
 */
export const SPIDReactButton = ({
  lang = 'it',
  extraProviders = [],
  corners = 'rounded',
  fluid = true,
  size = 'md',
  theme = 'positive',
  configuration = { method: 'GET' },
  mapping = {},
  protocol = 'SAML',
  url,
  sorted = false,
  supported = providersList.map(({ entityID }) => entityID),
  onProvidersShown,
  onProvidersHidden,
  onProviderClicked
}: SPIDButtonProps) => {
  const [state, setState] = useState<ModalState>(possibleStates.INIT);

  useEffect(() => {
    if (state.type === possibleStates.ENTERING.type) {
      if (onProvidersShown) {
        onProvidersShown();
      }
    }
    if (state.type === possibleStates.EXITING.type) {
      if (onProvidersHidden) {
        onProvidersHidden();
      }
    }
  }, [state]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (state.type === possibleStates.ENTERING.type) {
      timer = setTimeout(
        () => setState(possibleStates.ENTERED),
        DEFAULT_TRANSITION_TIME
      );
    }
    if (state.type === possibleStates.EXITING.type) {
      timer = setTimeout(
        () => setState(possibleStates.EXITED),
        DEFAULT_TRANSITION_TIME
      );
    }
    return () => {
      if (timer != null) {
        clearTimeout(timer);
      }
    };
  }, [state]);

  validateURL(url);

  const translateFn = getTranslationFn(lang);

  const moreLoginProps = {
    theme,
    corners,
    fluid,
    size
  };

  const moreModalProps = {
    extraProviders,
    configuration,
    url,
    mapping,
    protocol,
    supported,
    onProviderClicked
  };

  const mergedProviders = mergeProviders(providersList, extraProviders, {
    sorted
  });

  return (
    <div aria-live='polite'>
      <ProvidersModal
        visibility={state}
        i18n={translateFn}
        providers={mergedProviders}
        closeModal={() => setState(possibleStates.EXITING)}
        {...moreModalProps}
      />
      <LoginButton
        modalVisibility={state}
        i18n={translateFn}
        toggleModal={(open: boolean) =>
          setState(open ? possibleStates.ENTERING : possibleStates.EXITING)
        }
        {...moreLoginProps}
      />
    </div>
  );
};
