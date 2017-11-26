import React from 'react';
import { Field, reduxForm } from 'redux-form'

const UserInfoTextField = (props) => {
  return (
    <div className='user-info-item'>
      <p className='user-info-item-label'>{props.label}:</p>
      <div className='user-info-item-field'>
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
