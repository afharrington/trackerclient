import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import _ from 'lodash';
import UserTilesContainer from '../../components/UserTilesContainer';
import AdminPageHeader from '../../components/AdminPageHeader';
import UserEntries from '../../components/UserEntries';
import AdminUserInfo from './AdminUserInfo';
import UserHeader from '../../components/UserHeader';
import { adminFetchUser } from '../../actions/adminUserActions';
import './adminUser.css';

class AdminUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.userId,
      viewType: 'userProgram', // switch between userProgram and userTile
      visibleTile: null, // will have an id value if viewType is entries
    }
    this.setVisibleTile = this.setVisibleTile.bind(this);
    this.setViewType = this.setViewType.bind(this);
  }

  componentDidMount() {
    this.props.adminFetchUser(this.props.match.params.userId);
  }

  setVisibleTile(tile) {
    this.setState({ visibleTile: tile });
    this.setState({ viewType: 'userTile' });
  }

  setViewType(viewType) {
    this.setState({ viewType: viewType });
  }

  renderHeader() {
    if (this.props.user) {
      const { firstName, lastName, activeUserProgram } = this.props.user;

      return (
        <UserHeader
          firstName={firstName}
          lastName={lastName}
          activeUserProgram={activeUserProgram}
          setViewType={this.setViewType}
          currentView={this.state.viewType}
        />
      )
    }
  }

  renderView() {
    if (this.state.viewType === 'info') {
      return <AdminUserInfo />

    } else if (this.state.viewType === 'userProgram') {
      return (
        <UserTilesContainer
          setVisibleTile={this.setVisibleTile}
          userProgram={this.props.user.activeUserProgram} />
      )

    } else if (this.state.viewType === 'userTile') {

      return (
        <UserEntries
          user={this.props.user}
          userId={this.props.user._id}
          userTileId={this.state.visibleTile}
        />
      )
    }
  }


  render() {
    if (this.props.user) {
      return (
        <div className='admin-user-view'>
          <AdminPageHeader/>
          { this.renderHeader() }
          { this.renderView() }
        </div>
      )
    } else {
      return <div></div>
    }
  }
}


function mapStateToProps(state) {
  return {
    user: state.adminUsers.user
  };
}

export default connect(mapStateToProps, { adminFetchUser })(AdminUser);
