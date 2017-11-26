import React from 'react';
import './adminPageHeader.css';

const firstName = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : null;
const lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : null;

const AdminPageHeader = (props) => {

  return (
    <div className='admin-page-header'>
      <p className='admin-name'>{firstName} {lastName}</p>
    </div>
  )
}

export default AdminPageHeader;
