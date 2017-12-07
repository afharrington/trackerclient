import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import UserTilesContainer from '../../components/UserTilesContainer';
import UserEntries from '../../components/UserEntries';
import PageWrapper from '../../components/PageWrapper';
import UserHeader from '../../components/UserHeader';
import UserInfo from './UserInfo';
import { fetchUser, fetchActiveProgramTiles } from '../../actions/userActions';
import './userHome.css';

// Shows all tiles for a single user
class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      viewType: 'userProgram',
      visibleTile: null
    }

  this.setViewType = this.setViewType.bind(this);
  this.setVisibleTile = this.setVisibleTile.bind(this);
  }

  setVisibleTile(tile) {
    this.setState({ visibleTile: tile });
    this.setState({ viewType: 'userTile' });
  }

  setViewType(viewType) {
    this.setState({ viewType: viewType });
  }

  componentDidMount() {
    this.props.fetchUser();
    this.props.fetchActiveProgramTiles();
  }

  renderHeader() {
    if (this.props.user) {
      const { firstName, lastName, userPrograms, activeUserProgram } = this.props.user;

      return (
        <UserHeader
          userType='user'
          firstName={firstName}
          lastName={lastName}
          activeUserProgram={activeUserProgram}
          setViewType={this.setViewType}
          currentView={this.state.viewType} />
      )
    }
  }

  renderView() {

    if (this.state.viewType === 'userProgram') {
      return (
        <UserTilesContainer
          setVisibleTile={this.setVisibleTile}
          userTiles={this.props.userTiles}
          user={this.props.user} />
      )
    } else if (this.state.viewType === 'userTile') {
      return (
        <UserEntries
          user={this.props.user}
          userId={this.props.user._id}
          userTileId={this.state.visibleTile} />
      )
    }
  }


  render() {
    if (_.isEmpty(this.props.user) == false) {
      return (
        <div className='user-home'>
          { this.renderHeader()}
          { this.renderView() }
        </div>
      )
    } else {
      return <div></div>
    }
  }

};

function mapStateToProps(state) {
  return {
    user: state.user.user,
    userTiles: state.user.userProgramTiles
  };
}

export default connect(mapStateToProps, { fetchUser, fetchActiveProgramTiles })(UserHome);
