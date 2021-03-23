import React, { useState, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';
import SpidIcoCircleLbUrl from 'spid-smart-button/dist/img/spid-ico-circle-lb.svg';
import SpidIcoCircleBbUrl from 'spid-smart-button/dist/img/spid-ico-circle-bb.svg';

import { getTranslationFn } from '../shared/i18n';
import {
  computeButtonClasses,
  computeButtonTransitionClasses,
  isVisible
} from './utils';

import { DEFAULT_TRANSITION_TIME, ESC_KEY, possibleStates } from './constants';
import {
  mergeProviders,
  validateURL,
  getShuffledProviders,
  noop
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
      className={`spid-button ${customStylingClasses} ${wrapperTransitionClasses}`}
      onClick={() => toggleModal(true)}
    >
      <span
        aria-hidden={!isVisible(modalVisibility)}
        className={`spid-button-icon ${iconButtonClasses}`}
      >
        <img src={buttonImageUrl} alt={i18n('entra_con_SPID')} />
      </span>
      <span className='spid-button-text'>{i18n('entra_con_SPID')}</span>
    </button>
  );
};

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
  supported = providersList.map(({ entityID }) => entityID),
  onProvidersShown = noop,
  onProvidersHidden = noop,
  onProviderClicked = noop
}: SPIDButtonProps) => {
  const [showModal, toggleModal] = useState(false);
  const [state, setState] = useState<ModalState>(possibleStates.INIT);

  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.keyCode === ESC_KEY) {
        toggleModal(false);
      }
    };
    if (showModal) {
      document.addEventListener('keyup', escHandler);
    }
    return () => document.removeEventListener('keyup', escHandler);
  }, [showModal]);

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
    onProvidersShown,
    onProvidersHidden,
    onProviderClicked
  };

  const mergedProviders = mergeProviders(providersList, extraProviders);

  return (
    <div aria-live='polite'>
      <CSSTransition
        in={showModal}
        timeout={DEFAULT_TRANSITION_TIME}
        unmountOnExit
        onEntering={() => setState(possibleStates.ENTERING)}
        onEntered={() => setState(possibleStates.ENTERED)}
        onExiting={() => setState(possibleStates.EXITING)}
        onExited={() => setState(possibleStates.EXITED)}
      >
        <ProvidersModal
          visibility={state}
          i18n={translateFn}
          providers={mergedProviders}
          closeModal={() => toggleModal(false)}
          {...moreModalProps}
        />
      </CSSTransition>

      <LoginButton
        modalVisibility={state}
        i18n={translateFn}
        toggleModal={toggleModal}
        {...moreLoginProps}
      />
    </div>
  );
};
