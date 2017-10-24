import React from 'react';
import FontAwesome from 'react-fontawesome';
import './newButton.css';

const NewButton = props => (
  <div className='new-button'>
    <button onClick={props.onClick}>
      <FontAwesome className='plus' name='plus'/> {props.text}
    </button>
  </div>
);

export default NewButton;
