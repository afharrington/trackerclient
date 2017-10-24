import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewButton from '../../components/NewButton';
import CreateEntryForm from './components/CreateEntryForm';
import UserCycle from './components/UserCycle';
import { fetchUserTile } from '../../actions/userActions';
import './userEntries.css';

// Same pattern as UserList > CreateUserForm

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
      regId: this.props.match.params.regId,
      tileId: this.props.match.params.tileId
    }
  }

  componentDidMount() {
    this.props.fetchUserTile(this.props.match.params.regId, this.props.match.params.tileId);
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
    if (tile) {
      return (
        <div className='page-title'>
          {tile.userTileName}
          <p>Goal: {tile.goalHours} hrs every {tile.goalCycle} days</p>
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
  return { tile: state.user.tile, user: state.user };
}

export default connect(mapStateToProps, { fetchUserTile } )(UserEntries);
