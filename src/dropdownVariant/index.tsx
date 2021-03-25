import React, { useState, useEffect } from 'react';

import SpidIcoCircleBbUrl from 'spid-smart-button/dist/img/spid-ico-circle-bb.svg';
import SpidIcoCircleLbUrl from 'spid-smart-button/dist/img/spid-ico-circle-lb.svg';
import { getTranslationFn } from '../shared/i18n';
import { SPIDButtonProps } from '../shared/types';
import {
  validateURL,
  getShuffledProviders,
  mergeProviders,
  useCallbacksRef
} from '../shared/utils';

import styles from './index.module.css';
import { ProvidersDropdown } from './ProvidersMenu';
import { getButtonSizeClass } from './util';

const shuffledProviders = getShuffledProviders();

export const SPIDReactButton = ({
  url,
  lang = 'it',
  supported = shuffledProviders.map(({ entityID }) => entityID),
  mapping = {},
  size = 'md',
  configuration = { method: 'GET' },
  theme = 'positive',
  protocol = 'SAML',
  extraProviders = [],
  onProviderClicked,
  onProvidersHidden,
  onProvidersShown
}: SPIDButtonProps) => {
  const [openDropdown, toggleDropdown] = useState<boolean | undefined>(
    undefined
  );
  const [onShownRef, onHiddenRef] = useCallbacksRef(
    onProvidersShown,
    onProvidersHidden
  );

  const i18n = getTranslationFn(lang);

  useEffect(() => {
    if (openDropdown && onShownRef?.current) {
      onShownRef.current();
    }
    if (openDropdown === false && onHiddenRef?.current) {
      onHiddenRef.current();
    }
  }, [openDropdown]);

  validateURL(url);

  const mergedProviders = mergeProviders(shuffledProviders, extraProviders);

  const buttonImageUrl =
    theme === 'negative' ? SpidIcoCircleLbUrl : SpidIcoCircleBbUrl;

  return (
    <div className={styles.container}>
      <a
        href='#'
        className={`${styles.button} ${styles[getButtonSizeClass(size)]} ${
          theme === 'positive' ? styles.theme : styles.themeNegative
        }`}
        aria-haspopup='true'
        aria-expanded={openDropdown}
        onClick={() => toggleDropdown(!openDropdown)}
      >
        <span className={styles.buttonIcon}>
          <img src={buttonImageUrl} alt={i18n('entra_con_SPID')} />
        </span>
        <span className={styles.buttonText}>{i18n('entra_con_SPID')}</span>
      </a>
      {openDropdown && (
        <ProvidersDropdown
          supported={supported}
          url={url}
          mapping={mapping}
          i18n={i18n}
          size={size}
          configuration={configuration}
          protocol={protocol}
          providers={mergedProviders}
          extraProviders={extraProviders}
          onProviderClicked={onProviderClicked}
        />
      )}
    </div>
  );
};
