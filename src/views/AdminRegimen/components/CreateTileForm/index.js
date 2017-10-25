import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FormButtons from '../../../../components/FormButtons';
import { createTile, updateTile } from '../../../../actions/adminRegimenActions';
import './createTileForm.css';


const customStyles = {
  underlineStyle: {
    borderColor: '#333'
  }
}

const renderActivityField = ({input}) => (
  <div>
    <TextField
      className='text-field'
      {...input}
      underlineFocusStyle={customStyles.underlineStyle}
    />
  </div>
)

class CreateTileForm extends Component {
  constructor(props) {
    super(props);

    if (this.props.tile) {
      this.state = {
        initialData: {
          tileName: this.props.tile.tileName,
          goalHours: this.props.tile.goalHours,
          goalCycle: this.props.tile.goalCycle.toString(),
          activityOptions: this.props.tile.activityOptions
        }
      }
    } else {
      this.state = {
        initialData: {
          tileName: '',
          goalHours: 1,
          goalCycle: '7'
        }
      }
    }
  }

  componentDidMount() {
  this.props.initialize(this.state.initialData);
  // Scroll back to the top where the form us (for mobile)
  if (this.props.tile) {
      window.scrollTo(0, 0);
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

  // Renders entire Activities section
  renderActivities({ fields }) {
    return (
      <div className='tile-activities'>
        <div className='activities'>
          {fields.map((activity, index) =>
            <div className='activity-item' key={index}>
              <Field
                name={activity}
                type='text'
                component={renderActivityField} />
              <button
                type="button"
                title="Remove"
                onClick={() => fields.remove(index)}>
                <FontAwesome name='times'/>
              </button>
            </div>
          )}
          {fields.error && <div className="error">{fields.error}</div>}
        </div>
        <button className='new-activity-button' type="button" onClick={() => fields.push()}>
          <FontAwesome className='plus' name='plus'/>Add activity
        </button>
      </div>
    )
  }

  onSubmit(values) {
    if (values.activityOptions) {
      values.activityOptions = values.activityOptions.filter((activity) => { return activity !== undefined });
    }
    
    if (!this.props.tile) {
      this.props.createTile(this.props.regimenId, values);
    } else {
      let tileId = this.props.tile._id;
      this.props.updateTile(this.props.regimenId, tileId, values);
    }
    this.props.closeForm();
  }

  render() {
    const { handleSubmit, reset } = this.props;

    return (
      <div className='tile-form-container'>
        <form className='tile-form' onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div className='tile-form-name'>
            <Field
              name='tileName'
              component={this.renderTextField}
              label='Tile Name' />
          </div>
          <div className='tile-form-hours-cycle'>
            <div className='tile-form-hours'>
              <Field
                name='goalHours'
                component={this.renderTextField} >
              </Field>
              <p>hours per</p>
            </div>
            <div className='tile-form-cycle'>
              <Field
                name='goalCycle'
                component={this.renderSelectField}
                label='Cycle Length'>
                <MenuItem value='2' primaryText='2-day'/>
                <MenuItem value='3' primaryText='3-day'/>
                <MenuItem value='5' primaryText='5-day'/>
                <MenuItem value='7' primaryText='7-day'/>
                <MenuItem value='14' primaryText='14-day' />
                <MenuItem value='30' primaryText='30-day' />
              </Field>
              <p>cycle</p>
            </div>
          </div>
          <FieldArray name='activityOptions' component={this.renderActivities}/>
          <FormButtons
            onSubmitClick={handleSubmit(this.onSubmit.bind(this))}
            onClearClick={reset}
            onCloseClick={this.props.closeForm}
          />
        </form>
      </div>
    )
  }
}

function validate(values) {
  const errors = {}
  // const requiredFields = [
  //   'tileName', 'goalHours', 'goalCycle'
  // ]

  // requiredFields.forEach(field => {
  //   if (!values[field]) {
  //     errors[field] = 'Required'
  //   }
  // })

  if (values.goalHours) {
    if (isNaN(Number(values.goalHours))) {
      errors.goalHours = 'Must be a number';
    }
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'CreateTileForm'
})(
  connect(null, { createTile, updateTile })(CreateTileForm)
);
