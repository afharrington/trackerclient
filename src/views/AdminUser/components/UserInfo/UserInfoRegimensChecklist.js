import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form'
import _ from 'lodash';

class UserInfoRegimensChecklist extends Component {

  renderRegimens() {
    let regimens = this.props.regimens;

    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <div className='checklist-item' key={regimen._id}>
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

  render() {
    return (
      <div className='user-info-item'>
        <p className='label'>{this.props.label}:</p>
        <div className='user-info-regimens'>
        {this.renderRegimens()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return { regimens: state.adminRegimens};
}

export default connect(mapStateToProps)(UserInfoRegimensChecklist);
