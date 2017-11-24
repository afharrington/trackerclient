import React, { Component } from 'react';
import Select from 'react-select';
import { Field, reduxForm, formValueSelector, getFormValues } from 'redux-form'
import { connect } from 'react-redux';
import _ from 'lodash';
import FormWrapper from '../../../components/FormWrapper';
import SubmitButton from '../../../components/SubmitButton';
import { updateUser } from '../../../actions/userActions';
import './changePasswordForm.css';

class ChangePasswordForm extends Component {

  componentDidMount() {
    console.log(this.props.user);
  }

  onSubmit(values) {
    console.log(values);
  }

  renderField(field) {
    return (
      <div className='change-password-form-item'>
        <div className='label'><label>{field.label}: </label></div>
        <input
          className={field.styleclass}
          type={field.type}
          {...field.input}
        />    
        <div className='error'>{field.meta.submitFailed ? field.meta.error : ''}</div>
      </div>
    );
  }

  render() {
    const { handleSubmit, reset, submitting, pristine } = this.props;

    return (
      <FormWrapper title='Change your password' exit={this.props.exit}>
        <div className='change-password-form'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              name='oldPassword'
              styleclass='password-field'
              component={this.renderField}
              type='password'
              label='Old Password'
            />
            <Field
              name='newPassword'
              styleclass='password-field'
              component={this.renderField}
              type='password'
              label='New Password'
            />
            <Field
              placeholder='Confirm New Password'
              name='confirmPassword'
              styleclass='password-field'
              component={this.renderField}
              type='password'
              label='Confirm New Password'
            />
            <div className='change-password-form-button'>
              <SubmitButton buttonLabel='Submit'/>
            </div>
          </form>
          <div className='auth-error'>{this.props.auth.error}</div>
        </div>
      </FormWrapper>
    )
  }
};

function validate(values) {
  const errors = {}
  if (values.newPassword !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  const requiredFields = [
    'oldPassword', 'newPassword', 'confirmPassword'
  ]

  requiredFields.forEach(field => {
    if (!values[field]) {
      errors[field] = 'Required'
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return {
    user: state.user,
    auth: state.auth
  };
}

export default reduxForm({
  validate,
  form: 'ChangePasswordForm'
})(
  connect(mapStateToProps, { updateUser })(ChangePasswordForm)
);
