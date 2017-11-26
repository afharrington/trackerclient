import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash';

const CreateUserRegimensChecklist = (props) => {

  function renderRegimens() {
    let regimens = props.regimens;
    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <div className='regimen-checklist-item' key={regimen._id}>
            <Field
             name={`regimens[${regimen._id}]`}
             id={`${regimen._id}`}
             component="input"
             type="checkbox"
            />
            <label>{regimen.regimenName}</label>
          </div>
        )
      });
    }
  }

  return (
    <div className='create-user-form-item'>
      <p className='label'>{props.label}:</p>
      <div className='regimen-checklist-container'>
      {renderRegimens()}
      </div>
    </div>
  )
}

export default CreateUserRegimensChecklist;
