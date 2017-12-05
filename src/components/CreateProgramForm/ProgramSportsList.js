import React from 'react';
import { Field, reduxForm } from 'redux-form'

const ProgramSportsList = (props) => {
  function renderSports() {
    let sports = ['basketball', 'soccer', 'volleyball', 'hockey', 'football', 'track & field', 'lacrosse'];

    return (
      sports.sort().map((sport) => {
        return <option className='sport-item' key={sport} value={sport}>{sport}</option>
      })
    )
  }

  return (
    <div className='create-program-item'>
      <p className='create-program-item-label'>{props.label}:</p>
      <Field name={props.name} component='select'>
        <option></option>
        {renderSports()}
      </Field>
    </div>
  )
}

export default ProgramSportsList;
