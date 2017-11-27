import React from 'react';
import { Field, reduxForm } from 'redux-form'

const UserInfoSportsList = (props) => {
  function renderSports() {
    let sports = ['basketball', 'soccer', 'volleyball', 'hockey', 'football', 'track & field', 'lacrosse'];

    return (
      sports.sort().map((sport) => {
        return <option className='sport-item' key={sport} value={sport}>{sport}</option>
      })
    )
  }

  return (
    <div className='user-info-item'>
      <p className='user-info-item-label'>{props.label}:</p>
      <Field name={props.name} component='select'>
        {renderSports()}
      </Field>
    </div>
  )
}

export default UserInfoSportsList;
