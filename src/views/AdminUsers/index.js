import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { selectMenuItem } from '../../actions/uiActions';
import { adminFetchUsers } from '../../actions/adminUserActions';
import MdKeyboardArrowDown from 'react-icons/lib/md/keyboard-arrow-down';
import PageTitle from '../../components/PageTitle';
import AdminPageHeader from '../../components/AdminPageHeader';
import NewButton from '../../components/NewButton';
import CreateUserForm from '../../components/CreateUserForm';
import UserItem from './UserItem';
import './adminUsers.css';

class AdminUsers extends Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserForm: false,
      sortName: true,
      sortNameAscending: true,
      sortProgram: false,
      sortProgramAscending: true,
      sortEntry: false,
      sortEntryAscending: true
    }

    this.toggleUserForm = this.toggleUserForm.bind(this);
    this.handleNameSort = this.handleNameSort.bind(this);
    this.handleProgramSort = this.handleProgramSort.bind(this);
    this.handleEntrySort = this.handleEntrySort.bind(this);
  }

  componentDidMount() {
    this.props.adminFetchUsers();
    this.props.selectMenuItem('Team');
  }

  toggleUserForm() {
    this.setState({ showUserForm: !this.state.showUserForm});
  }

  handleNameSort() {
    if (this.state.sortName === false) {
      this.setState({ sortName: true });
    } else {
      this.setState({ sortNameAscending: !this.state.sortNameAscending });
    }
  }

  handleProgramSort() {
    if (this.state.sortProgram === false) {
      this.setState({ sortProgram: true });
    } else {
      this.setState({ sortProgramAscending: !this.state.sortProgramAscending });
    }
  }

  handleEntrySort() {
    if (this.state.sortEntry === false) {
      this.setState({ sortEntry: true });
    } else {
      this.setState({ sortEntryAscending: !this.state.sortEntryAscending });
    }
  }

  renderUsers() {
    let users = this.props.users;
    if (users) {

      // If sorted in ascending alphabetical order
      if (this.state.sortName === true && this.state.sortNameAscending) {
        users = users.sort(function(a, b){
          return a.firstName == b.firstName ? 0 : +(a.firstName > b.firstName) || -1;
        });
      }

      // If sorted in descending alphabetical order
      if (this.state.sortName === true && !(this.state.sortNameAscending)) {
        users = users.sort(function(a, b){
          return b.firstName == a.firstName ? 0 : +(b.firstName > a.firstName) || -1;
        });
      }

      // If sorted by program in ascending order
      if (this.state.sortProgram === true && this.state.sortProgramAscending) {
        users = users.sort(function(a, b){
          return a.activeUserRegimen.userRegimenName == b.activeUserRegimen.userRegimenName ? 0 : +(a.activeUserRegimen.userRegimenName > b.activeUserRegimen.userRegimenName) || -1;
        });
      }

      // If sorted by program in descending order
      if (this.state.sortProgram === true && !(this.state.sortProgramAscending)) {
        users = users.sort(function(a, b){
          return b.activeUserRegimen.userRegimenName == a.activeUserRegimen.userRegimenName ? 0 : +(b.activeUserRegimen.userRegimenName > a.activeUserRegimen.userRegimenName) || -1;
        });
      }

      // If sorted by program in ascending order
      if (this.state.sortEntry === true && this.state.sortEntryAscending) {
        users = users.sort(function(a, b){
          return a.activeUserRegimen.userRegimenName == b.activeUserRegimen.userRegimenName ? 0 : +(a.activeUserRegimen.userRegimenName > b.activeUserRegimen.userRegimenName) || -1;
        });
      }

      // If sorted by program in descending order
      if (this.state.sortEntry === true && !(this.state.sortEntryAscending)) {
        users = users.sort(function(a, b){
          return b.recentEntry.entryDate == a.recentEntry.entryDate ? 0 : +(b.recentEntry.entryDate > a.recentEntry.entryDate) || -1;
        });
      }

      return users.map(user => {
        return (
          <UserItem key={user._id} user={user} />
        )
      });
    }
  }

  render() {
    return (
      <div className='admin-users'>
        { this.state.showUserForm ? <CreateUserForm exit={this.toggleUserForm}/> : null }
        <AdminPageHeader/>
        <PageTitle title='Your Team' color='orange'/>
        <div className='admin-users-content'>
          <NewButton onClick={this.toggleUserForm} text='Add Player'/>
          <div className='admin-users-users'>
            <div className='admin-users-labels'>
              <p className='admin-users-labels-name'>Name<span className='sort'><MdKeyboardArrowDown onClick={this.handleNameSort}/></span></p>
              <p className='admin-users-labels-program'>Program<span className='sort'><MdKeyboardArrowDown onClick={this.handleProgramSort}/></span></p>
              <p className='admin-users-labels-entry'>Last Activity<span className='sort'><MdKeyboardArrowDown onClick={this.handleEntrySort}/></span></p>
            </div>
            {this.renderUsers()}
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { users: state.adminUsers.users };
}

export default connect(mapStateToProps, { adminFetchUsers, selectMenuItem })(AdminUsers);
