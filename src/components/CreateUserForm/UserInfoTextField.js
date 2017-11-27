import React from 'react';
import { Field, reduxForm } from 'redux-form'

const UserInfoTextField = (props) => {
  return (
    <div className='create-user-item'>
      <p className='create-user-item-label'>{props.label}:</p>
      <div className='create-user-item-field'>
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

export default UserInfoTextField;
