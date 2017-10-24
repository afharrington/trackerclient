import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './showButton.scss';

const ShowButton = props => (
  <div className='show-button'>
    <button onClick={props.onClick}>
      <FontAwesome className='down' name='chevron-down'/> {props.text}
    </button>
  </div>
);

export default ShowButton;
