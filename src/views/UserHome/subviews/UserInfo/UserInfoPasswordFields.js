import React from 'react';
import { Field, reduxForm } from 'redux-form'

const UserInfoPasswordFields = (props) => {
  return (
    <div>
      <div className='user-info-item'>
        <p className='label'>New Password:</p>
        <Field
          name={props.name}
          className={`field ${props.className}`}
          component='input'
          type='text'/>
      </div>
      <div className='user-info-item'>
        <p className='label'>Confirm New Password:</p>
        <Field
          name={props.name}
          className={`field ${props.className}`}
          component='input'
          type='text' />
      </div>
    </div>
  )
}

export default UserInfoPasswordFields;
