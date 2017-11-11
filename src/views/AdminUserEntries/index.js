import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewButton from '../../components/NewButton';
import AdminEntryForm from './components/AdminEntryForm';
import FontAwesome from 'react-fontawesome';
import AdminUserCycle from './components/AdminUserCycle';
import { adminFetchUserTile, adminFetchUser } from '../../actions/adminUserActions';

import './adminUserEntries.css';

class AdminUserEntries extends Component {
  constructor(props) {
    super(props);

    this.toggleEditForm = this.toggleEditForm.bind(this);
    this.closeForm = this.closeForm.bind(this);

    this.state = {
      showNewForm: false,
      showEditForm: false,
      entry: {},
      cycleId: '',
      userId: this.props.match.params.userId,
      regId: this.props.match.params.regId,
      tileId: this.props.match.params.tileId
    }
  }

  componentDidMount() {
    this.props.adminFetchUserTile(this.props.match.params.userId, this.props.match.params.tileId);
    this.props.adminFetchUser(this.props.match.params.userId);
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
    let tile = this.props.tile;
    if (tile) {
      if (tile.cycles.length !== 0) {
        return tile.cycles.map(cycle => {
          let expanded = (cycle._id === tile.cycles[0]._id) ? true : false;

          return <AdminUserCycle
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

  renderHeader() {
    let tile = this.props.tile;
    let user = this.props.user;
    if (tile && user) {
      return (
        <div className='entries-header'>
          <p className='entries-header-user'><Link to={`/admin/user/${this.props.user._id}`}>{this.props.user.firstName} {this.props.user.lastName}</Link><FontAwesome name='chevron-right'/><span>{tile.userTileName}</span>
          </p>
          <p className='entries-header-regimen'>{user.regimens[user.activeRegimen].regimenName}</p>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className='user-entries'>
        { this.renderHeader() }
        <div className='new-entry-button'>
          <NewButton onClick={this.toggleNewForm.bind(this)} text='new entry'/>
        </div>
        <div className='user-entries-container'>

        { this.state.showNewForm ?
          <AdminEntryForm
            toggleNewForm={this.toggleNewForm.bind(this)}
            userId={this.state.userId}
            regId={this.state.regId}
            tileId={this.state.tileId}
            closeForm={this.closeForm}
            /> : null }

        { this.state.showEditForm ?
          <AdminEntryForm
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
  }
};

function mapStateToProps(state) {
  return { user: state.adminUsers.user, tile: state.adminUsers.tile };
}

export default connect(mapStateToProps, { adminFetchUserTile, adminFetchUser } )(AdminUserEntries);
