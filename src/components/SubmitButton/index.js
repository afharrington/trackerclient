import React from 'react';
import './submitButton.css';

const SubmitButton = props => (
  <div className='submit-button-container'>
    <input className='submit-button' type="submit" value={props.buttonLabel} />
  </div>
);

export default SubmitButton;
