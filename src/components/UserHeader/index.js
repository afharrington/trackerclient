import React, { Component } from 'react';
import UserHeaderTab from './UserHeaderTab';
import './userHeader.css';

class UserHeader extends Component {

  constructor(props) {
    super(props);
  }

  renderTabs() {
    const { userRegimens, activeRegimen } = this.props;

    // The active regimen is the first tab
    let active = userRegimens[activeRegimen];
    console.log('active', active);

    // Then render all the other regimens
    return (
      <div className='user-header-tabs'>
        <UserHeaderTab setView={this.props.setView} view='0' title='Active'/>
        <UserHeaderTab setView={this.props.setView} view='info' title='Info'/>
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
