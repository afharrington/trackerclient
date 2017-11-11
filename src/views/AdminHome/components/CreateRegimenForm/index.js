import React, { Component } from 'react';
import FormWrapper from '../FormWrapper';
import SubmitButton from '../../../../components/SubmitButton';
import { connect } from 'react-redux';
import { createRegimen } from '../../../../actions/adminRegimenActions';
import './createRegimenForm.css';

const customStyles = {
  underlineStyle: {
    borderColor: '#333'
  }
}

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
      <FormWrapper exit={this.props.exit}>
        <div className='create-regimen-form'>
          <form onSubmit={this.handleSubmit}>
            <input
              type='text'
              className='create-regimen-form-field'
              value={this.state.value}
              onChange={this.handleChange}
              placeholder='Regimen Name'
            />
            <SubmitButton class={this.state.value === '' ? 'submit-button' : 'submit-button submit-button-active'} buttonLabel='Create Regimen'/>
          </form>
        </div>
      </FormWrapper>
    )
  }
};

export default connect(null, { createRegimen })(CreateRegimenForm);
