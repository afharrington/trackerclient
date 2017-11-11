import React, { Component } from 'react';
import './formWrapper.css';

class FormWrapper extends Component {
  render() {
    return (
      <div className='form-wrapper'>
        <div className='form-layer'/>
        <div className='form-content'>
          { this.props.children }
        </div>
      </div>
    )
  }
}

export default FormWrapper;
