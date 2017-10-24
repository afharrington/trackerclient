import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import UserTile from './components/UserTile';
import { fetchUser } from '../../actions/userActions';
import './userHome.scss';

class UserHome extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showNewForm: false,
      showEditForm: false
    }
  }

  componentDidMount() {
    this.props.fetchUser();
  }

  renderHeader() {
    let regimen = this.props.user.regimen;

    if (regimen) {
      return (
        <div className='user-home-header'>
          <p className='user-home-regimen'><span>Your Regimen:</span> {regimen.regimenName}</p>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  renderTiles() {
    let regimen = this.props.user.userRegimen;
    if (regimen) {
        let userTiles = _.mapKeys(regimen.userTiles, '_id');
        if (userTiles) {
          return _.map(userTiles, tile => {
            return (
              <Link key={tile._id} to={`user/reg/${regimen._id}/tile/${tile._id}`}>
                <UserTile
                  tile={tile}
                  />
              </Link>
            )
          });
        }
    }
  }

  render() {
    return (
      <div className='user-home'>
        { this.renderHeader()}
        <div className='regimen-tiles-container'>
          { this.renderTiles() }
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { user: state.user };
}

export default connect(mapStateToProps, { fetchUser })(UserHome);
