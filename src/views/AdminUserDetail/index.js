import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import BreadcrumbHeader from '../../components/BreadcrumbHeader';
import UserTile from '../UserHome/components/UserTile';
import { adminFetchUser } from '../../actions/adminUserActions';
import './adminUserDetail.css';

class AdminUserDetail extends Component {
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
    let user = this.props.user;
    if (user) {
      return (
        <BreadcrumbHeader
          linkLocation='/'
          link='Players'
          pageTitle={`${user.firstName} ${user.lastName}`}
          subheading={user.userRegimen.userRegimenName}/>

      )
    }
  }

  renderTiles() {
    let user = this.props.user;
    if (user) {
      let regimen = this.props.user.userRegimen;
      let userTiles = _.mapKeys(regimen.userTiles, '_id');
      if (userTiles) {
        return _.map(userTiles, tile => {
          return (
            <Link key={tile._id} to={`/admin/user/${this.state.userId}/tile/${tile._id}`}>
              <UserTile tile={tile} />
            </Link>
          )
        });
      }
    }
  }

  render() {
    return (
      <div className='admin-user-detail'>
        {this.renderHeader()}
        <div className='regimen-tiles-container'>
          { this.renderTiles() }
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { user: state.adminUsers.user};
}

export default connect(mapStateToProps, { adminFetchUser })(AdminUserDetail);
