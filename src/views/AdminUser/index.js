import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import UserTilesContainer from '../../components/UserTilesContainer';
import UserInfo from './components/UserInfo';
import UserHeader from '../../components/UserHeader';
import { adminFetchUser } from '../../actions/adminUserActions';
import './adminUser.css';

// Shows all tiles for a single user
class AdminUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userId: this.props.match.params.userId,
      view: 'activeUserRegimen'
    }

    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    this.props.adminFetchUser(this.state.userId);
  }

  setView(selection) {
    this.setState({ view: selection});
  }

  renderHeader() {
    if (this.props.user) {
      const { firstName, lastName, userRegimens, activeUserRegimen } = this.props.user;

      return (
        <UserHeader
          activeView={this.state.view}
          setView={this.setView}
          firstName={firstName}
          lastName={lastName}
          userRegimens={userRegimens}
          activeUserRegimen={activeUserRegimen}/>
      )
    }
  }

  renderView() {
    if (this.state.view == 'info') {
      console.log('info!');
      return <UserInfo />
    }

  }

  // renderTiles() {
  //   if (this.props.user) {
  //     const { userRegimens, activeRegimen } = this.props.user;
  //     let regimen = userRegimens[activeRegimen];
  //     let userTiles = _.mapKeys(regimen.userTiles, '_id');
  //
  //     if (userTiles) {
  //       return <UserTilesContainer
  //         tiles={userTiles}
  //         regimenId={regimen._id}
  //         userId={this.state.userId}
  //       />
  //       // return _.map(userTiles, tile => {
  //       //   return (
  //       //     <Link key={tile._id} to={`/admin/user/${this.state.userId}/reg/${regimen._id}/tile/${tile._id}`}>
  //       //       <UserTile tile={tile} />
  //       //     </Link>
  //       //   )
  //       // });
  //     }
  //   }
  // }

  render() {
    // if (this.props.user) {
    //   const { userRegimens, activeRegimen } = this.props.user;
    //   let regimen = userRegimens[activeRegimen];
    //   let userTiles = _.mapKeys(regimen.userTiles, '_id');
    // }

    return (
      <PageWrapper>
        <div className='admin-user-view'>
          { this.renderHeader() }
          { this.renderView() }
          {/* <UserTilesContainer
            view={this.state.view}
          /> */}
        </div>
      </PageWrapper>
    )
  }
}


function mapStateToProps(state) {
  return { user: state.adminUsers.user};
}

export default connect(mapStateToProps, { adminFetchUser })(AdminUser);
