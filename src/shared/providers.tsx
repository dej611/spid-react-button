import ArubaSVGUrl from '/./svgs/idp-logos/spid-idp-arubaid.svg';
import InfocertSVGUrl from '/./svgs/idp-logos/spid-idp-infocertid.svg';
import PosteSVGUrl from '/./svgs/idp-logos/spid-idp-posteid.svg';
import SielteSVGUrl from '/./svgs/idp-logos/spid-idp-sielteid.svg';
import TimSVGUrl from '/./svgs/idp-logos/spid-idp-timid.svg';
import NamirialSVGUrl from '/./svgs/idp-logos/spid-idp-namirialid.svg';
import RegisterItSVGUrl from '/./svgs/idp-logos/spid-idp-spiditalia.svg';
import IntesaSVGUrl from '/./svgs/idp-logos/spid-idp-intesaid.svg';
import LepidaSVGUrl from '/./svgs/idp-logos/spid-idp-lepidaid.svg';

import type { RegisteredProviderRecord } from './types';

export const providers: Readonly<RegisteredProviderRecord>[] = [
  {
    protocols: ['SAML'],
    entityName: 'Aruba ID',
    logo: ArubaSVGUrl,
    entityID: 'https://loginspid.aruba.it',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'Infocert ',
    logo: InfocertSVGUrl,
    entityID: 'https://identity.infocert.it',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'Poste ID',
    logo: PosteSVGUrl,
    entityID: 'https://posteid.poste.it',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'Sielte',
    logo: SielteSVGUrl,
    entityID: 'https://identity.sieltecloud.it',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'Tim ID',
    logo: TimSVGUrl,
    entityID: 'https://login.id.tim.it/affwebservices/public/saml2sso',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'Namirial ID',
    logo: NamirialSVGUrl,
    entityID: 'https://idp.namirialtsp.com/idp',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'SPIDItalia Register.it',
    logo: RegisterItSVGUrl,
    entityID: 'https://spid.register.it',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'Intesa ID',
    logo: IntesaSVGUrl,
    entityID: 'https://spid.intesa.it',
    active: true
  },
  {
    protocols: ['SAML'],
    entityName: 'Lepida ID',
    logo: LepidaSVGUrl,
    entityID: 'https://id.lepida.it/idp/shibboleth',
    active: true
  }
];
