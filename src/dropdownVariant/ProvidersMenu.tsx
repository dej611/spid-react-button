import React from 'react';

import { isProviderActive, SPID_URL } from '../shared/utils';
import { getIdpButtonSizeClass } from './util';

import type { TranslateFn } from '../shared/i18n';
import type {
  RegisteredProviderRecord,
  SPIDButtonProps
} from '../shared/types';

import styles from './index.module.css';
import { SharedProviderButton } from '../shared/ProviderButton';

type ProvidersDropdownProps = Required<
  Pick<
    SPIDButtonProps,
    | 'url'
    | 'supported'
    | 'mapping'
    | 'size'
    | 'configuration'
    | 'protocol'
    | 'extraProviders'
  >
> &
  Pick<SPIDButtonProps, 'onProviderClicked'> & {
    i18n: TranslateFn;
    providers: RegisteredProviderRecord[];
  };
export const ProvidersDropdown = ({
  configuration,
  supported,
  url,
  mapping,
  i18n,
  size,
  protocol,
  providers,
  extraProviders,
  onProviderClicked
}: ProvidersDropdownProps) => {
  return (
    <div
      className={`${styles.idpButton} ${styles.idpButtonTip} ${
        styles[getIdpButtonSizeClass(size)]
      }`}
    >
      <ul
        className={styles.idpButtonMenu}
        aria-label={i18n('scegli_provider_SPID')}
      >
        {providers.map((idp) => {
          const isActive = isProviderActive(
            idp,
            supported,
            protocol,
            extraProviders
          );

          const buttonClasses = `${styles.idpLogo} ${
            isActive ? '' : styles.disabled
          }`;
          return (
            <li data-idp={idp.entityName} key={idp.entityName}>
              <SharedProviderButton
                idp={idp}
                url={url}
                isActive={isActive}
                mapping={mapping}
                i18n={i18n}
                configuration={configuration}
                onProviderClicked={onProviderClicked}
                className={buttonClasses}
                type='dropdown'
              />
            </li>
          );
        })}
        <li className={styles.supportLink}>
          <a href={SPID_URL} target='_blank noreferrer'>
            {i18n('maggiori_info')}
          </a>
        </li>
        <li className={styles.supportLink}>
          <a href={SPID_URL + '/#registrati'} target='_blank noreferrer'>
            {i18n('non_hai_SPID')}
          </a>
        </li>
      </ul>
    </div>
  );
};
