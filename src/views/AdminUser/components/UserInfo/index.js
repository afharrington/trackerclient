import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { adminUpdateUser, adminFetchUser, adminDeleteUser } from '../../../../actions/adminUserActions';
import { fetchRegimens } from '../../../../actions/adminRegimenActions';
import CautionModal from '../../../../components/CautionModal';
import UserInfoItem from './UserInfoItem';
import UserInfoTextField from './UserInfoTextField';
import UserInfoSportsList from './UserInfoSportsList';
import UserInfoProgramsList from './UserInfoProgramsList';
import './userInfo.css';

class UserInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      canEdit: false,
      showModal: false,
      redirect: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
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

  toggleEdit() {
    this.setState({ canEdit: !this.state.canEdit });
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
    this.toggleEdit();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/admin'/>;
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
              { this.state.canEdit ?
                <UserInfoTextField name='firstName' label='First Name' placeholder={firstName} className='name'/> :
                <UserInfoItem label='First Name' text={firstName} className='name'/> }

              { this.state.canEdit ?
                <UserInfoTextField name='lastName' label='Last Name' placeholder={lastName} className='name'/> :
                <UserInfoItem label='Last Name' text={lastName} className='name'/> }

              { this.state.canEdit ?
                <UserInfoTextField name='email' label='Email' placeholder={email} className='email'/> :
                <UserInfoItem label='Email' text={email}/> }

              { this.state.canEdit ?
                <UserInfoTextField name='code' label='Reset Code' placeholder={code} /> :
                <UserInfoItem label='Reset Code' text={code}/> }

              { this.state.canEdit ?
                <UserInfoSportsList name='sport' label='Sport' className='sport' /> :
                <UserInfoItem label='Sport' text={sport} className='sport' /> }

              { this.state.canEdit ?
                <UserInfoProgramsList name='regimen' label='Program' regimens={this.props.regimens} className='program'/> :
                <UserInfoItem label='Program' text={this.props.user.activeUserRegimen.userRegimenName} className='program'/>}

              </div>

            { this.state.canEdit == false ?
              <div onClick={this.toggleEdit} className='user-info-button edit'>Edit</div> :

              <button onClick={handleSubmit(this.onSubmit.bind(this))} className='user-info-button submit'>Save</button>
            }
          </form>

          { this.state.canEdit &&
            <div onClick={this.toggleEdit} className='user-info-button cancel'>Cancel</div>
          }

          <div className='user-info-delete-user'>
            <p onClick={this.toggleModal}>Delete user account</p>
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
    regimens: state.adminRegimens };
}

export default reduxForm({
  validate,
  form: 'UpdateUserForm'
})(
  connect(mapStateToProps, { adminUpdateUser, adminFetchUser, adminDeleteUser, fetchRegimens })(UserInfo)
);
