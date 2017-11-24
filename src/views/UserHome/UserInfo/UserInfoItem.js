import React from 'react';

const UserInfoItem = (props) => {
  return (
    <div className='user-info-item'>
      <p className='label'>{props.label}:</p>
      <p className={`current ${props.className}`}>{props.text}</p>
    </div>
  )
}

export default UserInfoItem;
