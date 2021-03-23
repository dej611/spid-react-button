import React from 'react';

import { emptyClass, possibleStates } from './constants';

import { isGetMethod } from '../shared/utils';
import { isVisible } from './utils';

import type { TranslateFn } from '../shared/i18n';
import type { ModalState } from './types';
import type {
  ProviderRecord,
  RegisteredProviderRecord,
  SPIDButtonProps
} from '../shared/types';

const ProviderButtonContent = ({
  entityName,
  logo
}: Pick<RegisteredProviderRecord, 'entityName' | 'logo'>) => {
  if (logo == null) {
    return <span>{entityName}</span>;
  }
  return <img src={`${logo}`} alt={entityName} style={{ maxWidth: 170 }} />;
};

type ProviderButtonProps = Required<
  Pick<SPIDButtonProps, 'url' | 'configuration' | 'onProviderClicked'>
> & {
  idp: RegisteredProviderRecord;
  entityID: ProviderRecord['entityID'];
  i18n: TranslateFn;
  isActive: boolean;
  delay: number;
  visibility: ModalState;
};
export const ProviderButton = ({
  idp,
  entityID,
  url,
  i18n,
  isActive,
  delay,
  visibility,
  configuration,
  onProviderClicked
}: ProviderButtonProps) => {
  const actionURL = url.replace('{{idp}}', encodeURIComponent(entityID));
  const linkTitle = isActive
    ? i18n('accedi_con_idp', idp.entityName)
    : i18n('idp_disabled');
  const {
    classNames,
    style
  }: {
    classNames: string;
    style?: Record<string, string>;
  } = isVisible(visibility)
    ? visibility.type === possibleStates.ENTERING.type
      ? {
          classNames: 'spid-button-idp-fade-in',
          style: { animationDelay: `${delay}s` }
        }
      : { classNames: emptyClass }
    : { classNames: emptyClass };

  if (isGetMethod(configuration)) {
    return (
      <span className={`spid-button-idp ${classNames}`} style={style}>
        <a
          title={linkTitle}
          href={isActive ? actionURL : ''}
          // @ts-expect-error
          disabled={!isActive}
          onClick={() => onProviderClicked(idp)}
        >
          <ProviderButtonContent entityName={idp.entityName} logo={idp.logo} />
        </a>
      </span>
    );
  }
  const { fieldName, extraFields = {} } = configuration;
  return (
    <span className='spid-button-idp'>
      <form action={actionURL} method='POST'>
        <button
          type='submit'
          className='spid-button-idp-button'
          title={linkTitle}
          disabled={!isActive}
        >
          <ProviderButtonContent entityName={idp.entityName} logo={idp.logo} />
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
    </span>
  );
};
