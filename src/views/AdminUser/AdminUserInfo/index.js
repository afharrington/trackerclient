import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { adminUpdateUser, adminFetchUser, adminDeleteUser } from '../../../actions/adminUserActions';
import { fetchRegimens } from '../../../actions/adminRegimenActions';
import CautionModal from '../../../components/CautionModal';
import UserInfoTextField from './UserInfoTextField';
import UserInfoSportsList from './UserInfoSportsList';
import UserInfoProgramsList from './UserInfoProgramsList';
import './userInfo.css';

class AdminUserInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      redirect: false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
  }

  componentDidMount() {
    let user = this.props.user;
    let initialData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      code: user.code,
      sport: user.sport,
      regimen: user.activeUserRegimen.fromRegimenId
    }

    this.props.initialize(initialData);
    this.props.fetchRegimens();
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  deleteUser() {
    this.props.adminDeleteUser(this.props.user._id);
    this.setState({ redirect: true });
  }

  onSubmit(values) {
    this.props.adminUpdateUser(this.props.user._id, values);
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/admin/team'/>;
    }
    const { firstName, lastName, email, code, sport, userRegimens, activeRegimen } = this.props.user;
    const { handleSubmit, submitting } = this.props;

    return (
      <div className='user-info-container'>
        { this.state.showModal &&
          <CautionModal
            title='Delete Player'
            message='Are you sure you want to permanently delete this player account?'
            submit={this.deleteUser}
            cancel={this.toggleModal}
          />
        }
        <div className='user-info-details'>

          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className='user-info-form-fields'>
                <UserInfoTextField name='firstName' label='First Name' className='name'/>
                <UserInfoTextField name='lastName' label='Last Name' className='name'/>
                <UserInfoTextField name='email' label='Email' className='email'/>
                <UserInfoTextField name='code' label='Reset Code' />
                <UserInfoSportsList name='sport' label='Sport' className='sport' />
                <UserInfoProgramsList name='regimen' label='Program' regimens={this.props.regimens} className='program'/>
              </div>
              <button onClick={handleSubmit(this.onSubmit.bind(this))} className='user-info-button submit'>Update</button>
          </form>
          <div className='user-info-delete-user'>
            <p onClick={this.toggleModal}>Delete user</p>
          </div>
        </div>
      </div>
    )
  }
};

function validate(values) {
  const errors = {}
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email format'
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    user: state.adminUsers.user,
    regimens: state.adminRegimens.regimens };
}

export default reduxForm({
  validate,
  form: 'AdminUpdateUserForm'
})(
  connect(mapStateToProps, { adminUpdateUser, adminFetchUser, adminDeleteUser, fetchRegimens })(AdminUserInfo)
);
