import React, { Component } from 'react';
import UserHeaderTab from './UserHeaderTab';
import './userHeader.css';

class UserHeader extends Component {

  render() {
    const { firstName, lastName, activeUserProgram, currentView } = this.props;

    return (
      <div className='user-header'>
        <div className='user-header-name'>
          <h1>{firstName} {lastName}</h1>
          <h2>{activeUserProgram.userProgramName}</h2>
        </div>

        { this.props.userType === 'admin' &&
          <div className='user-header-tabs'>
            <UserHeaderTab
              currentView={currentView}
              viewType='userProgram'
              title='Program'
              setViewType={this.props.setViewType} />
            <UserHeaderTab
              currentView={currentView}
              viewType='info'
              title='Info'
              setViewType={this.props.setViewType} />
          </div>
        }
      </div>
    )
  }
}


export default UserHeader;
