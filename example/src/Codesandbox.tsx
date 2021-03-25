import React from 'react';
import { Icon } from 'design-react-kit';
import { getParameters } from 'codesandbox/lib/api/define';
const templateIndex = `import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <App />
  </StrictMode>,
  rootElement
);`

function generateURLParams(code: string, addDependency: boolean){
  const manifest = {
    "name": "spid-react-button-example",
    "version": "1.0.0",
    "description": "SPID React button example starter project",
    "keywords": ["react", "starter", "spid", "spid-button"],
    "main": "src/index.js",
    "dependencies": {
      "react": "17.0.2",
      "react-dom": "17.0.2",
      "react-scripts": "4.0.0",
      "spid-react-button": "latest"
    },
    "devDependencies": {
      "@babel/runtime": "7.13.8",
      "typescript": "4.1.3"
    },
    "scripts": {
      "start": "react-scripts start",
      "build": "react-scripts build",
      "test": "react-scripts test --env=jsdom",
      "eject": "react-scripts eject"
    },
    "browserslist": [">0.2%", "not dead", "not ie <= 11", "not op_mini all"]
  };
  if(addDependency){
    manifest.dependencies['spid-smart-button'] = 'latest';
  }
    return getParameters({
    files: {
        // @ts-expect-error
      'App.js': {
        content: code,
      },
      // @ts-expect-error
      'index.js': {
        content: templateIndex
      },
      'package.json': {
        // @ts-expect-error
        content: manifest
      },
    },
  });
}

  export const CodeSandboxLink = ({code, addDependency}: {code: string, addDependency: boolean}) => {
      return <a target="_blank noreferral" href={`https://codesandbox.io/api/v1/sandboxes/define?parameters=${generateURLParams(code, addDependency)}`} className="float-right"><Icon icon="it-software"/> Open it Codesandbox</a>
  }