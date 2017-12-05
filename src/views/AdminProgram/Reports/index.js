import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { adminFetchProgramTiles } from '../../../actions/adminProgramActions';
import TileSummary from './TileSummary';

import './reports.css';

class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTilesByTile: []
    }
  }

  componentDidMount() {
    this.props.adminFetchProgramTiles(this.props.programId);
  }

  renderTileSummaries() {
    let tiles = this.props.tiles;


    if (tiles) {
      return _.map(tiles, tile => {
        return <TileSummary
                key={tile._id}
                tileId={tile._id} />
      });
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className='reports'>
        <div className='tile-charts'>
          {this.renderTileSummaries()}
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    tiles: state.adminPrograms.tiles
  };
}

export default connect(mapStateToProps, { adminFetchProgramTiles })(Reports);
