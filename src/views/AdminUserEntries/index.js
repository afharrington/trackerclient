import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import NewButton from '../../components/NewButton';
import CreateEntryForm from './components/CreateEntryForm';
import FontAwesome from 'react-fontawesome';
import UserCycle from '../UserEntries/components/UserCycle';
import { adminFetchUserTile, adminFetchUser } from '../../actions/adminUserActions';

import './adminUserEntries.css';

// Same as UserEntries right now, will refactor later
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
      regId: this.props.match.params.regId,
      tileId: this.props.match.params.tileId
    }
  }

  componentDidMount() {
    this.props.adminFetchUserTile(this.props.match.params.userId, this.props.match.params.userTileId);
    this.props.adminFetchUser(this.props.match.params.userId);
  }

  toggleNewForm() {
    if (this.state.showNewForm === false) {
      this.setState({ showNewForm: true });
    } else {
      this.setState({ showNewForm: false });
    }
  }

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

          return <UserCycle
            expanded={expanded}
            key={cycle._id}
            cycle={cycle}
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
          <p className='entries-header-regimen'>{this.props.user.regimen.regimenName}</p>
        </div>
      )
    } else {
      return <div></div>
    }
  }

  render() {
    return (
      <div className='admin-user-entries'>
        { this.renderHeader() }
        <div className='new-entry-button'>
          <NewButton onClick={this.toggleNewForm.bind(this)} text='new entry'/>
        </div>
        <div className='user-entries-container'>

        { this.state.showNewForm ?
          <CreateEntryForm
            toggleNewForm={this.toggleNewForm.bind(this)}
            regId={this.state.regId}
            tileId={this.state.tileId}
            closeForm={this.closeForm}
            /> : null }

        { this.state.showEditForm ?
          <CreateEntryForm
            tile={this.props.tile}
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
