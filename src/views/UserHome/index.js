import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import UserTilesContainer from '../../components/UserTilesContainer';
import UserEntries from '../../components/UserEntries';
import PageWrapper from '../../components/PageWrapper';
import UserHeader from '../../components/UserHeader';
import UserInfo from './UserInfo';
import ChangePasswordForm from './ChangePasswordForm';
import { fetchUser, fetchUserProgram } from '../../actions/userActions';
import './userHome.css';

// Shows all tiles for a single user
class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.match.params.userId,
      showNewForm: false,
      showEditForm: false,
      showChangePasswordForm: true,
      viewType: 'userProgram',
      visibleUserProgram: null,
      visibleTile: null
    }

  this.setVisibleUserProgram = this.setVisibleUserProgram.bind(this);
  this.setVisibleTile = this.setVisibleTile.bind(this);
  this.toggleChangePasswordForm = this.toggleChangePasswordForm.bind(this);
  }

  setVisibleUserProgram(programId) {
    this.setState({ visibleUserProgram: programId });
    this.props.fetchUser(this.props.user._id);
    this.props.fetchUserProgram(programId);
    this.setState({ viewType: 'userProgram' })
  }

  setVisibleTile(tile) {
    this.setState({ visibleTile: tile });
    this.setState({ viewType: 'userTile' });
  }

  toggleChangePasswordForm() {
    this.setState({ showChangePasswordForm: !this.state.showChangePasswordForm });
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  renderHeader() {
    if (this.props.user) {
      const { firstName, lastName, userPrograms, activeUserProgram } = this.props.user;

      return (
        <UserHeader
          visibleUserProgram={ this.state.visibleUserProgram || activeUserProgram._id}
          setVisibleUserProgram={this.setVisibleUserProgram}
          firstName={firstName}
          lastName={lastName}
          userPrograms={userPrograms}
          activeUserProgram={activeUserProgram}/>
      )
    }
  }

  renderView() {
    if (this.state.visibleUserProgram === 'info') {
      return <UserInfo changePassword={this.toggleChangePasswordForm}/>

    } else if (this.state.viewType === 'userProgram') {
      return (
        <UserTilesContainer
          setVisibleTile={this.setVisibleTile}
          userProgram={this.props.userProgram || this.props.user.activeUserProgram} />
      )
    } else if (this.state.viewType === 'userTile') {
      return (
        <UserEntries
          tileId={this.state.visibleTile}
          regId={this.state.visibleUserProgram || this.props.user.activeUserProgram._id }
        />
      )
    }
  }


  render() {
    if (_.isEmpty(this.props.user) == false) {
      return (
        <PageWrapper textColor='white'>
          { this.state.showChangePasswordForm &&
            <ChangePasswordForm user={this.props.user} exit={this.toggleChangePasswordForm}/>
          }
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
    userProgram: state.user.userProgram
  };
}

export default connect(mapStateToProps, { fetchUser, fetchUserProgram })(UserHome);
