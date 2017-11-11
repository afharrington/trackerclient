import React, { Component } from 'react';
import Select from 'react-select';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import _ from 'lodash';
import SelectField from 'material-ui/SelectField'
import FormButtons from '../../../../components/FormButtons';
import { fetchRegimens } from '../../../../actions/adminRegimenActions';
import FormWrapper from '../../../../components/FormWrapper';
import { adminCreateUser, adminUpdateUser, adminFetchUsers } from '../../../../actions/adminUserActions';
import './createUserForm.css';

class CreateUserForm extends Component {

  componentDidMount() {
    this.props.fetchRegimens();
  }

  renderSportItems() {
    let sports = ['basketball', 'soccer', 'volleyball', 'hockey', 'football', 'track & field', 'lacrosse'];

    return (
      sports.sort().map((sport) => {
        return <option className='sport-item' key={sport} value={sport}>{sport}</option>
      })
    )
  }

  renderRegimenItems() {
    let regimens = this.props.regimens;
    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <option value={regimen._id} key={regimen._id}>
            {regimen.regimenName}
          </option>
        )
      });
    }
  }

  onSubmit(values) {
    this.props.adminCreateUser(values);
    this.props.exit();
  }

  render() {
    const { handleSubmit, reset, submitting, pristine } = this.props;

    return (
      <FormWrapper exit={this.props.exit}>
        <div className='create-user-form'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

            <div className='create-user-form-item'>
              <div className='create-user-form-field'>
                <Field name="firstName" placeholder='First Name' component="input" type="text"/>
              </div>
            </div>

            <div className='create-user-form-item'>
              <div className='create-user-form-field'>
                <Field name="lastName" placeholder='Last Name' component="input" type="text"/>
              </div>
            </div>

            <div className='create-user-form-item'>
              <div className='create-user-form-field'>
                <Field name="email" placeholder='Email' component="input" type="email"/>
              </div>
            </div>

            <div className='create-user-form-item'>
              <div className='create-user-form-field'>
                <Field name="code" placeholder='Registration Code' component="input" type="text"/>
              </div>
            </div>

            <div className='create-user-form-item'>
              <div className='create-user-form-field'>
                <Field name="sport" component="select">
                  <option>- Select Player's Sport -</option>
                  {this.renderSportItems()}
                </Field>
              </div>
            </div>

            <div className='create-user-form-item'>
              <div className='create-user-form-field'>
                <Field name='regimen' component='select'>
                  <option>- Select Player's Regimen -</option>
                  {this.renderRegimenItems()}
                </Field>
              </div>
            </div>

            <div className='create-user-form-buttons'>
              <button className='submit-button' type="submit" disabled={pristine || submitting}>Submit </button>
              <button className='clear-button' type="button" disabled={pristine || submitting} onClick={reset}>Clear
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
    errors.email = 'Invalid email format'
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
  connect(mapStateToProps, { adminCreateUser, adminFetchUsers, fetchRegimens })(CreateUserForm)
);
