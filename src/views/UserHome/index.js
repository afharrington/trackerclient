import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import UserTilesContainer from '../../components/UserTilesContainer';
import UserEntries from '../../components/UserEntries';
import PageWrapper from '../../components/PageWrapper';
import UserHeader from '../../components/UserHeader';
import UserInfo from './subviews/UserInfo';
import UserTile from './UserTile';
import { fetchUser, fetchUserRegimen } from '../../actions/userActions';
import './userHome.css';

// Shows all tiles for a single user
class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      showNewForm: false,
      showEditForm: false,
      viewType: 'userRegimen',
      visibleUserRegimen: null,
      visibleTile: null
    }

  this.setVisibleUserRegimen = this.setVisibleUserRegimen.bind(this);
  this.setVisibleTile = this.setVisibleTile.bind(this);
  }

  setVisibleUserRegimen(regimenId) {
    this.setState({ visibleUserRegimen: regimenId });
    this.props.fetchUser(this.props.user._id);
    this.props.fetchUserRegimen(regimenId);
    this.setState({ viewType: 'userRegimen' })
  }

  setVisibleTile(tile) {
    this.setState({ visibleTile: tile });
    this.setState({ viewType: 'userTile' });
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  renderHeader() {
    if (this.props.user) {
      const { firstName, lastName, userRegimens, activeUserRegimen } = this.props.user;

      return (
        <UserHeader
          visibleUserRegimen={ this.state.visibleUserRegimen || activeUserRegimen._id}
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
        <UserEntries
          tileId={this.state.visibleTile}
          regId={this.state.visibleUserRegimen || this.props.user.activeUserRegimen._id }
        />
      )
    }
  }


  render() {
    if (_.isEmpty(this.props.user) == false) {
      return (
        <PageWrapper textColor='white'>
          { this.renderHeader()}
          { this.renderView() }
        </PageWrapper>
      )
    } else {
      return <div></div>
    }
  }

};

function mapStateToProps(state) {
  return {
    user: state.user,
    userRegimen: state.user.userRegimen
  };
}

export default connect(mapStateToProps, { fetchUser, fetchUserRegimen })(UserHome);
