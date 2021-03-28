import React, { useState, useCallback } from 'react'

import { SPIDReactButton, SPIDButtonProps, ProviderRecord } from '@dej611/spid-react-button'
import 'bootstrap-italia/dist/css/bootstrap-italia.min.css';
import 'typeface-titillium-web';
import 'typeface-roboto-mono';
import 'typeface-lora';


import '@dej611/spid-react-button/dist/index.css';

// @ts-expect-error
import { Col, Row, Container } from 'design-react-kit';

import { AppHeader } from './Header';
import { defaultURL, initState } from './constants';
import { Configurator } from './Configurator';
import { EventsTable } from './EventsTable';
import { DocTable } from './DocTable';

const App = () => {
  const [buttonProps, setProps] = useState(initState);

  const [isValidURL, setValidURL] = useState(true);
  const [events, setEvents] = useState<{ type: string, name: string, arg?: string }[]>([]);

  const updateStateProp = useCallback(
    <T extends keyof SPIDButtonProps>(prop: T, newValue: SPIDButtonProps[T]) => {
      return setProps(prevState => ({ ...prevState, [prop]: newValue }))
    }, [setProps]);

  const prependEvent = useCallback((newEvent) => {
    setEvents((events) => [newEvent, ...events]);
  }, [setEvents])

  return <>
    <AppHeader />
    <section id="main">
      <Container tag="div">
        <Row>
          <Col md="6">
            <Row>
              <Col>
                <legend>{(buttonProps.type).toUpperCase()} version</legend>
                <SPIDReactButton
                  {...buttonProps}
                  url={isValidURL ? buttonProps.url : defaultURL}
                  onProvidersShown={() => prependEvent({ type: buttonProps.type, name: 'onProvidersShown' })}
                  onProvidersHidden={() => prependEvent({ type: buttonProps.type, name: 'onProvidersHidden' })}
                  onProviderClicked={(arg: ProviderRecord, url: string | undefined, e) => {
                    e.preventDefault();
                    prependEvent({ type: buttonProps.type, name: 'onProvidersClicked', arg: JSON.stringify({url, arg}, null, 2) })
                  }}
                />
                <EventsTable events={events} />
              </Col>
            </Row>
          </Col>
          <Col>
            <Configurator updateProp={updateStateProp} setValidURL={setValidURL} isValidURL={isValidURL} buttonProps={buttonProps} />
          </Col>
        </Row>
        <Row>
          <Col>
            <Row><h1>F.A.Q.</h1></Row>
            <Row>
              <p><strong>7 kb (gzipped) is too much for my project! Is it possible to treeshake it?</strong></p>
            </Row>
            <Row>
              <p>Yes. If you know already you're going to use only one type of button, you can just pick it: just import <code>SPIDReactButtonModal</code> or <code>SPIDReactButtonDropdown</code> and experice full treeshake.</p>
            </Row>
            <Row>
              <p><strong>Is this project official?</strong></p>
            </Row>
            <Row>
              <p>No, this is not an official project.</p>
            </Row>
            <Row>
              <p><strong>Is the providers list official?</strong></p>
            </Row>
            <Row>
              <p>No, as this is not an official project, the list may not be super up-to-date (we check pretty often tho). This official list of SPID provideers is avilable <a href="https://github.com/italia/spid-sp-access-button" target="_blank noreferrer">here</a></p>
            </Row>
            <Row>
              <p><strong>Where the modal version comes from? Is that official?</strong></p>
            </Row>
            <Row>
              <p>The modal version of this component comes from these other project <a href="https://github.com/italia/spid-smart-button" target="_blank noreferrer">spid-smart-button</a></p>
            </Row>
            <Row>
              <p><strong>Does this component goes in conflict with the <code>design-react-kit</code>?</strong></p>
            </Row>
            <Row>
              <p>No. This page was in fact built using components from the <code>design-react-kit</code>. If you find any conflicting issue with it, please report it to this repository.</p>
            </Row>
            <Row>
              <p><strong>Why did you write all of this in English rather than Italian?</strong></p>
            </Row>
            <Row>
              <p>I guess I've started it in English and just finished it. As open source project PR aree very welcome, expecially for translations!</p>
            </Row>
            <Row>
              <p><strong>Does the project have Typescript types?</strong></p>
            </Row>
            <Row>
              <p>Yes, they are in the package. The API documentation is automatically extracted from types.</p>
            </Row>
            <Row>
              <p><strong>Can I contribute somehow to the project?</strong></p>
            </Row>
            <Row>
              <p>Of course you can, glad you've asked. You can report bugs or issues with the project to start with at this repository, or even enhance it with a PR!</p>
            </Row>
            <Row>
              <p><strong>What's the license of this project?</strong></p>
            </Row>
            <Row>
              <p>EUPL 1.2, European Union Public Licence V. 1.2</p>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
    <section id="api">
      <Container>
        <Row>
          <Col>
            <DocTable {...buttonProps} url={isValidURL ? buttonProps.url : defaultURL} />
          </Col>
        </Row>
      </Container>
    </section>
    <footer className="it-footer">

      <div className="it-footer-main">
        <Container tag="div">
          <h5>Note</h5>
          <p>All logos of each Identity Provider is a registered trademark of their respective owners</p>
          <p>The SPID logo is a registered trademark of AGID, Agenzia per l'Italia Digitale della Presidenza del Consiglio dei Ministri</p>
        </Container></div>
      <div className="it-footer-small-prints clearfix">
        <Container tag="div">

        </Container>
      </div>
    </footer>
  </>
}
export default App
