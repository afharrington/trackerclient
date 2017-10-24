import FontAwesome from 'react-fontawesome';
import React from 'react'
import './formButtons.css';

const FormButtons = props => {
  return (
    <div className='form-buttons'>
      <button className='submit-button' type='submit' onClick={props.onSubmitClick}>Save</button>
      <button className='clear-button' type='button' onClick={props.onClearClick}><FontAwesome name='refresh'/></button>
      <button className='close-button' type='button' onClick={props.onCloseClick}><FontAwesome name='times'/></button>
    </div>
  )
}

export default FormButtons;
