import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'

const UserInfoProgramsList = (props) => {

  function renderPrograms() {
    let regimens = props.regimens;
    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <option value={regimen._id} key={regimen._id}>
            {regimen.regimenName}
          </option>
        )
      });
    }
  }

  return (
    <div className='user-info-item'>
      <p className='user-info-item-label'>{props.label}:</p>
      <Field name={props.name} component='select'>
        {renderPrograms()}
      </Field>
    </div>
  )
}

export default UserInfoProgramsList;
