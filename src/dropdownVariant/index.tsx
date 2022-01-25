import React, { useState, useEffect } from 'react';
import { FocusOn } from 'react-focus-on';

import { getTranslationFn } from '../shared/i18n';
import { SPIDButtonProps } from '../shared/types';
import {
  validateURL,
  getShuffledProviders,
  mergeProviders
} from '../shared/utils';

import styles from './index.module.css';
import { ProvidersDropdown } from './ProvidersMenu';
import { getButtonSizeClass } from './util';

const SpidIcoCircleBbUrl = new URL(
  '../shared/svgs/spid-ico-circle-bb.svg',
  import.meta.url
).pathname;
const SpidIcoCircleLbUrl = new URL(
  '../shared/svgs/spid-ico-circle-lb.svg',
  import.meta.url
).pathname;

const shuffledProviders = getShuffledProviders();
/**
 * The specific component button with the dropdown.
 * Use this component when you want to minimize the footprint in your project.
 * It accepts the same props as the main component. The `type` prop is ignored in this case.
 *
 * @param props
 */
export const SPIDReactButton = ({
  url,
  lang = 'it',
  supported = shuffledProviders.map(({ entityID }) => entityID),
  mapping = {},
  size = 'md',
  configuration = { method: 'GET' },
  theme = 'positive',
  protocol = 'SAML',
  sorted = false,
  extraProviders = [],
  onProviderClicked,
  onProvidersHidden,
  onProvidersShown
}: SPIDButtonProps) => {
  const [openDropdown, toggleDropdown] = useState<boolean | undefined>(
    undefined
  );

  const i18n = getTranslationFn(lang);

  useEffect(() => {
    if (openDropdown && onProvidersShown) {
      onProvidersShown();
    }
    if (openDropdown === false && onProvidersHidden) {
      onProvidersHidden();
    }
  }, [openDropdown]);

  validateURL(url);

  const mergedProviders = mergeProviders(shuffledProviders, extraProviders, {
    sorted
  });

  const buttonImageUrl =
    theme === 'negative' ? SpidIcoCircleLbUrl : SpidIcoCircleBbUrl;

  return (
    <FocusOn
      onClickOutside={() => toggleDropdown(false)}
      onEscapeKey={() => toggleDropdown(false)}
      scrollLock={false}
      enabled={openDropdown}
    >
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
            <img src={buttonImageUrl} alt='Login logo' />
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
    </FocusOn>
  );
};
