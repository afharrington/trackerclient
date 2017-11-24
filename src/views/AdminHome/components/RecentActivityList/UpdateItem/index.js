import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import './updateItem.css';

class UpdateItem extends Component {

  render() {
    let activity = this.props.activity;

    return (
      <div className='update-item'>
        <div>
          <p><span className='update-item-name'>{activity.userName}</span>
          spent
          <span className='update-item-minutes'> {activity.minutes}</span>
          minutes on
          <span className='update-item-tile'>{activity.tileName}</span></p>
        </div>
        <div className='update-item-date'>
          <p><Moment format='LLL' date={activity.entryDate}/></p>
        </div>
      </div>
      )
    }
  };

  export default UpdateItem;
