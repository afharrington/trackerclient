import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import _ from 'lodash';
import { adminCreateUser } from '../../actions/adminUserActions';
import { fetchPrograms } from '../../actions/adminProgramActions';
import FormWrapper from '../../components/FormWrapper';
import UserInfoTextField from './UserInfoTextField';
import UserInfoSportsList from './UserInfoSportsList';
import UserInfoProgramsList from './UserInfoProgramsList';
import './createUserForm.css';

class CreateUserForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    }
  }

  componentDidMount() {
    this.props.fetchPrograms();
  }

  onSubmit(values) {
    this.props.adminCreateUser(values);
    this.props.exit();
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to='/admin/team'/>;
    }

    const { handleSubmit, submitting } = this.props;

    return (
      <div className='create-user-container'>
        <div className='create-user-details'>
          <FormWrapper exit={this.props.exit} title='Create a Player Account'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <div className='create-user-form-fields'>
              <UserInfoTextField name='firstName' label='First Name' className='name'/>
              <UserInfoTextField name='lastName' label='Last Name' className='name'/>
              <UserInfoTextField name='email' label='Email' className='email'/>
              <UserInfoTextField name='code' label='Reset Code' />
              <UserInfoSportsList name='sport' label='Sport' className='sport' />
              <UserInfoProgramsList name='program' label='Program' programs={this.props.programs} className='program'/>
            </div>
            <button type='submit' className='create-user-button submit'>Submit</button>
          </form>
          </FormWrapper>
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
    programs: state.adminPrograms.programs };
}

export default reduxForm({
  validate,
  form: 'AdminCreateUserForm'
})(
  connect(mapStateToProps, { adminCreateUser, fetchPrograms })(CreateUserForm)
);
