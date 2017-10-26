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
            <p>{cycle.cyclePercent}%</p>
          </div>
        )
      } else {
          return <div></div>
        }
      });
    }

  renderProgressBar() {
    let color = Math.floor(this.props.color);
    let barColor;
    switch(color) {
      case 0:
        barColor = '#A81D1F'
        break;
      case 1:
        barColor = '#A83E20'
        break;
      case 2:
        barColor = '#A85F22'
        break;
      case 3:
        barColor = '#A87F24'
        break;
      case 4:
        barColor = '#A89E26'
        break;
      case 5:
        barColor = '#95A829'
        break;
      case 6:
        barColor = '#79A82B'
        break;
      case 7:
        barColor = '#5DA82D'
        break;
      case 8:
        barColor = '#42A82F'
        break;
      case 9:
        barColor = '#32A83A'
        break;
      default:
        return barColor = '#A81D1F';
    }
    if (this.props.progress !== 0) {
      return (
        <div className='user-row-progress'>
          <Line percent={this.props.progress}
            strokeWidth='20'
            strokeLinecap='round'
            strokeColor={barColor}
            trailWidth='0'
            className='progress-bar'
          />
          <p className='progress-percent row-text'>{this.props.progress}%</p>
        </div>
      )
    } else {
      return <div className='user-row-progress'></div>
    }
  }

  // Need to get user Id and tile color
  // Sort by percent

  render() {
    return (
      <div className='user-row'>
        <div className='user-row-name'>
          <Link to={`/admin/user/${this.props.userId}`}><p className='row-text'>{this.props.name}</p></Link>
        </div>
        <div className='user-row-cycle'>
          <p className='row-text'><Moment format='MM/DD' date={this.props.start}/></p>
        </div>
          {this.renderProgressBar()}
        <div className='user-row-last3'>
          {this.renderLast3Cycles()}
        </div>
      </div>
    )
  }
};

export default UserRow;
