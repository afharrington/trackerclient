import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import UserTile from '../../components/UserTile';
import { adminFetchUser } from '../../actions/adminUserActions';
import './adminUserTilesView.css';

// Shows all tiles for a single user
class AdminUserTilesView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewForm: false,
      showEditForm: false,
      userId: this.props.match.params.userId
    }
  }

  componentDidMount() {
    this.props.adminFetchUser(this.state.userId);
  }

  renderHeader() {
    if (this.props.user) {
      const { firstName, lastName, userRegimens, activeRegimen } = this.props.user;

      return (
          <div className='admin-regimen-title-container'>
            <h1>{firstName} {lastName}</h1>
            <h2>{userRegimens[activeRegimen].userRegimenName}</h2>
          </div>
      )
    }
  }

  renderTiles() {
    if (this.props.user) {
      let regimen = this.props.user.userRegimens[0];
      let userTiles = _.mapKeys(regimen.userTiles, '_id');
      if (userTiles) {
        return _.map(userTiles, tile => {
          return (
            <Link key={tile._id} to={`/admin/user/${this.state.userId}/reg/${regimen._id}/tile/${tile._id}`}>
              <UserTile tile={tile} />
            </Link>
          )
        });
      }
    }
  }

  render() {
    return (
      <PageWrapper>
        <div className='admin-user-tiles-view'>
            { this.renderHeader() }
          <div className='regimen-tiles-container'>
            { this.renderTiles() }
          </div>
        </div>
      </PageWrapper>
    )
  }
};

function mapStateToProps(state) {
  return { user: state.adminUsers.user};
}

export default connect(mapStateToProps, { adminFetchUser })(AdminUserTilesView);
