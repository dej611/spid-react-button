import React, { useState, useEffect } from 'react';
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
  useCallbacksRef
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
  onProvidersShown,
  onProvidersHidden,
  onProviderClicked
}: SPIDButtonProps) => {
  const [state, setState] = useState<ModalState>(possibleStates.INIT);
  const [onShownRef, onHiddenRef] = useCallbacksRef(
    onProvidersShown,
    onProvidersHidden
  );

  useEffect(() => {
    const escHandler = (event: KeyboardEvent) => {
      if (event.keyCode === ESC_KEY) {
        setState(possibleStates.EXITING);
      }
    };
    if (isVisible(state)) {
      document.addEventListener('keyup', escHandler);
    }
    return () => document.removeEventListener('keyup', escHandler);
  }, [state]);

  useEffect(() => {
    if (state.type === possibleStates.ENTERED.type) {
      if (onShownRef.current) {
        onShownRef.current();
      }
    }
    if (state.type === possibleStates.EXITED.type) {
      if (onHiddenRef.current) {
        onHiddenRef.current();
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

  const mergedProviders = mergeProviders(providersList, extraProviders);

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
