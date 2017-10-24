import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from "react-redux";
import { loginUser, authError } from '../../../../actions/authActions';
import './loginUserForm.css';
import '../loginForms.css';

class LoginUserForm extends Component {

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
        <div className='confirm-password-error'>
          {field.meta.submitFailed ? field.meta.error : ''}
        </div>
      </div>
    );
  }

  // Redirect function passed down from Login to set state
  onSubmit(values) {
    this.props.loginUser(values, () => {
      this.props.redirect();
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='login-form-container login-user-form'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
            <Field
              placeholder='Email'
              name='email'
              styleclass='email-field'
              component={this.renderField}
              type='text'
            />
            <Field
              placeholder='Password'
              name='password'
              styleclass='password-field'
              component={this.renderField}
              type='password'
            />
            <p className='login-forgot-password'>Forgot password?</p>
            <button className='login-button' type='submit'>Log in</button>
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
    return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default reduxForm({
  validate,
  form: 'LoginUserForm'
})(
  connect(mapStateToProps, { loginUser, authError })(LoginUserForm)
);
