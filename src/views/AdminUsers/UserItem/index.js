import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import './userItem.css';

class UserItem extends Component {

  render() {
    let user = this.props.user;
    if (user) {
      return (
        <Link to={`/admin/user/${user._id}`}>
          <div className='user-item'>
            <p className='user-item-name'>{user.firstName} {user.lastName}</p>
            <p className='user-item-program'>{user.activeUserRegimen && user.activeUserRegimen.userRegimenName}</p>
            <p className='user-item-entry'>10/10/17</p>
          </div>
        </Link>
        )
    } else {
      return <div></div>
    }
  };
}

export default UserItem;