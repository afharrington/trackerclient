import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import NewButton from '../../components/NewButton';
import CreateTileForm from './components/CreateTileForm';
import AdminTile from './components/AdminTile';
import { fetchRegimen } from '../../actions/adminRegimenActions';
import './adminRegimen.css';

class AdminRegimen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showNewForm: false,
      showEditForm: false,
      tile: {}, // Current tile being edited,
      regimenId: this.props.match.params.regimenId
    }
  }

  componentDidMount() {
    this.props.fetchRegimen(this.state.regimenId);
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
    let tiles = this.props.regimen.tiles;

    if (tiles) {
      return tiles.map(tile => {
        return (
          <AdminTile
            key={tile._id}
            regimenId={this.state.regimenId}
            tile={tile} // tile data
            toggleEditForm={this.toggleEditForm.bind(this, tile)}/>
        )
      });
    }
  }

  render() {
    return (
      <PageWrapper>
        <div className='regimen'>
          <div className='regimen-title-container'><h1>Program: {this.props.regimen.regimenName}</h1></div>
          <div className='regimen-button-container'>
            <button onClick={this.toggleNewForm.bind(this)}>Add Tile</button>
          </div>

          <div className='regimen-tiles-container'>

            { this.state.showNewForm ?
                <CreateTileForm
                  toggleNewForm={this.toggleNewForm.bind(this)}
                  regimenId={this.state.regimenId}
                  exit={this.closeForm.bind(this)}
                  /> : null }

            { this.state.showEditForm ?
                <CreateTileForm
                  tile={this.state.tile}
                  regimenId={this.state.regimenId}
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
  return { regimen: state.adminRegimens };
}

export default connect(mapStateToProps, { fetchRegimen })(AdminRegimen);