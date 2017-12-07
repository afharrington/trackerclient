import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import EntryForm from './EntryForm';
import FontAwesome from 'react-fontawesome';
import UserCycle from './UserCycle';
import { adminFetchUserTile } from '../../actions/adminUserActions';
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
      userId: this.props.userId
    }
  }

  componentDidMount() {
    if (this.props.userType === 'admin') {
      this.props.adminFetchUserTile(this.props.userTileId);
    } else {
      this.props.fetchUserTile(this.props.userTileId);
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
    let tile = this.props.userType === 'admin' ? this.props.adminUserTile : this.props.userTile;

    if (tile) {
      if (tile.cycles) {

        return tile.cycles.map(cycle => {
          let expanded = (cycle._id === tile.cycles[0]._id) ? true : false;

          return <UserCycle
            userType={this.props.userType}
            expanded={expanded}
            key={cycle._id}
            cycle={cycle}
            userId={this.state.userId}
            tileId={this.state.tileId}
            toggleEditForm={this.toggleEditForm}
            />
        })
      }
    }
  }

  render() {
    return (
      <div className='user-entries'>
        <div className='user-entries-title'>{this.props.tile && this.props.tile.userTileName}</div>
        <div className='user-entries-button-container'>
          <button onClick={this.toggleNewForm.bind(this)}>Add Entry</button>
        </div>

        <div className='user-entries-container'>
        { this.state.showNewForm ?
          <EntryForm
            toggleNewForm={this.toggleNewForm.bind(this)}
            userId={this.state.userId}
            userTileId={this.props.userTileId}
            closeForm={this.closeForm}
            /> : null }

        { this.state.showEditForm ?
          <EntryForm
            userId={this.state.userId}
            usertileId={this.props.userTileId}
            closeForm={this.closeForm}
            entry={this.state.entry}
            cycleId={this.state.cycleId}
            /> : null }

          <div className='user-entries-list'>
           {this.renderCycles()}
          </div>
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return {
    userType: state.auth.userType,
    adminUser: state.adminUsers.user,
    adminUserTile: state.adminUsers.userTile,
    user: state.user.user,
    userTile: state.user.userTile
  };
}

export default connect(mapStateToProps, { adminFetchUserTile, fetchUserTile } )(UserEntries);
