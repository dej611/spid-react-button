import React from 'react';

import { isGetMethod } from './utils';

import type { TranslateFn } from './i18n';
import type { RegisteredProviderRecord, SPIDButtonProps, Types } from './types';

import styles from './ProviderButton.module.css';

type ProviderButtonProps = Required<
  Pick<SPIDButtonProps, 'url' | 'mapping' | 'configuration' | 'type'>
> &
  Pick<SPIDButtonProps, 'onProviderClicked'> & {
    idp: RegisteredProviderRecord;
    isActive: boolean;
    i18n: TranslateFn;
    className: string;
  };
export const SharedProviderButton = ({
  idp,
  configuration,
  url,
  isActive,
  mapping,
  i18n,
  onProviderClicked,
  className,
  type
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
        className={type === 'modal' ? '' : className}
        onClick={(e) =>
          onProviderClicked && onProviderClicked(idp, loginURL, e)
        }
        role='link'
        id={entityID}
      >
        <ProviderButtonContent idp={idp} title={linkTitle} type={type} />
      </a>
    );
  }
  return (
    <form name='spid_idp_access' action={actionURL} method='POST'>
      <button
        className={className}
        id={entityID}
        name={linkTitle}
        title={linkTitle}
        type='submit'
        onClick={(e) => {
          if (!isActive) {
            e.preventDefault();
          }
          return onProviderClicked && onProviderClicked(idp, loginURL, e);
        }}
        disabled={!isActive}
      >
        <ProviderButtonContent idp={idp} title={linkTitle} type={type} />
      </button>
      <input type='hidden' name={configuration.fieldName} value={entityID} />
      {Object.entries(configuration.extraFields || {}).map(
        ([inputName, inputValue]) => {
          return (
            <input
              key={inputName}
              type='hidden'
              name={inputName}
              value={inputValue}
            />
          );
        }
      )}
    </form>
  );
};

const ProviderButtonContent = ({
  idp,
  title,
  type
}: {
  idp: RegisteredProviderRecord;
  title: string;
  type: Types;
}) => {
  if (idp.logo == null) {
    return <span>{idp.entityName}</span>;
  }
  return (
    <span>
      <span className={styles.srOnly}>{title}</span>
      <img
        src={idp.logo}
        alt={idp.entityName}
        title={idp.entityName}
        style={type === 'modal' ? { maxWidth: '90%' } : {}}
      />
    </span>
  );
};
