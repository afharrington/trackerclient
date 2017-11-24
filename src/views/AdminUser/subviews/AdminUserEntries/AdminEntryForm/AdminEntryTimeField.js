import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'

const AdminEntryTimeField = (props) => {

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
    <div className='admin-entry-form-item'>
      <Field className='admin-entry-time-field' name={props.name} component='select'>
        {renderOptions()}
      </Field>
      <label>{props.label}</label>
    </div>
  )
}

export default AdminEntryTimeField;
