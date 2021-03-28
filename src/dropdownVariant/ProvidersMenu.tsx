import React from 'react';

import { isGetMethod, isProviderActive } from '../shared/utils';
import { getIdpButtonSizeClass } from './util';

import type { TranslateFn } from '../shared/i18n';
import type {
  RegisteredProviderRecord,
  SPIDButtonProps
} from '../shared/types';

import styles from './index.module.css';

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
      <ul className={styles.idpButtonMenu} aria-labelledby='spid-idp'>
        {providers.map((idp) => {
          const isActive = isProviderActive(
            idp,
            supported,
            protocol,
            extraProviders
          );
          return (
            <li data-idp={idp.entityName} key={idp.entityName}>
              <ProviderButton
                idp={idp}
                url={url}
                isActive={isActive}
                mapping={mapping}
                i18n={i18n}
                configuration={configuration}
                onProviderClicked={onProviderClicked}
              />
            </li>
          );
        })}
        <li className={styles.supportLink}>
          <a id='collegamentospid' href='http://www.spid.gov.it'>
            {i18n('maggiori_info')}
          </a>
        </li>
        <li className={styles.supportLink}>
          <a id='collegamentospid' href='http://www.spid.gov.it/#registrati'>
            {i18n('non_hai_SPID')}
          </a>
        </li>
      </ul>
    </div>
  );
};

type ProviderButtonProps = Required<
  Pick<SPIDButtonProps, 'url' | 'mapping' | 'configuration'>
> &
  Pick<SPIDButtonProps, 'onProviderClicked'> & {
    idp: RegisteredProviderRecord;
    isActive: boolean;
    i18n: TranslateFn;
  };
const ProviderButton = ({
  idp,
  configuration,
  url,
  isActive,
  mapping,
  i18n,
  onProviderClicked
}: ProviderButtonProps) => {
  const entityID =
    idp.entityID in mapping ? mapping[idp.entityID] : idp.entityID;
  const actionURL = url.replace('{{idp}}', encodeURIComponent(entityID));
  const linkTitle = isActive
    ? i18n('accedi_con_idp', idp.entityName)
    : i18n('idp_disabled');

  const loginURL = isActive ? actionURL : undefined;
  if (isGetMethod(configuration)) {
    return (
      <a
        title={linkTitle}
        href={loginURL}
        // @ts-expect-error
        disabled={!isActive}
        className={`${styles.idpLogo} ${isActive ? '' : styles.disabled}`}
        onClick={(e) => onProviderClicked?.(idp, loginURL, e)}
        role='link'
        id={entityID}
      >
        <ProviderButtonContent idp={idp} title={linkTitle} />
      </a>
    );
  }
  const { fieldName, extraFields = {} } = configuration;
  return (
    <form name='spid_idp_access' action={actionURL} method='POST'>
      <button
        className={`${styles.idpLogo} ${isActive ? '' : styles.disabled}`}
        id={entityID}
        name={linkTitle}
        title={linkTitle}
        type='submit'
        onClick={(e) => {
          if (!isActive) {
            e.preventDefault();
          }
          return onProviderClicked?.(idp, loginURL, e);
        }}
      >
        <ProviderButtonContent idp={idp} title={linkTitle} />
      </button>
      <input type='hidden' name={fieldName} value={entityID} />
      {Object.entries(extraFields).map(([inputName, inputValue]) => {
        return (
          <input
            key={inputName}
            type='hidden'
            name={inputName}
            value={inputValue}
          />
        );
      })}
    </form>
  );
};

const ProviderButtonContent = ({
  idp,
  title
}: {
  idp: RegisteredProviderRecord;
  title: string;
}) => {
  if (idp.logo == null) {
    return <span>{idp.entityName}</span>;
  }
  return (
    <span>
      <span className={styles.srOnly}>{title}</span>
      <img src={idp.logo} alt={idp.entityName} title={idp.entityName} />
    </span>
  );
};
