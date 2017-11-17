import React, { Component } from 'react';
import Select from 'react-select';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchRegimens } from '../../../../actions/adminRegimenActions';
import FormWrapper from '../../../../components/FormWrapper';
import { adminCreateUser, adminUpdateUser, adminFetchUsers } from '../../../../actions/adminUserActions';
import CreateUserTextField from './CreateUserTextField';
import CreateUserSportsList from './CreateUserSportsList';
import CreateUserRegimensChecklist from './CreateUserRegimensChecklist';
import CreateUserProgramsList from './CreateUserProgramsList';
import './createUserForm.css';

class CreateUserForm extends Component {

  componentDidMount() {
    this.props.fetchRegimens();
  }

  onSubmit(values) {
    this.props.adminCreateUser(values);
    this.props.exit();
  }

  render() {
    const { handleSubmit, reset, submitting, pristine } = this.props;

    return (
      <FormWrapper title='Add a new player' exit={this.props.exit}>
        <div className='create-user-form'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <CreateUserTextField label='First Name' name='firstName'/>
            <CreateUserTextField label='Last Name' name='lastName'/>
            <CreateUserTextField label='Email' name='email'/>
            <CreateUserTextField label='Registration Code' name='code'/>
            <CreateUserSportsList label='Sport' name='sport'/>
            <CreateUserProgramsList label='Program' regimens={this.props.regimens} name='regimen'/>
            <div className='create-user-form-buttons'>
              <button className='submit-button' type='submit' disabled={pristine || submitting}>Submit </button>
              <button className='clear-button' type='button' disabled={pristine || submitting} onClick={reset}>Clear
              </button>
            </div>
          </form>
        </div>
      </FormWrapper>
    )
  }
};


function validate(values) {
  const errors = {}
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Email must contain an @'
  }
  return errors;
}

function mapStateToProps(state) {
  return {
    regimens: state.adminRegimens
  };
}

export default reduxForm({
  validate,
  form: 'CreateUserForm'
})(
  connect(mapStateToProps, { adminCreateUser, adminFetchUsers, fetchRegimens })(CreateUserForm)
);
