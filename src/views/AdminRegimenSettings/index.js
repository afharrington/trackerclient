import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import NewButton from '../../components/NewButton';
import CreateTileForm from './components/CreateTileForm';
import AdminTile from './components/AdminTile';
import { fetchProgram } from '../../actions/adminProgramActions';
import './adminProgram.css';

class AdminProgram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewForm: false,
      showEditForm: false,
      tile: {}, // Current tile being edited,
      programId: this.props.match.params.programId
    }
  }

  componentDidMount() {
    this.props.fetchProgram(this.state.programId);
  }


  // Toggles form for a New Tile
  toggleNewForm() {
    if (this.state.showNewForm === false) {
      this.setState({ showNewForm: true });
    } else {
      this.setState({ showNewForm: false });
    }
  }

  // Toggles form for editing a tile with auto-fill
  toggleEditForm(tile) {
    if(this.state.showEditForm === false) {
      this.setState({ showEditForm: true });
      this.setState({ tile: tile });
    } else {
      this.setState({ showEditForm: false });
      this.setState({ tile: {} });
    }
  }

  closeForm() {
    this.setState({ showEditForm: false });
    this.setState({ showNewForm: false });
  }

  redirect() {
    this.props.history.push('/admin');
  }

  renderTiles() {
    let tiles = this.props.program.tiles;

    if (tiles) {
      return tiles.map(tile => {
        return (
          <AdminTile
            key={tile._id}
            programId={this.state.programId}
            tile={tile} // tile data
            toggleEditForm={this.toggleEditForm.bind(this, tile)}/>
        )
      });
    }
  }

  render() {
    return (
      <PageWrapper>
        <div className='program'>
          <div className='program-title-container'><h1>Program: {this.props.program.programName}</h1></div>
          <div className='program-button-container'>
            <button onClick={this.toggleNewForm.bind(this)}>Add Tile</button>
          </div>

          <div className='program-tiles-container'>

            { this.state.showNewForm ?
                <CreateTileForm
                  toggleNewForm={this.toggleNewForm.bind(this)}
                  programId={this.state.programId}
                  exit={this.closeForm.bind(this)}
                  /> : null }

            { this.state.showEditForm ?
                <CreateTileForm
                  tile={this.state.tile}
                  programId={this.state.programId}
                  toggleEditForm={this.toggleEditForm.bind(this)}
                  exit={this.closeForm.bind(this)}
                  /> : null }

            {this.renderTiles()}
          </div>
        </div>
      </PageWrapper>
    )
  }
};

function mapStateToProps(state) {
  return { program: state.adminPrograms };
}

export default connect(mapStateToProps, { fetchProgram })(AdminProgram);
