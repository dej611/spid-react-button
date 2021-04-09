import React from 'react';
import { FocusOn } from 'react-focus-on';

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
import { isProviderActive, SPID_URL } from '../shared/utils';
import { isVisible, getDefinedClasses } from './utils';
import { TranslateFn } from '../shared/i18n';

import { SharedProviderButton } from '../shared/ProviderButton';

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
        buttonClose: fadeInLeftClass
      };
    case possibleStates.EXITING.type:
      return {
        panel: panelAnimClass,
        buttonManIcon: logoAnimationOutClass
      };
    case possibleStates.ENTERED.type:
    case possibleStates.EXITED.type:
    case possibleStates.INIT.type: {
      return {};
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
    <FocusOn
      onClickOutside={closeModal}
      onEscapeKey={closeModal}
      enabled={isVisible(visibility)}
    >
      <section
        className={getDefinedClasses(['spid-enter-container'])}
        hidden={!isVisible(visibility)}
        aria-modal='true'
      >
        <div className={getDefinedClasses(['spid-enter'])}>
          <section
            className={`${getDefinedClasses([
              'spid-button-panel',
              'spid-button-panel-select',
              panelClasses
            ])}`}
            aria-label={i18n('scegli_provider_SPID')}
            tabIndex={0}
          >
            <header className={getDefinedClasses(['spid-button-header'])}>
              <div className={getDefinedClasses(['spid-button-panel-back'])}>
                <div
                  className={`${getDefinedClasses([
                    'spid-button-logo',
                    buttonLogoClasses
                  ])}`}
                >
                  <ButtonImage
                    url={SpidLogoUrl}
                    altText={i18n('alt_logo_SPID')}
                  />
                </div>
                <div
                  className={`${getDefinedClasses([
                    'spid-button-close-button',
                    'spid-button-fade-out-right',
                    buttonCloseClasses
                  ])}`}
                >
                  <button
                    tabIndex={0}
                    className={`${getDefinedClasses([
                      'spid-button-panel-close-button',
                      'spid-button-navigable'
                    ])}`}
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
            <div className={getDefinedClasses(['spid-button-panel-content'])}>
              <img
                className={`${getDefinedClasses([
                  'spid-button-little-man-icon',
                  buttonManIconClasses
                ])}`}
                src={SpidLogoAnimationBlackUrl}
                alt={i18n('entra_con_SPID')}
              />
              <div
                className={getDefinedClasses([
                  'spid-button-panel-content-center'
                ])}
              >
                <h1
                  className={`${getDefinedClasses([
                    'spid-enter-title-page',
                    'spid-button-fade-in-bottom',
                    'spid-button-fade-out-bottom'
                  ])}`}
                >
                  {i18n('scegli_provider_SPID')}
                </h1>
                <div className={getDefinedClasses(['spid-idp-list'])}>
                  {providers.map((idp, i) => {
                    const isActive = isProviderActive(
                      idp,
                      supported,
                      protocol,
                      extraProviders
                    );
                    const {
                      classNames,
                      style
                    }: {
                      classNames: string;
                      style?: Record<string, string>;
                    } =
                      visibility.type === possibleStates.ENTERING.type
                        ? {
                            classNames: 'spid-button-idp-fade-in',
                            style: {
                              animationDelay: `${
                                BUTTON_DELAY_TIME + DELAY_STEP * (i + 1)
                              }s`
                            }
                          }
                        : { classNames: emptyClass };

                    return (
                      <span
                        key={idp.entityID}
                        className={`${getDefinedClasses([
                          'spid-button-idp',
                          classNames
                        ])}`}
                        style={style}
                      >
                        <SharedProviderButton
                          idp={idp}
                          mapping={mapping}
                          url={url}
                          isActive={isActive}
                          i18n={i18n}
                          configuration={configuration}
                          onProviderClicked={onProviderClicked}
                          className={getDefinedClasses([
                            'spid-button-idp-button'
                          ])}
                          type='modal'
                          firstFocus={i === 0}
                        />
                      </span>
                    );
                  })}
                </div>
                <div className={getDefinedClasses(['spid-non-hai-spid'])}>
                  {i18n('non_hai_SPID')}{' '}
                  <a
                    href={SPID_URL + '/richiedi-spid'}
                    target='_blank noreferrer'
                  >
                    {i18n('scopri_di_piu')}
                  </a>
                </div>
              </div>
              <div className={getDefinedClasses(['spid-foot-btn'])}>
                <button
                  className={getDefinedClasses(['spid-cancel-access-button'])}
                  onClick={closeModal}
                >
                  {i18n('annulla_accesso')}
                </button>
              </div>
            </div>
          </section>
        </div>
      </section>
    </FocusOn>
  );
};
