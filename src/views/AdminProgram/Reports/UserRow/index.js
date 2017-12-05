import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { Line } from 'rc-progress';

import './userRow.css';

class UserRow extends Component {

  componentDidMount() {
  }

  renderLast3Cycles() {
    let previousCycles = this.props.cycles.slice(1);

    return previousCycles.map(cycle => {
      let className;
      if (cycle) {
        // className = `previous-cycle color-${Math.floor(cycle.color)}`;
        className = `previous-cycle`;
        return (
          <div key={cycle._id} className={className}>
            <p>{cycle.cyclePercent}</p>
          </div>
        )
      } else {
          return <div></div>
        }
      });
    }

  renderProgressBar() {
    if (this.props.progress !== 0) {
      return (
        <div className='user-row-progress'>
          <Line percent={this.props.progress}
            strokeWidth='1'
            strokeLinecap='square'
            strokeColor='#00c7a9'
            trailWidth='0'
            className='progress-bar'
          />
          <p className='progress-percent row-text'>{this.props.progress}%</p>
        </div>
      )
    } else {
      return <div className='user-row-progress'>0%</div>
    }
  }

  // Need to get user Id and tile color
  // Sort by percent

  render() {
    return (
      <Link to={`/admin/user/${this.props.userId}`}>
        <div className='user-row'>
          <div className='user-row-name'>
            <p className='row-text'>{this.props.name}</p>
          </div>
          <div className='user-row-cycle'>
            <p className='row-text'><Moment format='MM/DD' date={this.props.start}/></p>
          </div>
            {this.renderProgressBar()}
          <div className='user-row-last3'>
            {this.renderLast3Cycles()}
          </div>
        </div>
      </Link>
    )
  }
};

export default UserRow;
