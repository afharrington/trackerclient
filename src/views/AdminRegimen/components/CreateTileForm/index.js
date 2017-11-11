import React, { Component } from 'react'
import { Field, FieldArray, reduxForm } from 'redux-form'
import { connect } from 'react-redux';
import FontAwesome from 'react-fontawesome';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import FormButtons from '../../../../components/FormButtons';
import FormWrapper from '../../../../components/FormWrapper';
import { createTile, updateTile } from '../../../../actions/adminRegimenActions';
import './createTileForm.css';

const renderActivityField = ({input}) => (
  <div>
    <TextField
      className='text-field'
      {...input}
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

  renderCycleLengths() {
    let cycles = ['2', '3', '5', '7', '14', '30'];
    return (
      cycles.sort().map((cycle) => {
        return <option className='sport-item' key={cycle} value={cycle}>{cycle}-day</option>
      })
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
                component='input' />
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
    this.props.exit();
  }

  render() {
    const { handleSubmit, reset, submitting, pristine } = this.props;

    return (
      <FormWrapper exit={this.props.exit}>
        <div className='create-tile-form'>
          <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>

            <div className='create-tile-form-field'>
              <Field className='create-tile-form-name' name='tileName' component="input" type="text"/>
            </div>

            <div className='create-tile-form-field'>
              <Field className='create-tile-form-hours' name='goalHours' component="input" type="text"/>
              <label>hours per</label>
            </div>

            <div className='create-tile-form-field'>
              <Field className='create-tile-form-cycle' name='goalCycle' component='select'>
                <option></option>
                {this.renderCycleLengths()}
              </Field>
              <label>cycle</label>
            </div>


            <FieldArray name='activityOptions' component={this.renderActivities}/>

            <div className='create-tile-form-buttons'>
              <button className='submit-button' type="submit" disabled={pristine || submitting}>Submit </button>
              <button className='clear-button' type="button" disabled={pristine || submitting} onClick={reset}>Clear
              </button>

            </div>
          </form>
        </div>
      </FormWrapper>
    )
  }
}

function validate(values) {
  const errors = {}

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
