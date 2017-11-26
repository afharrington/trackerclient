import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectMenuItem } from '../../actions/uiActions';
import { adminFetchUsers } from '../../actions/adminUserActions';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import PageTitle from '../../components/PageTitle';
import AdminPageHeader from '../../components/AdminPageHeader';
import UserItem from './UserItem';
import './adminUsers.css';

class AdminUsers extends Component {

  componentDidMount() {
    this.props.adminFetchUsers();
    this.props.selectMenuItem('Team');
  }

  renderUsers() {
    let users = this.props.users;
    if (users) {
      return _.map(users, user => {
        return (
          <UserItem user={user} />
        )
      });
    }
  }

  render() {
    return (
      <div className='admin-users'>
        <AdminPageHeader/>
        <PageTitle title='Team' color='orange'/>
        <div className='admin-users-content'>
          <div className='admin-users-labels'>
            <p className='admin-users-labels-name'>Name<span className='sort'><MdKeyboardArrowDown/></span></p>
            <p className='admin-users-labels-program'>Program<span className='sort'><MdKeyboardArrowDown/></span></p>
            <p className='admin-users-labels-entry'>Last Entry<span className='sort'><MdKeyboardArrowDown/></span></p>
          </div>
          {this.renderUsers()}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { users: state.adminUsers };
}

export default connect(mapStateToProps, { adminFetchUsers, selectMenuItem })(AdminUsers);
