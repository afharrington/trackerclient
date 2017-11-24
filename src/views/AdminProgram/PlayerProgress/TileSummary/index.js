import React, { Component } from 'react';
import UserRow from '../UserRow';
import './tileSummary.css';

// A Tile Summary is a list of user rows for a single Regimen Tile
// i.e. a list of each user's progress for Mobility

class TileSummary extends Component {

  renderTileSummaryHeader() {
    if (this.props.userTiles[0]) {
      return <div className='tile-summary-header'>
          <p>{this.props.userTiles[0].userTileName}</p>
        </div>
    }
  }

  renderUserInfoLabels() {
    if (this.props.userTiles[0]) {
        return (
          <div className='user-info-labels'>
            <div className='user-name-label'>
              <p>Player</p>
            </div>
            <div className='user-cycle-label'>
              <p>Cycle</p>
            </div>
            <div className='user-progress-label'>
              <p>Progress</p>
            </div>
            <div className='user-last3-label'>
              <p>Previous Cycles</p>
            </div>
          </div>
        )
    }
  }

  renderUserInfo() {
    if (this.props.userTiles) {

      // Sort user rows by current cycle percent;
      this.props.userTiles.sort(function (a, b) {
        return b.cycles[0].cyclePercent - a.cycles[0].cyclePercent;
      });

      return this.props.userTiles.map(userTile => {
        if (userTile.cycles[0] !== undefined) {
          return (
            <UserRow
              key={userTile.userId}
              userId={userTile.userId}
              name={userTile.userName}
              start={userTile.cycles[0].cycleStartDate}
              end={userTile.cycles[0].cycleEndDate}
              color={userTile.cycles[0].color}
              progress={userTile.cycles[0].cyclePercent}
              cycles={userTile.cycles}
            />
          )
        } else {
          return <div></div>
        }
      })
    }
  }

  render() {
    return (
      <div className='tile-summary'>
        {this.renderTileSummaryHeader()}
        <div className='tile-summary-users-container'>
          {this.renderUserInfoLabels()}
          <div className='user-rows-container'>
            {this.renderUserInfo()}
          </div>
        </div>
      </div>
    )
  }
};


export default TileSummary;
