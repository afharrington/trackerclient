import React from 'react';
import { Field, reduxForm } from 'redux-form'

const UserInfoTextField = (props) => {
  return (
    <div className='user-info-item'>
      <p className='label'>{props.label}:</p>
      <Field
        name={props.name}
        className={`field ${props.className}`}
        component='input'
        type='text'
        placeholder={props.placeholder} />
    </div>
  )
}

export default UserInfoTextField;
