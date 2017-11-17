import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import UserTilesContainer from '../../components/UserTilesContainer';
import AdminUserEntries from '../AdminUserEntries';
import UserInfo from './subviews/UserInfo';
import UserHeader from '../../components/UserHeader';
import { adminFetchUser, adminFetchUserRegimen } from '../../actions/adminUserActions';
import './adminUser.css';

// Shows all tiles for a single user
class AdminUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.userId,
      visibleUserRegimen: null,
      viewType: 'userRegimen', // switch between userRegimen and userTile
      visibleTile: null, // will have an id value if viewType is entries
    }

    this.setVisibleUserRegimen = this.setVisibleUserRegimen.bind(this);
    this.setVisibleTile = this.setVisibleTile.bind(this);
  }

  setVisibleUserRegimen(regimenId) {
    this.setState({ visibleUserRegimen: regimenId });
    this.props.adminFetchUserRegimen(this.props.user._id, regimenId);
    this.setState({ viewType: 'userRegimen' })
  }

  componentDidMount() {
    this.props.adminFetchUser(this.state.userId);
  }

  setVisibleTile(tile) {
    this.setState({ visibleTile: tile });
    this.setState({ viewType: 'userTile' });
  }

  renderHeader() {
    if (this.props.user) {
      const { firstName, lastName, userRegimens, activeUserRegimen } = this.props.user;

      return (
        <UserHeader
          visibleUserRegimen={this.state.visibleUserRegimen ||
            activeUserRegimen._id }
          setVisibleUserRegimen={this.setVisibleUserRegimen}
          firstName={firstName}
          lastName={lastName}
          userRegimens={userRegimens}
          activeUserRegimen={activeUserRegimen}/>
      )
    }
  }

  renderView() {
    if (this.state.visibleUserRegimen === 'info') {
      return <UserInfo />

    } else if (this.state.viewType === 'userRegimen') {
      return (
        <UserTilesContainer
          setVisibleTile={this.setVisibleTile}
          userRegimen={this.props.userRegimen || this.props.user.activeUserRegimen} />
      )

    } else if (this.state.viewType === 'userTile') {

      return (
        <AdminUserEntries
          user={this.props.user}
          userId={this.props.user._id}
          tileId={this.state.visibleTile}
          regId={this.props.userRegimen ?
          this.props.userRegimen._id : this.props.user.activeUserRegimen._id}
        />
      )
    }
  }

  render() {
    if (this.props.user) {
      return (
        <PageWrapper>
          <div className='admin-user-view'>
            { this.renderHeader() }
            { this.renderView() }
          </div>
        </PageWrapper>
      )
    } else {
      return <div></div>
    }

  }
}


function mapStateToProps(state) {
  return {
    user: state.adminUsers.user,
    userRegimen: state.adminUsers.userRegimen
  };
}

export default connect(mapStateToProps, { adminFetchUser, adminFetchUserRegimen })(AdminUser);
