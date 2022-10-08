#!/bin/sh
mkdir temp
curl -L  "https://github.com/italia/spid-sp-access-button/archive/master.tar.gz" | tar -C temp --strip-components=4 -xf - spid-sp-access-button-master/src/production/img/spid-idp*.svg

npx svgo -f node_modules/spid-smart-button/dist/img/ -o src/shared/svgs
npx svgo -f temp/ -o src/shared/svgs/idp-logos

rm -r temp