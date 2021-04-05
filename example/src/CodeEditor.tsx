import React from 'react';
import { Button, Icon } from 'design-react-kit';

const htmlTemplate = `<div id="root"></div>`

const indexTemplate = `
import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));
`

function makePartOfApp(code: string){
  return `
import React from "react";
${code.replace('function', 'export default function')}
`
}

export const CodeEditorLink = ({ code }: { code: string }) => {
  return (
  <form method="post" action="https://stackblitz.com/run" target="_blank">
    <input type="hidden" name="project[title]" value="spid-react-button-example" />
    <input type="hidden" name="project[files][public/index.html]" value={htmlTemplate} />
    <input type="hidden" name="project[files][src/App.js]" value={makePartOfApp(code)} />
    <input type="hidden" name="project[files][src/index.js]" value={indexTemplate} />
    <input type="hidden" name="project[tags][]" value="react" />
    <input type="hidden" name="project[tags][]" value="spid" />
    <input type="hidden" name="project[tags][]" value="spid-button" />
    <input type="hidden" name="project[description]" value="SPID React button example starter project" />
    <input type="hidden" name="project[dependencies]" value={`{
      "react": "17.0.2",
      "react-dom": "17.0.2",
      "react-scripts": "4.0.0",
      "@dej611/spid-react-button": "latest",
      "typeface-titillium-web": "latest"
    }`} />
    <input type="hidden" name="project[template]" value="create-react-app" />
    <Button
      color="link"
      icon
      tag="button"
      className="float-right"
    >
      <Icon icon="it-software" />
      Open it in Stackblitz
    </Button>
  </form>
  )
}