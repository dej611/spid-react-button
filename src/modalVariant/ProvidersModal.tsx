import React from 'react';
import SpidLogoAnimationBlackUrl from '/../shared/svgs/spid-logo-animation-black.svg';
import SpidLogoUrl from '/../shared/svgs/spid-logo.svg';
import CloseSvgUrl from '/../shared/svgs/close.svg';

import type {
  RegisteredProviderRecord,
  SPIDButtonProps
} from '../shared/types';

import {
  BUTTON_DELAY_TIME,
  DELAY_STEP,
  emptyClass,
  logoAnimationOutClass,
  panelAnimClass,
  possibleStates
} from './constants';
import type { ModalState } from './types';
import { isProviderActive } from '../shared/utils';
import { isVisible } from './utils';
import { ProviderButton } from './ProviderButton';
import { TranslateFn } from '../shared/i18n';

import styles from './index.module.css';

const ButtonImage = ({ url, altText }: { url: string; altText: string }) => (
  <img aria-hidden='true' src={url} alt={altText} style={{ float: 'left' }} />
);

function getModalClasses({ type }: ModalState) {
  const fadeInLeftClass = `spid-button-fade-in-left`;
  switch (type) {
    case possibleStates.ENTERING.type:
      return {
        panel: panelAnimClass,
        buttonLogo: fadeInLeftClass,
        buttonClose: fadeInLeftClass,
        buttonManIcon: emptyClass
      };
    case possibleStates.EXITING.type:
      return {
        panel: panelAnimClass,
        buttonLogo: emptyClass,
        buttonClose: emptyClass,
        buttonManIcon: logoAnimationOutClass
      };
    case possibleStates.ENTERED.type:
    case possibleStates.EXITED.type:
    case possibleStates.INIT.type: {
      return {
        panel: emptyClass,
        buttonLogo: emptyClass,
        buttonClose: emptyClass,
        buttonManIcon: emptyClass
      };
    }
  }
}

type ProvidersModalProps = Required<
  Pick<
    SPIDButtonProps,
    | 'supported'
    | 'protocol'
    | 'url'
    | 'mapping'
    | 'configuration'
    | 'extraProviders'
  >
> &
  Pick<SPIDButtonProps, 'onProviderClicked'> & {
    i18n: TranslateFn;
    visibility: ModalState;
    providers: RegisteredProviderRecord[];
    closeModal: () => void;
  };
export const ProvidersModal = ({
  i18n,
  mapping,
  visibility,
  extraProviders = [],
  supported,
  providers,
  protocol,
  url,
  closeModal,
  configuration,
  onProviderClicked
}: ProvidersModalProps) => {
  const {
    panel: panelClasses,
    buttonClose: buttonCloseClasses,
    buttonLogo: buttonLogoClasses,
    buttonManIcon: buttonManIconClasses
  } = getModalClasses(visibility);

  return (
    <section
      className={styles['spid-enter-container']}
      hidden={!isVisible(visibility)}
    >
      <div className={styles['spid-enter']}>
        <section
          className={`${styles['spid-button-panel']} ${
            styles['spid-button-panel-select'] ?? ''
          } ${styles[panelClasses] ?? ''}`}
          aria-label={i18n('scegli_provider_SPID')}
          tabIndex={0}
        >
          <header className={styles['spid-button-header']}>
            <div className={styles['spid-button-panel-back']}>
              <div
                className={`${styles['spid-button-logo']} ${
                  styles[buttonLogoClasses] ?? ''
                }`}
              >
                <ButtonImage
                  url={SpidLogoUrl}
                  altText={i18n('alt_logo_SPID')}
                />
              </div>
              <div
                className={`${styles['spid-button-close-button']} ${
                  styles['spid-button-fade-out-right']
                } ${styles[buttonCloseClasses] ?? ''}`}
              >
                <button
                  tabIndex={0}
                  className={`${styles['spid-button-panel-close-button']} ${styles['spid-button-navigable']}`}
                  aria-label={i18n('naviga_indietro')}
                  onClick={closeModal}
                >
                  <ButtonImage
                    url={CloseSvgUrl}
                    altText={i18n('naviga_indietro')}
                  />
                </button>
              </div>
            </div>
          </header>
          <div className={styles['spid-button-panel-content']}>
            <img
              className={`${styles['spid-button-little-man-icon']} ${
                styles[buttonManIconClasses] ?? ''
              }`}
              src={SpidLogoAnimationBlackUrl}
              alt={i18n('entra_con_SPID')}
            />
            <div className={styles['spid-button-panel-content-center']}>
              <h1
                className={`${styles['spid-enter-title-page']} ${styles['spid-button-fade-in-bottom']} ${styles['spid-button-fade-out-bottom']}`}
              >
                {i18n('scegli_provider_SPID')}
              </h1>
              <div className={styles['spid-idp-list']}>
                {providers.map((idp, i) => {
                  const isActive = isProviderActive(
                    idp,
                    supported,
                    protocol,
                    extraProviders
                  );
                  const entityID =
                    idp.entityID in mapping
                      ? mapping[idp.entityID]
                      : idp.entityID;
                  return (
                    <ProviderButton
                      key={entityID}
                      idp={idp}
                      entityID={entityID}
                      url={url}
                      isActive={isActive}
                      i18n={i18n}
                      visibility={visibility}
                      delay={BUTTON_DELAY_TIME + DELAY_STEP * (i + 1)}
                      configuration={configuration}
                      onProviderClicked={onProviderClicked}
                    />
                  );
                })}
              </div>
              <div className={styles['spid-non-hai-spid']}>
                {i18n('non_hai_SPID')}{' '}
                <a
                  href='https://www.spid.gov.it/richiedi-spid'
                  target='_blank noreferrer'
                >
                  {i18n('scopri_di_piu')}
                </a>
              </div>
            </div>
            <div className={styles['spid-foot-btn']}>
              <button
                className={styles['spid-cancel-access-button']}
                onClick={closeModal}
              >
                {i18n('annulla_accesso')}
              </button>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};
