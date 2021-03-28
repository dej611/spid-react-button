#!/bin/sh

cp ./node_modules/spid-smart-button/dist/spid-button.min.css ./src/modalVariant/index.module.css
if [ uname = 'Linux' ]; then
    sed -i '/@import url/d' ./src/modalVariant/index.module.css
else 
    sed -i '' '/@import url/d' ./src/modalVariant/index.module.css
fi