import React from 'react';
import { Field, reduxForm } from 'redux-form'
import DatePicker from 'material-ui/DatePicker';

const AdminEntryDateField = (props) => {

  // shouldDisableDate={(date) => {return date > new Date()}}
  // Disables dates after today
  function renderDatePicker({input, label, meta: {touched, error}, ...custom}) {
    return (
      <DatePicker
        {...custom}
        underlineStyle={{display: 'none'}}
        textFieldStyle={{width: '100%', height: '100%', paddingLeft: '8px', fontFamily: 'Barlow'}}
        className='entry-date-field'
        onChange={(e, val) => {return input.onChange(val)}}
        shouldDisableDate={(date) => {return date > new Date()}}
        value={input.value ? input.value : new Date()}
        />
    )
  }

  return (
    <div className='admin-entry-form-item'>
      <label>Date:</label>
      <Field name='entryDate' component={renderDatePicker} label='Date'/>
    </div>
  )
}

export default AdminEntryDateField;
