import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'

const UserInfoProgramsList = (props) => {

  function renderPrograms() {
    let programs = props.programs;
    if (programs) {
      return _.map(programs, program => {
        return (
          <option value={program._id} key={program._id}>
            {program.programName}
          </option>
        )
      });
    }
  }

  return (
    <div className='user-info-item'>
      <p className='user-info-item-label'>{props.label}:</p>
      <Field name={props.name} component='select'>
        <option></option>
        {renderPrograms()}
      </Field>
    </div>
  )
}

export default UserInfoProgramsList;
