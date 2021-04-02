import React, { useEffect , useState} from 'react';
import Markdown from 'markdown-to-jsx';
// @ts-expect-error
import {Puff} from 'svg-loaders-react';
import { CodeRenderer, GenericCodeRenderer } from './CodeRenderer';
import { NoFunctionProps } from './constants';


const docURL = process.env.PUBLIC_URL + "/doc.md";

const possibleStates = {
    'init': {state: 'init'},
    'loaded': {state: 'loaded', payload: '' as string},
    'error': {state: 'error'}
} as const;

type LoadingStates = keyof typeof possibleStates;
type StatesValues = (typeof possibleStates)[LoadingStates]

const wait = (ms: number) => new Promise(r => setTimeout(r, ms))

export const DocTable = (buttonProps: NoFunctionProps) => {
    const [doc, setDoc] = useState<StatesValues>(possibleStates.init);

    useEffect(() => {
        Promise.all([
            fetch(docURL)
                .then((response) => response.text()),
                wait(1500)
        ])
            .then(([markdown]) => setDoc({
                ...possibleStates.loaded, payload: markdown
            }))
            .catch(() => setDoc(possibleStates.error))
    }, [setDoc]);

    const npmInstallLine = 'npm install --save @dej611/spid-react-button typeface-titillium-web';
    const cssImportLine = '@import url(https://fonts.googleapis.com/css?family=Titillium+Web:400,600,700,900);';
    return <div>
        <h1>Getting started</h1>
        <GenericCodeRenderer code={npmInstallLine} lang='bash' />
        
        The package depends on the Titillium font.

        An alternative to installing the local package is to use it via CDN, adding this line to your css file:

        <GenericCodeRenderer code={cssImportLine} lang='css' />
        
        <a href="https://github.com/dej611/spid-react-button" target="_blank noreferrer">Github repository</a>
        <h1>Reference API</h1>
        <CodeRenderer {...buttonProps} url={buttonProps.url} />
        {doc.state === 'init' && <Puff stroke="#0073e6" strokeOpacity=".5"/>}
        {
            doc.state === 'loaded' 
                ? <Markdown>{doc.payload}</Markdown>
                : null
        }
        {doc.state === 'error' && <p>
            An error occurred when loading the documentation from the server
            </p>}
    </div>
}