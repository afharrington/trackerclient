import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import moment from 'moment';
import './recentActivityItem.css';

class RecentActivityItem extends Component {


  render() {
    let activity = this.props.activity;
    return (
      <div className='recent-activity-item'>
        <div className='user'>
          <p className='name'>{activity.userName}</p>
          <p className='active-regimen'>Swingman</p>
        </div>
        <div className='activity-info'>
          <p className='tile-name'>{activity.tileName}</p>
          <p className='activity'>{activity.activity}</p>
        </div>
        <div className='time'>
          <p className='minutes'>{activity.minutes} min</p>
          <p className='date'><Moment fromNow>{activity.entryDate}</Moment></p>
        </div>
      </div>
      )
    }
  };

  export default RecentActivityItem;
