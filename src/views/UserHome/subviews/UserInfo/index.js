import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { fetchUser, updateUser } from '../../../../actions/userActions';
import UserInfoItem from './UserInfoItem';
import UserInfoPasswordFields from './UserInfoPasswordFields';
import UserInfoTextField from './UserInfoTextField';
import UserInfoSportsList from './UserInfoSportsList';
import UserInfoProgramsList from './UserInfoProgramsList';
import './userInfo.css';

class UserInfo extends Component {

  constructor(props) {
    super(props);

    this.state = {
      canEdit: false
    }
    this.toggleEdit = this.toggleEdit.bind(this);
  }

  componentDidMount() {
    let user = this.props.user;
    let initialData = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      code: user.code,
      sport: user.sport,
      regimen: user.activeUserRegimen.fromRegimenId,
      password: user.password
    }

    this.props.initialize(initialData);
  }

  toggleEdit() {
    this.setState({ canEdit: !this.state.canEdit });
  }

  onSubmit(values) {
    this.props.updateUser(values);
    this.toggleEdit();
  }

  render() {
    const { firstName, lastName, email, sport, activeUserRegimen } = this.props.user;
    const { handleSubmit, submitting } = this.props;

    return (
      <div className='user-info-container'>
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

              {/* { this.state.canEdit ?
                <UserInfoPasswordFields name='password' label='Password' placeholder={password} /> :
                <UserInfoItem label='Password' text='********'/> } */}

                <UserInfoItem label='Sport' text={sport} className='sport' />

                <UserInfoItem label='Program' text={this.props.user.activeUserRegimen.userRegimenName} className='program'/>

              </div>

            { this.state.canEdit == false ?
              <div onClick={this.toggleEdit} className='user-info-button edit'>Edit</div> :

              <button onClick={handleSubmit(this.onSubmit.bind(this))} className='user-info-button submit'>Save</button>
            }
          </form>

          { this.state.canEdit &&
            <div onClick={this.toggleEdit} className='user-info-button cancel'>Cancel</div>
          }

          <div className='user-info-change-password'>
            <p onClick={this.toggleModal}>Change Password</p>
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
    user: state.user,
  };
}

export default reduxForm({
  validate,
  form: 'UpdateUserForm'
})(
  connect(mapStateToProps, { updateUser, fetchUser })(UserInfo)
);
