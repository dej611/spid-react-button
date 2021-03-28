#!/bin/sh

npx svgo -f node_modules/spid-smart-button/dist/img/ -o src/shared/svgs
npx svgo -f node_modules/spid-smart-button/dist/img/idp-logos/ -o src/shared/svgs/idp-logos