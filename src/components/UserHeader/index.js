import React, { Component } from 'react';
import UserHeaderTab from './UserHeaderTab';
import './userHeader.css';

class UserHeader extends Component {

  renderInactiveRegimens() {
    const { userRegimens, visibleUserRegimen, activeUserRegimen } = this.props;

    return userRegimens.map(userRegimen => {
      if (userRegimen.fromRegimenId != activeUserRegimen.fromRegimenId) {
        return (
          <UserHeaderTab
            key={userRegimen._id}
            visibleUserRegimen={visibleUserRegimen}
            setVisibleUserRegimen={this.props.setVisibleUserRegimen} view={userRegimen._id}
            title={userRegimen.userRegimenName}/>
        )
      }
    })
  }

  render() {
    const { firstName, lastName, visibleUserRegimen, activeUserRegimen } = this.props;

    return (
      <div className='user-header'>
        <div className='user-header-name'>
          <h1>{firstName} {lastName}</h1>
        </div>
        <div className='user-header-tabs'>
          <UserHeaderTab
            visibleUserRegimen={visibleUserRegimen}
            setVisibleUserRegimen={this.props.setVisibleUserRegimen} view={activeUserRegimen._id}
            title={activeUserRegimen.userRegimenName}/>

            { this.renderInactiveRegimens()}

          <UserHeaderTab
            visibleUserRegimen={visibleUserRegimen}
            setVisibleUserRegimen={this.props.setVisibleUserRegimen}
            view='info'
            title='Info'/>
        </div>
      </div>
    )
  }
}


export default UserHeader;
