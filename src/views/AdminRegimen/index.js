import React, { Component } from 'react';
import { connect } from 'react-redux';
import NewButton from '../../components/NewButton';
import BreadcrumbHeader from '../../components/BreadcrumbHeader';
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

  // componentWillReceiveProps() {
  //   this.props.fetchRegimen(this.state.regimenId);
  // }

  renderInstructions() {
    function isEmpty(obj) {
      for (let key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }

    if (isEmpty(this.props.regimen.tiles) ) {
      return (
        <div className='admin-regimen-instructions'>
        </div>
      )
    }
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
      <div className='regimen'>

        <BreadcrumbHeader
          linkLocation='/'
          link='Regimens'
          pageTitle={this.props.regimen.regimenName}/>

        <div className='regimen-button-container'  >
          <NewButton onClick={this.toggleNewForm.bind(this)} text='new tile'/>

        </div>
        <div className='regimen-tiles-container'>

          { this.state.showNewForm ?
              <CreateTileForm
                toggleNewForm={this.toggleNewForm.bind(this)}
                regimenId={this.state.regimenId}
                closeForm={this.closeForm.bind(this)}
                /> : null }

          { this.state.showEditForm ?
              <CreateTileForm
                tile={this.state.tile}
                regimenId={this.state.regimenId}
                toggleEditForm={this.toggleEditForm.bind(this)}
                closeForm={this.closeForm.bind(this)}
                /> : null }

          {this.renderInstructions()}
          {this.renderTiles()}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { regimen: state.adminRegimens };
}

export default connect(mapStateToProps, { fetchRegimen })(AdminRegimen);
