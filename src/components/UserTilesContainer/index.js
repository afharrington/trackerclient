import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserTile from '../UserTile';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import { adminFetchUserRegimen } from '../../actions/adminUserActions';
import './userTilesContainer.css';

class UserTilesContainer extends Component {

  renderTiles() {
    let userRegimen = this.props.userRegimen;
    let user = this.props.user;
    let tiles = userRegimen.userTiles;

    if (tiles) {
      return tiles.map(tile => {
        return (
          <UserTile
            key={tile._id}
            setVisibleTile={this.props.setVisibleTile}
            tile={tile} />
        )
      });
    }
  }

  render() {
    if (this.props.userRegimen) {
      return (
        <div className='user-tiles-container'>
          { this.renderTiles() }
        </div>
      )
    } else {
      return <div></div>
    }

  }
};

function mapStateToProps(state) {
  return { user: state.adminUsers.user };
}

export default connect(mapStateToProps)(UserTilesContainer);
