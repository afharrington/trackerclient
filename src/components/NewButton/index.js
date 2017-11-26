import React from 'react';
import FontAwesome from 'react-fontawesome';
import './newButton.css';

const NewButton = props => (
  <div className='new-button'>
    <button onClick={props.onClick}>
      {props.text}
    </button>
  </div>
);

export default NewButton;
