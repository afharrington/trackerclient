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
import './userEntryForm.css';

// styles from UserEntries/components/CreateEntryForm/createEntryForm.scss
class UserEntryForm extends Component {
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
        className='entry-text-field'
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
    let hours = Number(values.hours);
    let minutes = Number(values.minutes);
    let totalMinutes = (hours * 60) + minutes;

    let entry = {
      entryDate: values.entryDate,
      activity: values.activity,
      minutes: totalMinutes,
      notes: values.notes
    }

    // Callbacks are necessary for new cycle totals to update (calculated in API)
    if (!this.props.entry) {
      if (this.props.userType == 'admin') {
        this.props.adminCreateEntry(
          this.props.userId,
          this.props.regId,
          this.props.tileId,
          entry, () => this.props.adminFetchUserTile(this.props.userId, this.props.regId, this.props.tileId));
      } else {
        this.props.createEntry(
          this.props.regId,
          this.props.tileId,
          entry, () => this.props.fetchUserTile(this.props.regId, this.props.tileId));
      }
    } else {
      if (this.props.userType == 'admin') {
        this.props.adminUpdateEntry(
          this.props.userId,
          this.props.regId,
          this.props.tileId,
          this.props.cycleId,
          this.props.entry._id,
          entry, () => this.props.adminFetchUserTile(this.props.userId, this.props.regId, this.props.tileId));
      } else {
        this.props.updateEntry(
          this.props.regId,
          this.props.tileId,
          this.props.cycleId,
          this.props.entry._id,
          entry, () => this.props.fetchUserTile(this.props.regId, this.props.tileId));
      }
    }
    this.props.closeForm();
  }


  render() {
    const { handleSubmit, reset, pristine, submitting } = this.props;

    return (
      <FormWrapper title='Add an entry' exit={this.props.closeForm}>
        <form className='admin-entry-form' onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          <EntryDateField/>
          <EntryActivitiesList tile={this.props.tile}/>

          <div className='admin-entry-time'>
            <EntryTimeField
              name='hours'
              label='hours'
              options={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}/>
            <EntryTimeField
              name='minutes'
              label='minutes'
              options={[0, 15, 30, 45]}/>
          </div>

          <div className='admin-entry-notes'>
            <Field
              name='notes'
              component={this.renderNotesField}
              label='Notes'
            />
          </div>
          <div className='admin-entry-buttons'>
            <button type='submit' disabled={pristine || submitting} className='submit'>Save</button>
            <button type='button' disabled={pristine || submitting} onClick={reset} className='clear'>Clear</button>
          </div>
        </form>
      </FormWrapper>
    )
  }
};

function validate(values) {
  const errors = {}

  return errors;
}

function mapStateToProps(state) {
  return {
    userType: state.auth.userType,
    adminTile: state.adminUsers.tile,
    tile: state.user.tile
  };
}

export default reduxForm({
  validate,
  form: 'AdminEntryForm'
})(
  connect(mapStateToProps, { adminCreateEntry, adminUpdateEntry, adminFetchUserTile, createEntry, updateEntry, fetchUserTile })(UserEntryForm)
);
