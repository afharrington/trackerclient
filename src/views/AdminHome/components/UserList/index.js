import React, { Component } from 'react';
import _ from 'lodash';
import NewButton from '../../../../components/NewButton';
import CautionModal from '../../../../components/CautionModal';
import CreateUserForm from '../CreateUserForm';
import UserItem from '../UserItem';
import { connect } from 'react-redux';
import { adminFetchUsers, adminDeleteUser } from '../../../../actions/adminUserActions';
import './userList.css';

// Same pattern as UserEntries > CreateEntryForm

class UserList extends Component {
  constructor(props) {
    super(props);
    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.closeForm = this.closeForm.bind(this);

    this.state = {
      showNewForm: false,
      showEditForm: false,
      showModal: false,
      userId: '',
      user: {}
    }
  }

  componentDidMount() {
    this.props.adminFetchUsers();
  }

  deleteUser() {
    this.props.adminDeleteUser(this.state.userId);
  }

  toggleModal(userId) {
    if (this.state.showModal === false) {
      this.setState({ showModal: true });
      this.setState({ userId: userId })
    } else {
      this.setState({ showModal: false });
      this.setState({ userId: '' })
    }
  }

  closeModal() {
    this.setState({ showModal: false });
    this.setState({ userId: '' });
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <CautionModal
          itemToDelete='player'
          closeModal={this.closeModal.bind(this)}
          deleteFunction={this.deleteUser.bind(this)}
        />
      )
    }
  }

  toggleNewForm() {
    if (this.state.showNewForm === false) {
      this.setState({ showNewForm: true });
    } else {
      this.setState({ showNewForm: false });
    }
  }

  // Passed down to User Row component
  toggleEditForm(user) {
    if(this.state.showEditForm === false) {
      this.setState({ showEditForm: true });
      this.setState({ user: user });
    } else {
      this.setState({ showEditForm: false });
      this.setState({ user: {} });
    }
  }

  // Passed down to child components
  closeForm() {
    this.setState({ showEditForm: false });
    this.setState({ showNewForm: false });
  }


  renderInstructions() {
    function isEmpty(obj) {
      for (let key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }

    if (isEmpty(this.props.users) ) {
      return (
        <div className='user-list-instructions'>
          <p>Add a player.</p>
        </div>
      )
    }
  }

  renderUsers() {
    let users = this.props.users;

    // <img className='sports-icon' src={`./img/icons/${user.sport}.png`} alt='basketball-icon'/>
    if (users) {
      return _.map(users, user => {
        return (
          <UserItem
            key={user._id}
            toggleModal={this.toggleModal.bind(this)}
            user={user}
            toggleEditForm={this.toggleEditForm}
          />
        )
      });
    }
  }

  render() {
    return (
      <div className='user-list-container'>
        {this.renderModal()}
        <h3 className='list-title'>Players</h3>
        <div className='users-button-container'>
          <div onClick={this.toggleNewForm.bind(this)}><NewButton text='new player'/></div>
        </div>

        { this.state.showNewForm ?
          <CreateUserForm
            toggleNewForm={this.toggleNewForm}
            closeForm={this.closeForm}
            type='new'
            /> : null }

        { this.state.showEditForm ?
          <CreateUserForm
            closeForm={this.closeForm}
            user={this.state.user}
            type='edit'
            /> : null }
        <div className='user-list'>
          {this.renderUsers()}
        </div>
      </div>
    )
  }
};


function mapStateToProps(state) {
  return { users: state.adminUsers};
}

export default connect(mapStateToProps,{ adminFetchUsers, adminDeleteUser })(UserList);
