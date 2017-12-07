import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import EntryDateField from './EntryDateField';
import EntryActivitiesList from './EntryActivitiesList';
import EntryTimeField from './EntryTimeField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField'
import Slider from 'material-ui/Slider';
import FormWrapper from '../../FormWrapper';
import { adminCreateEntry, adminUpdateEntry, adminFetchUserTile } from '../../../actions/adminUserActions';
import { createEntry, updateEntry, fetchUserTile } from '../../../actions/userActions';
import './EntryForm.css';

class EntryForm extends Component {
  constructor(props) {
    super(props);

    if (this.props.entry) {

      this.state = {
        initialData: {
          hours: Math.floor(this.props.entry.minutes / 60),
          minutes: this.props.entry.minutes % 60,
          entryDate: new Date(this.props.entry.entryDate),
          activity: this.props.entry.activity,
          notes: this.props.entry.notes
        }
      }
    } else {
      this.state = {
        initialData: {
          hours: 0,
          minutes: 0,
          activity: '',
          notes: ''
        }
      }
    }
  }

  componentDidMount() {
    this.props.initialize(this.state.initialData);
  }

  renderNotesField({input, label, meta: {touched, error}, ...custom}) {
    return (
      <TextField
        className='entry-form-text-field'
        hintText={label}
        floatingLabelText={label}
        floatingLabelStyle={{ color: '#00c7a9', fontFamily: 'Barlow' }}
        underlineFocusStyle={{ borderColor: '#00c7a9'}}
        inputStyle={{ fontFamily: 'Barlow' }}
        errorText={touched && error}
        {...input}
        {...custom}

      />
    )
  }

  onSubmit(values) {
    let userTile = this.props.userType === 'admin' ? this.props.adminUserTile : this.props.userTile;

    let hours = Number(values.hours);
    let minutes = Number(values.minutes);
    let totalMinutes = (hours * 60) + minutes;

    let entry = {
      entryDate: values.entryDate,
      activity: values.activity,
      minutes: totalMinutes,
      notes: values.notes
    }

    if (this.props.userType === 'admin') {
      // Callbacks are necessary for new cycle totals to re-render (calculated on backend)
      if (!this.props.entry) {
        this.props.adminCreateEntry(
          this.props.userTileId,
          entry, () => this.props.adminFetchUserTile(this.props.userTileId));
      } else {
        this.props.adminUpdateEntry(
          this.props.cycleId,
          this.props.entry._id,
          entry, () => this.props.adminFetchUserTile(userTile._id));
      }
    }

    if (this.props.userType === 'user') {

      if (!this.props.entry) {
        this.props.createEntry(
          this.props.userTileId,
          entry, () => this.props.fetchUserTile(this.props.userTileId));
      } else {
        this.props.updateEntry(
          this.props.cycleId,
          this.props.entry._id,
          entry, () => this.props.fetchUserTile(userTile._id));
      }
    }

    this.props.closeForm();
  }

  render() {
    const { handleSubmit, reset, pristine, submitting } = this.props;
    let userTile = this.props.userType === 'admin' ? this.props.adminUserTile : this.props.userTile;

    return (
      <FormWrapper title='Add an entry' exit={this.props.closeForm}>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='entry-form-fields'>
            <EntryDateField/>
            <EntryActivitiesList userTile={userTile}/>

            <div className='entry-form-time'>
              <EntryTimeField
                name='hours'
                label='hours'
                options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
              <EntryTimeField
                name='minutes'
                label='minutes'
                options={[0, 15, 30, 45]}/>
            </div>

            <div className='entry-form-notes'>
              <Field
                name='notes'
                component={this.renderNotesField}
                label='Notes'
              />
            </div>
            <div className='entry-buttons'>
              <button type='submit' disabled={pristine || submitting} className='submit-button'>Save</button>
              <button type='button' disabled={pristine || submitting} onClick={reset} className='clear-button'>Clear</button>
            </div>
          </div>
        </form>
      </FormWrapper>
    )
  }
};

function validate(values) {
  const errors = {}
  // const requiredFields = [
  //   'hours', 'minutes', 'entryDate'
  // ]


  // requiredFields.forEach(field => {
  //   if (!values[field]) {
  //     errors[field] = 'Required'
  //   }
  // });

  return errors;
}

function mapStateToProps(state) {
  return {
    adminUserTile: state.adminUsers.userTile,
    userTile: state.user.userTile,
    userType: state.auth.userType
  };
}

export default reduxForm({
  validate,
  form: 'EntryForm'
})(
  connect(mapStateToProps, { adminCreateEntry, createEntry, adminUpdateEntry, updateEntry, adminFetchUserTile, fetchUserTile })(EntryForm)
);
