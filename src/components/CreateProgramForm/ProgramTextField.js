import React from 'react';
import { Field, reduxForm } from 'redux-form'

const ProgramTextField = (props) => {
  return (
    <div className='create-program-item'>
      <p className='create-program-item-label'>{props.label}:</p>
      <div className='create-program-item-field'>
        <Field
          name={props.name}
          className={`field ${props.className}`}
          component='input'
          type='text'
          placeholder={props.placeholder} />
      </div>
    </div>
  )
}

export default ProgramTextField;
