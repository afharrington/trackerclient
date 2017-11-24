import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import UserEntryForm from './UserEntryForm';
import FontAwesome from 'react-fontawesome';
import UserCycle from './UserCycle';
import { adminFetchUserTile, adminFetchUser } from '../../actions/adminUserActions';
import { fetchUserTile } from '../../actions/userActions';

import './userEntries.css';

class UserEntries extends Component {
  constructor(props) {
    super(props);

    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.closeForm = this.closeForm.bind(this);

    this.state = {
      showNewForm: false,
      showEditForm: false,
      entry: {},
      cycleId: '',
      userId: this.props.userId,
      regId: this.props.regId,
      tileId: this.props.tileId
    }
  }

  componentDidMount() {
    if (this.props.userType == 'admin') {
      this.props.adminFetchUserTile(this.props.userId, this.props.regId, this.props.tileId);
    }
    if (this.props.userType == 'user') {
      this.props.fetchUserTile(this.props.regId, this.props.tileId);
    }
  }

  toggleNewForm() {
    if (this.state.showNewForm === false) {
      this.setState({ showNewForm: true });
    } else {
      this.setState({ showNewForm: false });
    }
  }

  // Pass down to AdminUserCycle which passes down to AdminEntry
  toggleEditForm(entry, cycleId) {
    if(this.state.showEditForm === false) {
      this.setState({ showEditForm: true });
      this.setState({ entry: entry });
      this.setState({ cycleId: cycleId });
    } else {
      this.setState({ showEditForm: false });
      this.setState({ entry: {} });
      this.setState({ cycleId: '' });
    }
  }

  closeForm() {
    this.setState({ showEditForm: false });
    this.setState({ showNewForm: false });
  }


  renderCycles() {
    let tile;
    if (this.props.userType == 'admin') {
      tile = this.props.userTile;
    } else {
      tile = this.props.tile;
    }

    if (tile) {
      if (tile.cycles.length !== 0) {
        return tile.cycles.map(cycle => {
          let expanded = (cycle._id === tile.cycles[0]._id) ? true : false;

          return <UserCycle
            expanded={expanded}
            key={cycle._id}
            cycle={cycle}
            userId={this.state.userId}
            regId={this.state.regId}
            tileId={this.state.tileId}
            toggleEditForm={this.toggleEditForm}
            />
        })
      }
    }
  }

  render() {
    if (this.props.tile) {
      return (
        <div className='user-entries'>
          <div className='user-entries-title'>{this.props.tile && this.props.tile.userTileName}</div>
          <div className='user-entries-button-container'>
            <button onClick={this.toggleNewForm.bind(this)}>Add Entry</button>
          </div>

          <div className='user-entries-container'>
          { this.state.showNewForm ?
            <UserEntryForm
              toggleNewForm={this.toggleNewForm.bind(this)}
              userId={this.state.userId}
              regId={this.state.regId}
              tileId={this.state.tileId}
              closeForm={this.closeForm}
              /> : null }

          { this.state.showEditForm ?
            <UserEntryForm
              userId={this.state.userId}
              regId={this.state.regId}
              tileId={this.state.tileId}
              closeForm={this.closeForm}
              entry={this.state.entry}
              cycleId={this.state.cycleId}
              /> : null }

            <div className='entries-list'>
             {this.renderCycles()}
            </div>
          </div>
        </div>
      )
    } else {
      return <div></div>
    }
  }
};

function mapStateToProps(state) {
  return {
    userType: state.auth.userType,
    user: state.adminUsers.user,
    tile: state.user.tile,
    adminTile: state.adminUsers.tile };
}

export default connect(mapStateToProps, { adminFetchUserTile, adminFetchUser, fetchUserTile } )(UserEntries);
