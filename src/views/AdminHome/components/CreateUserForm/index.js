import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import _ from 'lodash';
import SelectField from 'material-ui/SelectField'
import FormButtons from '../../../../components/FormButtons';
import { fetchRegimens } from '../../../../actions/adminRegimenActions';
import { adminCreateUser, adminUpdateUser } from '../../../../actions/adminUserActions';
import './createUserForm.css';

const customStyles = {
  underlineStyle: {
    borderColor: '#333'
  }
}

class CreateUserForm extends Component {

  componentDidMount() {
    let user = this.props.user;
    if (this.props.type === 'edit') {
      let initialData = {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        code: user.code,
        sport: user.sport,
        regimen: user.regimen
      }
      this.props.initialize(initialData);
    }
    this.props.fetchRegimens();
  }

  // Move this to API
  renderSportItems() {
    let sports = ['basketball', 'soccer', 'volleyball', 'hockey', 'football', 'track & field', 'lacrosse'];

    return (
      sports.sort().map((sport) => {
        return <MenuItem className='sport-item' key={sport} value={sport} primaryText={sport}/>
      })
    )
  }

  renderRegimenItems() {
    let regimens = this.props.regimens;

    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <MenuItem
            key={regimen._id}
            className='regimen-item'
            value={regimen._id}
            primaryText={regimen.regimenName} />
        )
      });
    }
  }


  renderTextField({input, label, meta: {touched, error}, ...custom}) {
    return (
      <TextField
        className='text-field'
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        underlineFocusStyle={customStyles.underlineStyle}
      />
    )
  }

  renderSelectField({ input,
                      label,
                      meta: {touched, error},
                      children,
                      ...custom }) {
    return (
      <SelectField
        className='select-field'
        errorText={touched && error}
        hintText={label}
        {...input}
        onChange={(event, index, value) => input.onChange(value)}
        children={children}
        {...custom}
        underlineFocusStyle={customStyles.underlineStyle}
      />
    )
  }

  onSubmit(values) {
    if (this.props.type === 'new') {
      this.props.adminCreateUser(values);
    } else {
      this.props.adminUpdateUser(this.props.user._id, values);
    }
    this.props.closeForm();
  }


  render() {
    const { handleSubmit, reset } = this.props;

    return (
      <div className='create-user-container'>
        <form className='create-user-form' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='create-user-fields'>
            <div className='create-user-name'>
              <Field
                name='firstName'
                component={this.renderTextField}
                label='First Name'
              />
              <Field
                name='lastName'
                component={this.renderTextField}
                label='Last Name'
              />
            </div>
            <div className='create-user-email'>
              <Field
                name='email'
                component={this.renderTextField}
                label='Email'
              />
            </div>
            <div className='create-user-code'>
              <Field
                name='code'
                component={this.renderTextField}
                label='Registration Code'
              />
            </div>
            <div className='create-user-sport'>
              <Field name='sport' component={this.renderSelectField} label='Sport'>
                {this.renderSportItems()}
              </Field>
            </div>
            <div className='create-user-regimen'>
              <Field name='regimen' component={this.renderSelectField} label='Regimen'>
                {this.renderRegimenItems()}
              </Field>
            </div>
          </div>
          <FormButtons
            onSubmitClick={handleSubmit(this.onSubmit.bind(this))}
            onClearClick={reset}
            onCloseClick={this.props.closeForm}
          />
        </form>
      </div>
    )
  }
};

function validate(values) {
  const errors = {}
  // const requiredFields = [
  //   'firstName', 'lastName'
  // ]

  // requiredFields.forEach(field => {
  //   if (!values[field]) {
  //     errors[field] = 'Required'
  //   }
  //   if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid email address'
  //   }
  // });

  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors;
}

function mapStateToProps(state) {
  return { regimens: state.adminRegimens };
}

export default reduxForm({
  validate,
  form: 'CreateUserForm'
})(
  connect(mapStateToProps, { adminCreateUser, adminUpdateUser, fetchRegimens })(CreateUserForm)
);
