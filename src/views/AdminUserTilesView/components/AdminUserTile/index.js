import React, { Component } from 'react';
import Moment from 'react-moment';

// Right now styles are coming from UserTilesView/components/UserTile/userTile.scss

class AdminUserTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false
    }
  }

  renderTime() {
    let totalMinutes = 0;
    if (this.props.tile.cycles.length !== 0)  {
      totalMinutes = this.props.tile.cycles[0].cycleTotalMinutes;
    }
    let hours = Math.floor(totalMinutes / 60);
    let minutes = totalMinutes % 60;

    if (totalMinutes === 0) {
      return <div className='no-entries-message'>No entries</div>
    } else {
      return (
        <div>
          <div className='user-tile-hours'>
            <p className='user-time'>{hours}</p>
            <p className='user-tile-label'>hr</p>
          </div>
          <div className='user-tile-minutes'>
            <p className='user-time'>{minutes}</p>
            <p className='user-tile-label'>min</p>
          </div>
        </div>
      )
    }
  }

  renderNextCycle() {
    let cycle = this.props.tile.cycles[0];
    if (cycle) {
      return (
        <div>
          <p><span className='user-tile-details-label'>Next Cycle:</span>
          <Moment className='user-tile-date' format='L' date={this.props.tile.cycles[0].cycleNextDate}/></p>
        </div>
      )
    } else {
      return (
        <div></div>
      )
    }
  }

  render() {
    let label = this.props.tile.goalHours === 1 ? 'hr' : 'hrs';
    let color = 0;
    let tileColorBlock;
    if (this.props.tile.cycles[0]) {
      color = Math.floor(this.props.tile.cycles[0].color);
    }
    tileColorBlock = `tile-color-block color-${color}`;

    return (
      <div className='user-tile'>

        <div className={tileColorBlock}>
          <p>{this.props.tile.userTileName}</p>
        </div>

        <div className='user-tile-time'>
          {this.renderTime()}
        </div>

        <div className='user-tile-details'>
          <div className='user-tile-goal'>
            <p><span className='user-tile-details-label'>Goal:</span>
            {this.props.tile.goalHours} {label}</p>
          </div>
          <div className='user-tile-cycle'>
            {this.renderNextCycle()}
          </div>
        </div>
      </div>
    )
  }
};


export default AdminUserTile;
