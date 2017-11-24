import React, { Component } from 'react';
import { connect } from 'react-redux';
import CreateTileForm from './CreateTileForm';
import AdminTile from './AdminTile';
import _ from 'lodash';
import { adminFetchRegimen } from '../../../actions/adminRegimenActions';
import './programSetup.css';

class ProgramSetup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewForm: false,
      showEditForm: false,
      tile: {}, // Current tile being edited,
    }
  }

  componentDidMount() {
    this.props.adminFetchRegimen(this.props.regimenId);
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

  renderTiles() {
    let tiles = this.props.regimen.tiles;

    if (tiles) {
      return tiles.map(tile => {
        return (
          <AdminTile
            key={tile._id}
            regimenId={this.props.regimenId}
            tile={tile} // tile data
            toggleEditForm={this.toggleEditForm.bind(this, tile)}/>
        )
      });
    }
  }

  render() {
    return (

        <div className='program-setup'>
          <div className='program-setup-button-container'>
            <button className='program-setup-button' onClick={this.toggleNewForm.bind(this)}>Add Tile</button>
          </div>

          <div className='program-setup-tiles-container'>

            { this.state.showNewForm ?
                <CreateTileForm
                  toggleNewForm={this.toggleNewForm.bind(this)}
                  regimenId={this.props.regimenId}
                  exit={this.closeForm.bind(this)}
                  /> : null }

            { this.state.showEditForm ?
                <CreateTileForm
                  tile={this.state.tile}
                  regimenId={this.props.regimenId}
                  toggleEditForm={this.toggleEditForm.bind(this)}
                  exit={this.closeForm.bind(this)}
                  /> : null }

            {this.renderTiles()}
          </div>
        </div>

    )
  }
};

function mapStateToProps(state) {
  return { regimen: state.adminRegimens.regimen };
}

export default connect(mapStateToProps, { adminFetchRegimen })(ProgramSetup);
