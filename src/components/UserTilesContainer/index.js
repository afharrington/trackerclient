import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserTile from './UserTile';
import RaisedButton from 'material-ui/RaisedButton';
import _ from 'lodash';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import FaTasks from 'react-icons/lib/fa/tasks';
import ContentFilter from 'material-ui/svg-icons/content/filter-list';
import { Link } from 'react-router-dom';
import './userTilesContainer.css';
import 'font-awesome/css/font-awesome.min.css';

class UserTilesContainer extends Component {

  constructor(props) {
    super(props);

    this.state = {
      sortType: 'time',
      sortAscending: true
    }

    this.handleTimeSort = this.handleTimeSort.bind(this);
    this.handleAlphaSort = this.handleAlphaSort.bind(this);
  }

  handleTimeSort() {
    if (this.state.sortType === 'time') {
      this.setState({ sortAscending: !this.state.sortAscending });
    } else {
      this.setState({ sortType: 'time' });
      this.setState({ sortAscending: true });
    }
  }

  handleAlphaSort() {
    if (this.state.sortType === 'alpha') {
      this.setState({ sortAscending: !this.state.sortAscending });
    } else {
      this.setState({ sortType: 'alpha' });
      this.setState({ sortAscending: true });
    }
  }

  renderTiles() {
    let userRegimen = this.props.userRegimen;
    let tiles = userRegimen.userTiles;

    if (tiles) {
      if (this.state.sortType === 'time' && this.state.sortAscending) {
        tiles = tiles.sort(function(a, b){
          return a.cycles[0].cycleTotalMinutes == b.cycles[0].cycleTotalMinutes ? 0 : +(a.cycles[0].cycleTotalMinutes > b.cycles[0].cycleTotalMinutes) || -1;
        });
      } else if (this.state.sortType === 'time' && !(this.state.sortAscending)) {
        tiles = tiles.sort(function(a, b){
          return b.cycles[0].cycleTotalMinutes == a.cycles[0].cycleTotalMinutes ? 0 : +(b.cycles[0].cycleTotalMinutes > a.cycles[0].cycleTotalMinutes) || -1;
        });
      } else if (this.state.sortType === 'alpha' && this.state.sortAscending) {
        tiles = tiles.sort(function(a, b){
          return a.userTileName.toLowerCase() == b.userTileName.toLowerCase() ? 0 : +(a.userTileName.toLowerCase() > b.userTileName.toLowerCase()) || -1;
        });
      } else if (this.state.sortType === 'alpha' && !(this.state.sortAscending)) {
        tiles = tiles.sort(function(a, b){
          return b.userTileName.toLowerCase() == a.userTileName.toLowerCase() ? 0 : +(b.userTileName.toLowerCase() > a.userTileName.toLowerCase()) || -1;
        });
      }

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
          <div className='user-tiles-sort-menu'>
            <IconMenu
              menuItemStyle={{ fontFamily: 'Barlow', textTransform: 'uppercase', fontSize: '12px' }}
              className='entry-menu-icon'
              iconButtonElement={<IconButton><ContentFilter /></IconButton>}
              anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
              targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
            >
              <MenuItem value='time' onClick={this.handleTimeSort} primaryText='Sort By Time' />
              <MenuItem value='alpha' onClick={this.handleAlphaSort} primaryText='Sort Alphabetically' />
            </IconMenu>
          </div>
          { this.renderTiles() }
        </div>
      )
    } else {
      return <div></div>
    }

  }
};

// function mapStateToProps(state) {
//   return { user: state.adminUsers.user };
// }

export default UserTilesContainer;
