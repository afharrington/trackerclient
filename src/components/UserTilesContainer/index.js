import React, { Component } from 'react';
import { connect } from 'react-redux';
import UserTile from '../UserTile';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import './userTilesContainer.css';

class UserTilesContainer extends Component {

  componentDidMount() {

  }

  renderTiles(user) {
    console.log('user', user);
    // const { userRegimens } = user;
    //
    // _.map(tiles, tile => {
    //   return (
    //     <Link key={tile._id} to={`/admin/user/${userId}/reg/${regimenId}/tile/${tile._id}`}>
    //       <UserTile tile={tile} />
    //     </Link>
    //   )
    // });
  }

  render() {
    return (
      <div className='user-tiles-container'>
        { this.props.user &&
          this.renderTiles(this.props.user)
        }
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { user: state.adminUsers.user};
}

export default connect(mapStateToProps)(UserTilesContainer);
