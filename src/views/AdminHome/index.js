import React, { Component } from 'react';
import RegimenList from './components/RegimenList';
import UserList from './components/UserList';

import './adminHome.css';

class AdminHome extends Component {

  render() {
    return (
      <div className='admin-home'>
        <RegimenList/>
        <UserList/>
      </div>
    )
  }
}

export default AdminHome;
