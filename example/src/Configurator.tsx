import React from 'react';

import { SPIDButtonProps} from 'spid-react-button'
// @ts-expect-error
import { Input, Col, Row, Toggle, FormGroup, Label } from 'design-react-kit';
import { SelectComponent } from './BISelect';
import { colorThemes, configurations, cornerTypes, languages, NoFunctionProps, protocols, providersList, sizes, types } from './constants';

function getOptionsAndCurrentSelection<T>(labels: string[], options: T[], currentState: SPIDButtonProps, prop: keyof SPIDButtonProps) {
    const outputOptions = labels.map(
      (label, i) => ({ label, value: options[i] })
    );
    // @ts-expect-error
    const currentSelection = outputOptions.find(({ value }) => value === currentState[prop])
    return { options: outputOptions, selection: currentSelection! }
  }

  type ConfiguratorProps = {
    buttonProps: NoFunctionProps,
    updateProp: <T extends keyof NoFunctionProps>(prop: T, newValue: NoFunctionProps[T]) => void,
    setValidURL: (newValue: boolean) => void,
    isValidURL: boolean
  }

export const Configurator = ({buttonProps, updateProp, setValidURL, isValidURL }: ConfiguratorProps) => {


    const { options: langOptions, selection: langSelection } = getOptionsAndCurrentSelection(['Italiano', 'English', 'Deutsche'], languages, buttonProps, 'lang')
  const { options: sizeOptions, selection: sizeSelection } = getOptionsAndCurrentSelection(['Small', 'Medium', 'Large'], sizes, buttonProps, 'size')
  const { options: colorSchemeOptions, selection: colorThemeSelection } = getOptionsAndCurrentSelection(['Positive', 'Negative'], colorThemes, buttonProps, 'theme')
  const { options: protocolOptions, selection: protocolSelection } = getOptionsAndCurrentSelection(['SAML', 'OIDC'], protocols, buttonProps, 'protocol')
  const { options: cornerTypeOptions, selection: cornerTypeSelection } = getOptionsAndCurrentSelection(['Rounded', 'Sharp'], cornerTypes, buttonProps, 'corners')
  const { options: methodOptions, selection: methodSelection } = getOptionsAndCurrentSelection(['GET', 'POST'], configurations, buttonProps, 'configuration')
  const { options: typeOptions, selection: typeSelection } = getOptionsAndCurrentSelection(['Modal', 'Dropown'], types, buttonProps, 'type')

    return <>
    <div className="form-row">
            <Col md={6}>
              <Input
                label={"URL - must contain '{{idp}}':"}
                placeholder='Add a URL'
                value={buttonProps.url}
                valid={isValidURL}
                invalid={!isValidURL}
                infoText={isValidURL ? '' : 'Please add the "{{idp}}" string in it'}
                onChange={(event) => {
                  // @ts-expect-error
                  const newURL = event.target.value;
                  setValidURL(newURL.indexOf('{{idp}}') > -1);
                  updateProp('url', newURL);
                }}
              />
            </Col>
            <Col>
              <FormGroup className="m-8">
                <SelectComponent
                  label='Method:'
                  selectedValue={methodSelection}
                  options={methodOptions}
                  onChange={(selectedOption) => {
                    if (selectedOption != null && configurations.includes(selectedOption.value)) {
                      updateProp('configuration', selectedOption.value)
                    }
                  }}
                />
                </FormGroup>
            </Col>
          </div>
          <div className="form-row">
            <Col md={6}>
              <FormGroup className="m-8">
                <SelectComponent
                  label='Language:'
                  selectedValue={langSelection}
                  options={langOptions}
                  onChange={(selectedOption) => {
                    if (selectedOption != null && languages.includes(selectedOption.value)) {
                      updateProp('lang', selectedOption.value)
                    }
                  }}
                />
                </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup className="m-8">
                <SelectComponent
                  label='Size:'
                  selectedValue={sizeSelection}
                  options={sizeOptions}
                  onChange={(selectedOption) => {
                    if (selectedOption != null && sizes.includes(selectedOption.value)) {
                      updateProp('size', selectedOption.value)
                    }
                  }}
                /></FormGroup></Col>
          </div>
          <div className="form-row"><Col md={6}>
            <FormGroup className="m-8">
              <SelectComponent
                label='Theme:'
                selectedValue={colorThemeSelection}
                options={colorSchemeOptions}
                onChange={(selectedOption) => {
                  if (selectedOption != null && colorThemes.includes(selectedOption.value)) {
                    updateProp('theme', selectedOption.value)
                  }
                }}
              /></FormGroup></Col><Col md={6}>
              <FormGroup className="m-8">
                <SelectComponent
                  label='Corners style:'
                  selectedValue={cornerTypeSelection}
                  options={cornerTypeOptions}
                  onChange={(selectedOption) => {
                    if (selectedOption != null && cornerTypes.includes(selectedOption.value)) {
                      updateProp('corners', selectedOption.value)
                    }
                  }}
                /></FormGroup></Col>
          </div>
          <div className="form-row">
            <Col md={3}>
              <FormGroup check className="m-8">
                <Toggle
                  label={<span>Fluid</span>}
                  checked={buttonProps.fluid}
                  onChange={({ target }) => {
                    // @ts-expect-error
                    updateProp('fluid', target.checked)
                  }}
                />
              </FormGroup>
            </Col>
            <Col >
              <SelectComponent
                label='Type'
                selectedValue={typeSelection}
                options={typeOptions}
                onChange={(selectedOption) => {
                  if (selectedOption != null && types.includes(selectedOption.value)) {
                    updateProp('type', selectedOption.value)
                  }
                }}
              />
              </Col>
            <Col >
              <SelectComponent
                label='Protocol'
                selectedValue={protocolSelection}
                options={protocolOptions}
                onChange={(selectedOption) => {
                  if (selectedOption != null && protocols.includes(selectedOption.value)) {
                    updateProp('protocol', selectedOption.value)
                  }
                }}
              />
              </Col>
          </div>
          <Row>
            <fieldset>
              <legend>Provider supported:</legend>
              <FormGroup check >

                {providersList.map(({ entityID, entityName, logo }) => <div key={entityName}>
                  <Input id={entityName} type="checkbox" checked={buttonProps.supported.includes(entityID)} onChange={(event) => {
                    // @ts-expect-error
                    const isChecked = event.target.checked;
                    if (isChecked) {
                      updateProp('supported', [...buttonProps.supported, entityID])
                    } else {
                      updateProp('supported', buttonProps.supported.filter((id) => entityID !== id))
                    }
                  }} />
                  <Label htmlFor={entityName} check>
                    <img src={logo} alt={entityName} height={20} />
                  </Label>
                </div>
                )}
              </FormGroup>
            </fieldset>
          </Row></>
}