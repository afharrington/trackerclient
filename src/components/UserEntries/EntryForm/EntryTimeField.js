import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'

const EntryTimeField = (props) => {

  function renderOptions() {

    let options = props.options;
    return options.sort().map(option => {
      return (
        <option className='form-option' value={option} key={option}>
          {option}
        </option>
      )
    });

  }

  return (
    <div>
      <Field className='entry-form-time-field' name={props.name} component='select'>
        {renderOptions()}
      </Field>
      <label className='time-label'>{props.label}</label>
    </div>
  )
}

export default EntryTimeField;
