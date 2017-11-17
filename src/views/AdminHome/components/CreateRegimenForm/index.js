import React, { Component } from 'react';
import FormWrapper from '../../../../components/FormWrapper';
import SubmitButton from '../../../../components/SubmitButton';
import { connect } from 'react-redux';
import { createRegimen } from '../../../../actions/adminRegimenActions';
import './createRegimenForm.css';


class CreateRegimenForm extends Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    if (this.state.value !== '') {
      this.props.createRegimen({ regimenName: this.state.value });
      this.props.exitForm();
    }
    event.preventDefault();
  }

  render() {
    return (
      <FormWrapper title='Create a New Regimen' exit={this.props.exit}>
        <form onSubmit={this.handleSubmit}>
          <div className='create-regimen-form'>
            <label>Name:</label>
            <input
              type='text'
              className='create-regimen-form-field'
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>
          <div className='button-container'>
            <SubmitButton class={this.state.value === '' ? 'submit-button' : 'submit-button submit-button-active'} buttonLabel='Submit'/>
          </div>
        </form>
      </FormWrapper>
    )
  }
};

export default connect(null, { createRegimen })(CreateRegimenForm);
