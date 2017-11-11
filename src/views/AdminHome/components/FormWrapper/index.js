import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './formWrapper.css';

class FormWrapper extends Component {

  render() {
    return (
      <div className='form-wrapper'>
        <div className='form-wrapper-layer'/>
        <div className='form-wrapper-box'>
          <FontAwesome onClick={this.props.exit} className='form-wrapper-close' name='times' />
          <div className='form-wrapper-content'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}

export default FormWrapper;
