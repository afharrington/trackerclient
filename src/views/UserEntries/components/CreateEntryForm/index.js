import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField'
import Slider from 'material-ui/Slider';
import FormButtons from '../../../../components/FormButtons';
import { createEntry, updateEntry } from '../../../../actions/userActions';
import './createEntryForm.scss';

const customStyles = {
  underlineStyle: {
    borderColor: '#00c7a9'
  }
}

class CreateEntryForm extends Component {
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
          entryDate: new Date(),
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

  renderActivityItems() {
    let activityOptions;
    if (this.props.tile) {
      activityOptions = this.props.tile.activityOptions;
      return (
        activityOptions.sort().map((activity) => {
          return <MenuItem className='entry-activity-item' key={activity} value={activity} primaryText={activity}/>
        })
      )
    }
  }

  renderTextField({input, label, meta: {touched, error}, ...custom}) {
    return (
      <TextField
        className='entry-text-field'
        hintText={label}
        floatingLabelText={label}
        errorText={touched && error}
        {...input}
        {...custom}
        underlineFocusStyle={customStyles.underlineStyle}
      />
    )
  }

  // shouldDisableDate={(date) => {return date > new Date()}}
  // Disables dates after today
  renderDatePicker({input, label, meta: {touched, error}, ...custom}) {
    return (
      <DatePicker
        {...custom}
        underlineStyle={{display: 'none'}}
        className="entry-date-field"
        hintText={label}
        onChange={(e, val) => {return input.onChange(val)}}
        shouldDisableDate={(date) => {return date > new Date()}}
        value={input.value}
        />
    )
  }

  renderMinutesSlider({input, label, meta: {touched, error}, ...custom}) {
    return (
      <div className='minute-slider'>
        <Slider
          defaultValue={0}
          className='slider'
          step={15}
          min={0}
          max={60}
          onChange={(e, val) => {return input.onChange(val)}}
          value={input.value ? input.value : 0}
        />
        <p>{input.value} MIN</p>
      </div>
    )
  }

  renderHoursSlider({input, label, meta: {touched, error}, ...custom}) {
    return (
      <div className='hour-slider'>
        <Slider
          defaultValue={0}
          className='slider'
          step={1}
          min={0}
          max={10}
          onChange={(e, val) => {return input.onChange(val)}}
          value={input.value ? input.value : 0}
        />
        <p>{input.value} HR</p>
      </div>
    )
  }

  renderSelectField({ input,
                      label,
                      meta: {touched, error},
                      children,
                      ...custom }) {
    return (
      <SelectField
        underlineStyle={{display: 'none'}}
        className='entry-select-field'
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
    let hours = Number(values.hours);
    let minutes = Number(values.minutes);
    let totalMinutes = (hours * 60) + minutes;

    let entry = {
      entryDate: values.entryDate,
      activity: values.activity,
      minutes: totalMinutes,
      notes: values.notes
    }

    if (!this.props.entry) {
      this.props.createEntry(this.props.regId, this.props.tileId, entry);
    } else {
      this.props.updateEntry(this.props.regId, this.props.tileId, this.props.cycleId, this.props.entry._id, entry);
    }
    this.props.closeForm();
  }


  render() {
    const { handleSubmit, reset } = this.props;

    return (
      <div className='create-entry-container'>
        <form className='create-entry-form' onSubmit={handleSubmit(this.onSubmit.bind(this))}>

          <div className='create-entry-date-activity'>
            <Field name='entryDate' component={this.renderDatePicker} label='Date' />
            <Field name='activity' style={{ width: 258 }} component={this.renderSelectField} label='Activity'>
              {this.renderActivityItems()}
            </Field>
          </div>

          <div className='create-entry-sliders'>
            <Field name='hours' component={this.renderHoursSlider}/>
            <Field name='minutes' component={this.renderMinutesSlider}/>
          </div>

          <div className='create-entry-notes'>
            <Field
              name='notes'
              component={this.renderTextField}
              label='Notes'
            />
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
  //   'hours', 'minutes', 'entryDate'
  // ]

  const numericFields = [
    'hours', 'minutes'
  ]

  // requiredFields.forEach(field => {
  //   if (!values[field]) {
  //     errors[field] = 'Required'
  //   }
  // });


  numericFields.forEach(field => {
    if (isNaN(Number(values[field]))) {
      errors[field] = 'Must be a number'
    }
  });

  return errors;
}

function mapStateToProps(state) {
  return { tile: state.user.tile };
}

export default reduxForm({
  validate,
  form: 'CreateEntryForm'
})(
  connect(mapStateToProps, { createEntry, updateEntry })(CreateEntryForm)
);
