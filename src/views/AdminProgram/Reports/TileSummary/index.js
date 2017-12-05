import React, { Component } from 'react';
import UserRow from '../UserRow';
import _ from 'lodash';
import { connect } from 'react-redux';
import { adminFetchTileUserTiles } from '../../../../actions/adminProgramActions';
import './tileSummary.css';

class TileSummary extends Component {

  componentDidMount() {
    this.props.adminFetchTileUserTiles(this.props.tileId);
  }

  renderTileSummaryHeader() {
    if (this.props.userTiles) {
      let userTiles = this.props.userTiles[this.props.tileId];
      if (userTiles) {
        return <div className='tile-summary-header'>
            <p>{userTiles[0].userTileName}</p>
          </div>
      }
    }
  }

  renderUserInfoLabels() {
    if (this.props.userTiles) {
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
              <p>Last 3 Cycles (%)</p>
            </div>
          </div>
        )
    }
  }

  renderUserInfo() {
    if (this.props.userTiles) {
      let userTiles = this.props.userTiles[this.props.tileId];
      if (userTiles) {
        userTiles.sort(function (a, b) {
          return b.cycles[0].cyclePercent - a.cycles[0].cyclePercent;
        });

        return userTiles.map(userTile => {
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
        });
      }
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

function mapStateToProps(state) {
  return {
    userTiles: state.adminPrograms.userTiles
  };
}

export default connect(mapStateToProps, { adminFetchTileUserTiles })(TileSummary);
