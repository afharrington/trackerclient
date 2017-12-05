import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';
import FormWrapper from '../FormWrapper';
import SubmitButton from '../SubmitButton';
import { connect } from 'react-redux';
import { createProgram, fetchPrograms } from '../../actions/adminProgramActions';
import ProgramSportsList from './ProgramSportsList';
import ProgramTextField from './ProgramTextField';
import './createProgramForm.css';


class CreateProgramForm extends Component {
  constructor(props) {
    super(props);
    // this.state = { name: '', sport: ''};
    //
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }
  //
  // handleChange(event) {
  //   this.setState({value: event.target.value});
  // }

  // handleSubmit(event) {
  //   if (this.state.value !== '') {
  //     this.props.createProgram({ programName: this.state.value });
  //     this.props.exitForm();
  //   }
  //   event.preventDefault();
  // }

  onSubmit(values) {
    this.props.createProgram(values, () => {
      this.props.fetchPrograms();
    });
    this.props.exit();
  }

  render() {
    const { handleSubmit, submitting } = this.props;

    return (
      <FormWrapper title='Create a New Program' exit={this.props.exit}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='create-program-form-fields'>
            <ProgramTextField name='programName' label='Program Name' className='name'/>
            <ProgramSportsList name='sport' label='Sport' className='sport' />
          </div>
          <button type='submit' className='create-program-button submit'>Submit</button>
        </form>
      </FormWrapper>
    )
  }
};

export default reduxForm({
  form: 'CreateProgramForm'
})(
  connect(null, { createProgram, fetchPrograms })(CreateProgramForm)
);
