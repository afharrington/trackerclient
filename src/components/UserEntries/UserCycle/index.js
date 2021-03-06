import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import Moment from 'react-moment';
import Divider from 'material-ui/Divider';
import Entry from '../Entry';
import { Line } from 'rc-progress';

import './userCycle.css';

class UserCycle extends Component {

  constructor(props) {
    super(props);
    this.state = {
      expanded: false
    }
  }

  componentDidMount() {
    this.setState({ expanded: this.props.expanded });
  }

  toggleEntries() {
    if (this.state.expanded) {
      this.setState({ expanded: false });
    } else {
      this.setState({ expanded: true });
    }
  }

  renderEntriesLabels() {
    return (
      <div className='cycle-header-labels'>
        <div className='cycle-date-label'>
          <p>Date</p>
        </div>
        <div className='cycle-duration-label'>
          <p>Duration</p>
        </div>
        <div className='cycle-activity-label'>
          <p>Activity</p>
        </div>
        <div className='cycle-notes-label'>
          <p>Notes</p>
        </div>
      </div>
    )
  }

  renderEntries() {
    let cycle = this.props.cycle;
    if (cycle) {
      return cycle.cycleEntries.map(entry => {
        return (
          <div key={entry._id} >
            <Entry
              userType={this.props.userType}
              userId={this.props.userId}
              tileId={this.props.tileId}
              cycleId={cycle._id}
              entry={entry}
              toggleEditForm={this.props.toggleEditForm}
              />
            <Divider/>
          </div>
        )
      })
    } else {
      return <div></div>
    }
  }

  render() {
    let color = Math.floor(this.props.cycle.color);
    let cycleHeaderClassName = `user-cycle-header color-${color}`;
    let hours = Math.floor(this.props.cycle.cycleTotalMinutes / 60);
    let minutes = this.props.cycle.cycleTotalMinutes % 60;
    return (
      <div className='user-cycle'>
        <div className='user-cycle-header'>
          <Line className='user-cycle-progress' percent={this.props.cycle.cyclePercent.toString()} strokeWidth='1' strokeColor="#00c7a9" trailWidth="1" strokeLinecap="square" trailColor="#333"/>

          <div className='user-cycle-header-text'>
            <div className='user-cycle-dates'>
              <Moment format='M/DD' date={this.props.cycle.cycleStartDate}/> -
              <Moment format='M/DD' date={this.props.cycle.cycleEndDate}/>
            </div>
            <div className='user-cycle-minutes'>{hours} hr {minutes} min</div>
            <div className='cycle-expand-icon'>{this.state.expanded ? <FontAwesome onClick={this.toggleEntries.bind(this)} name='chevron-down'/> : <FontAwesome onClick={this.toggleEntries.bind(this)} name='chevron-right'/> }</div>
          </div>
        </div>

        <div className='cycle-entries-container'>
          { this.state.expanded ? this.renderEntriesLabels() : <div></div> }
          { this.state.expanded ? this.renderEntries() : <div></div> }
        </div>
        <div>
        </div>
      </div>
    )
  }
};


export default UserCycle;
