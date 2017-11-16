import React, { Component } from 'react';
import UserHeaderTab from './UserHeaderTab';
import './userHeader.css';

class UserHeader extends Component {

  renderTabs() {
    const { userRegimens, activeUserRegimen, activeView } = this.props;
    // Then render all the other regimens
    return (
      <div className='user-header-tabs'>
        <UserHeaderTab activeView={activeView} setView={this.props.setView} view='activeUserRegimen' title={activeUserRegimen.userRegimenName}/>
        <UserHeaderTab activeView={activeView} setView={this.props.setView} view='info' title='Info'/>
      </div>
    )
  }

  render() {
    const { firstName, lastName } = this.props;

    return (
      <div className='user-header'>
        <div className='user-header-name'>
          <h1>{firstName} {lastName}</h1>
        </div>
        { this.renderTabs() }
      </div>
    )
  }
}


export default UserHeader;
