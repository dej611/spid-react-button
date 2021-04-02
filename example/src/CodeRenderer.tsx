import React from 'react';
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import jsx from 'react-syntax-highlighter/dist/esm/languages/prism/jsx';
import css from 'react-syntax-highlighter/dist/esm/languages/prism/css';
import bash from 'react-syntax-highlighter/dist/esm/languages/prism/bash';
import { vs } from 'react-syntax-highlighter/dist/esm/styles/prism';
// import { CodeSandboxLink } from './Codesandbox';

import { initState, NoFunctionProps } from './constants';

SyntaxHighlighter.registerLanguage('jsx', jsx);
SyntaxHighlighter.registerLanguage('css', css);
SyntaxHighlighter.registerLanguage('bash', bash);

function isDefaultProp(prop: string, value: unknown) {
    if (prop === 'url') {
        return false;
    }
    if (Array.isArray(value)) {
        return value.length === initState[prop].length &&
            initState[prop].every((v: unknown, i: number) => v === value[i]);
    }
    return initState[prop] === value;
}

export const CodeRenderer = (buttonProps: NoFunctionProps) => {
    const entries = Object.entries(buttonProps);
    const code = `
import { SPIDReactButton } from '@dej611/spid-react-button';
import 'typeface-titillium-web';
import '@dej611/spid-react-button/dist/index.css';

function mySPIDButton(props){
    return (
        <SPIDReactButton 
            ${entries
            .filter(([prop, value]) => !isDefaultProp(prop, value))
            .map(([prop, value]) => `${prop}={${JSON.stringify(value, null, 2)}}`)
            .join('\n            ')}
        />
    );
}`;

    return <div><SyntaxHighlighter language="javascript" showLineNumbers

        wrapLines style={vs}>
        {code}
    </SyntaxHighlighter>
    </div>
}

export const GenericCodeRenderer = ({code, lang} : {code: string, lang: 'css' | 'bash'}) => {
    return <SyntaxHighlighter language={lang}

        wrapLines style={vs}>
        {code}
    </SyntaxHighlighter>
}
