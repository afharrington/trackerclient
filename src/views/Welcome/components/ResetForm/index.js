import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { resetPassword, authError } from '../../../../actions/authActions';
import './resetForm.css';

class ResetForm extends Component {

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

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className='create-form-container'>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            placeholder='Email'
            name='email'
            styleclass='email-field'
            component={this.renderField}
            type='text'
          />
          <button className='login-button' type='submit'>Reset Password</button>
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
    return errors;
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default reduxForm({
  validate,
  form: 'ResetForm'
})(
  connect(mapStateToProps, { resetPassword, authError })(ResetForm)
);
