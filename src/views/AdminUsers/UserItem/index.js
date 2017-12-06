import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import Moment from 'react-moment';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import './userItem.css';

class UserItem extends Component {

  renderLastEntry() {
    let user = this.props.user;
    if (user.recentEntry) {
      return <p className='user-item-entry'><Moment fromNow>{user.recentEntry.entryDate}</Moment></p>
    } else {
      return <p className='user-item-entry'></p>
    }
  }

  render() {
    let user = this.props.user;
    if (user) {
      // Links to view/AdminUser
      return (
        <Link to={`/admin/user/${user._id}`}>
          <div className='user-item'>
            <p className='user-item-name'>{user.firstName} {user.lastName}</p>
            <p className='user-item-program'>{user.activeUserProgram && user.activeUserProgram.userProgramName}</p>
            {this.renderLastEntry()}
          </div>
        </Link>
        )
    } else {
      return <div></div>
    }
  };
}

function mapStateToProps(state) {
  return { recentUserEntries: state.adminUsers.recentUserEntries };
}


export default connect(mapStateToProps)(UserItem);
