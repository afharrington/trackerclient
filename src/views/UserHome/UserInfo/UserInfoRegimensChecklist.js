import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash';

class UserInfoProgramsChecklist extends Component {

  renderPrograms() {
    let programs = this.props.programs;

    if (programs) {
      return _.map(programs, program => {
        return (
          <div className='checklist-item' key={program._id}>
            <Field
             name={`programs[${program._id}]`}
             id={`${program._id}`}
             component="input"
             type="checkbox"
            />
            <label>{program.programName}</label>
          </div>
        )
      });
    }
  }

  render() {
    return (
      <div className='user-info-item'>
        <p className='label'>{this.props.label}:</p>
        <div className='user-info-programs'>
        {this.renderPrograms()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { programs: state.adminPrograms};
}

export default connect(mapStateToProps)(UserInfoProgramsChecklist);
