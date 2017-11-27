import React from 'react';
import { Field, reduxForm } from 'redux-form'

const CreateUserTextField = (props) => {
  return (
    <div className='create-user-form-item'>
      <p className='label'>{props.label}:</p>
      <Field name={props.name} component='input' type='text'/>
    </div>
  )
}

export default CreateUserTextField;
