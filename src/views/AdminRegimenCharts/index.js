import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRegimen } from '../../actions/adminRegimenActions';
import { adminFetchUserRegimens } from '../../actions/adminUserActions';
import BreadcrumbHeader from '../../components/BreadcrumbHeader';
import TileSummary from './components/TileSummary';

import './adminRegimenCharts.scss';

class AdminRegimenCharts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userTilesByTile: []
    }
  }

  componentDidMount() {
    this.props.fetchRegimen(this.props.match.params.regimenId);
    this.props.adminFetchUserRegimens(this.props.match.params.regimenId);
  }

  renderTileSummaries() {
    let userTileSets;

    if (this.props.regimen && this.props.userRegimens) {
      let regimenTiles = this.props.regimen.tiles;

      // Creates a set of user tiles corresponding with each regimen tile

      // For each tile "template"
      userTileSets = regimenTiles.map(regimenTile => {

        // Return a list created by mapping over each User Regimen (regimen instance)
        return this.props.userRegimens.map(userRegimen => {

          // Then mapping over each userTile (tile instance)
          return userRegimen.userTiles.find(userTile => {

            // And returning the userTile that matches the tile template
            return userTile.fromTile.toString() === regimenTile._id;
          })
        });
      });
    }

    if (userTileSets) {
      return userTileSets.map(set => {
        return <TileSummary
          userTiles={set}
          />
      })
    }
  }

  render() {
    return (
      <div className='admin-regimen-charts'>
        <BreadcrumbHeader
          linkLocation='/'
          link='Regimens'
          pageTitle={this.props.regimen.regimenName}/>

        <div className='tile-charts'>
          {this.renderTileSummaries()}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { regimen: state.adminRegimens, userRegimens: state.adminUsers.userRegimens };
}

export default connect(mapStateToProps, { fetchRegimen, adminFetchUserRegimens })(AdminRegimenCharts);
