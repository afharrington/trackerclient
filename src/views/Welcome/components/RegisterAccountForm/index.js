import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import { registerAdmin, registerUser, authError } from '../../../../actions/authActions';
import './registerAccountForm.scss';

class RegisterAccountForm extends Component {

  componentWillUnmount() {
    this.props.authError('');
  }


  renderField(field) {
    return (
      <div className='login-field'>
        <input
          placeholder={field.placeholder}
          className={field.styleclass}
          type={field.type}
          {...field.input}
        />
        <div className='form-submit-error'>
          {field.meta.submitFailed ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  renderRadioButtons(field) {
    return (
      <div className='radio-button-container'>
        <p>I am an</p>
        <RadioButtonGroup defaultSelected='user' {...field.input} className='account-field'>
          <RadioButton value="user" label='Athlete' />
          <RadioButton value="admin" label='Admin' />
        </RadioButtonGroup>
      </div>
    )
  }

  // redirect function passed down from Login to set state
  onSubmit(values) {
    if (values.account === 'admin') {
      this.props.registerAdmin(values, () => { this.props.redirect() });
    } else {
      this.props.registerUser(values, () => { this.props.redirect() });
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='create-form-container'>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            placeholder='Registration Code'
            name='code'
            styleclass='code-field'
            component={this.renderField}
            type='text'
          />
          <Field name='account' component={this.renderRadioButtons} />
          <Field
            placeholder='Email'
            name='email'
            styleclass='email-field'
            component={this.renderField}
            type='text'
          />
          <Field
            placeholder='Create Password'
            name='password'
            styleclass='password-field'
            component={this.renderField}
            type='password'
          />
          <Field
            placeholder='Confirm Password'
            name='confirmPassword'
            styleclass='password-field'
            component={this.renderField}
            type='password'
          />
          <button className='login-button' type='submit'>Register your account</button>
        </form>
        <div className='auth-error'>{this.props.auth.error}</div>
      </div>
    )
  }
}

function validate(values) {
    const errors = {};

    if (!values.email) {
      errors.email = 'Enter your email address';
    }
    if (!values.password) {
      errors.password = 'Enter your password';
    }
    if (values.password !== values.confirmPassword) {
      errors.password = 'Passwords do not match';
    }
    if (values.code) {
      if (isNaN(Number(values.code)) || values.code.length !== 5) {
        errors.code = 'Invalid code';
      }
    }
    return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default reduxForm({
  validate,
  form: 'RegisterAccountForm'
})(
  connect(mapStateToProps, { registerAdmin, registerUser, authError })(RegisterAccountForm)
);
