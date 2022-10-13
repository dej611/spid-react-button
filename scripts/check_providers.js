const { XMLParser } = require('fast-xml-parser');
const fetch = require('node-fetch');
const providersJSON = require('../src/shared/providers_meta.json');

const URL = 'https://registry.spid.gov.it/metadata/idp/spid-entities-idps.xml';

fetch(URL)
  .then((res) =>
    Promise.all([res.text(), new Set(Object.values(providersJSON))])
  )
  .then(([xml, currentLookup]) => {
    const parser = new XMLParser({ ignoreAttributes: false });
    const json = parser.parse(xml);
    const entities = json['md:EntitiesDescriptor']['md:EntityDescriptor'].map(
      (meta) => meta['@_entityID']
    );
    // are all remote entities in this repo?
    const missingEntities = entities.filter((id) => !currentLookup.has(id));
    if (missingEntities.length) {
      throw Error(
        `There are missing providers in the repo: ${missingEntities.join(', ')}`
      );
    }
    // has some provider been pulled out?
    if (entities.length !== currentLookup.size) {
      const remoteLookup = new Set(entities);
      const pulledEntities = [...currentLookup].filter(
        (id) => !remoteLookup.has(id)
      );
      throw Error(
        `The following providers should be removed from the repo: ${pulledEntities.join(
          ', '
        )}`
      );
    }
    console.log('Providers list up to date!');
  });
