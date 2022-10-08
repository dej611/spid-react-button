#!/bin/sh
mkdir /tmp/idp-svgs
curl -L  "https://github.com/italia/spid-sp-access-button/archive/master.tar.gz" | tar -C /tmp/idp-svgs --strip-components=4 -xf - spid-sp-access-button-master/src/production/img/spid-idp*.svg

npx svgo -f node_modules/spid-smart-button/dist/img/ -o src/shared/svgs
npx svgo -f /tmp/idp-svgs -o src/shared/svgs/idp-logos

rm -r /tmp/idp-svgs