import React from 'react';
import Select, { components } from 'react-select'
import { Icon } from 'design-react-kit';

const Option = (props: any) => {
  return (
    <div className="select-pill text-primary">
      <components.Option {...props} />
    </div>
  )
}

const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon icon="it-arrow-down-triangle" aria-hidden={true} />
    </components.DropdownIndicator>
  )
}

type SelectProps<T> = {
  options: {value: T, label: string}[]
  onChange: (selectedOption: {label: string, value: T} | null) => void,
  label: string,
  selectedValue: {value: T, label: string}
};

let counter = 0;
const generatedIds = {};
const idGenerator = (label: string): string => {
  generatedIds[label] = generatedIds[label] || `selectExampleClassic-${counter}`;
  return generatedIds[label];
}

export function SelectComponent<T = unknown>({options, onChange, label, selectedValue}: SelectProps<T>) {
  return (
    <div className="bootstrap-select-wrapper">
      <label htmlFor={idGenerator(label)}>{label}</label>
      <Select
        components={{
          Option,
          DropdownIndicator,
          IndicatorSeparator: null
        }}
        styles={{
          container: provided => ({ ...provided, height: '2.5rem' }),
          valueContainer: provided => ({ ...provided, height: '2.5rem' }),
          control: provided => ({ ...provided, height: '2.5rem' })
        }}
        id={idGenerator(label)}
        onChange={onChange}
        options={options}
        placeholder={label}
        aria-label={label}
        classNamePrefix="react-select"
        value={selectedValue}
      />
    </div>
  )
}