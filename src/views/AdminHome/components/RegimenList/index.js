import React, { Component } from 'react';
import _ from 'lodash';
import NewButton from '../../../../components/NewButton';
import CautionModal from '../../../../components/CautionModal';
import CreateRegimenForm from '../CreateRegimenForm';
import RegimenItem from '../RegimenItem';
import { connect } from 'react-redux';
import { fetchRegimens, deleteRegimen } from '../../../../actions/adminRegimenActions';
import './regimenList.scss';

class RegimenList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showModal: false,
      regimenId: ''
    }
  }

  componentDidMount() {
    this.props.fetchRegimens();
  }

  deleteRegimen() {
    this.props.deleteRegimen(this.state.regimenId);
  }

  renderInstructions() {
    function isEmpty(obj) {
      for (let key in obj) {
        if(obj.hasOwnProperty(key))
          return false;
      }
      return true;
    }

    if (isEmpty(this.props.regimens) ) {
      return (
        <div className='regimen-list-instructions'>
          <p>You do not have any regimens yet.</p>
          <h3>What is a Regimen?</h3>
          <p>Think of a regimen as a blueprint you can use for assigning training plans to your players.</p>
          <p>For example, you might create a different regimen for each position on your team.</p>
          <p>Add a new regimen to get started.</p>
        </div>
      )
    }
  }

  toggleModal(regimenId) {
    if (this.state.showModal === false) {
      this.setState({ showModal: true });
      this.setState({ regimenId: regimenId})
    } else {
      this.setState({ showModal: false });
      this.setState({ regimenId: '' })
    }
  }

  closeModal() {
    this.setState({ showModal: false });
    this.setState({ regimenId: '' });
  }

  toggleForm() {
    if (this.state.showForm === false) {
      this.setState({ showForm: true });
    } else {
      this.setState({ showForm: false });
    }
  }

  renderModal() {
    if (this.state.showModal) {
      return (
        <CautionModal
          itemToDelete='regimen'
          additionalMessage='The entries of all players assigned to this regimen will also be deleted. You must re-assign these players to a new regimen.'
          closeModal={this.closeModal.bind(this)}
          deleteFunction={this.deleteRegimen.bind(this)}
        />
      )
    }
  }

  renderRegimens() {
    let regimens = this.props.regimens;

    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <RegimenItem
            key={regimen._id}
            toggleModal={this.toggleModal.bind(this)}
            regimen={regimen}
          />
        );
      })
    }
  }

  render() {
    return (
      <div className='regimen-list'>
        {this.renderModal()}
        <h3 className='list-title'>Regimens</h3>
        <div className='regimens-button-container'>
          <div onClick={this.toggleForm.bind(this)}><NewButton text='new regimen'/></div>
        </div>
        {this.state.showForm ? <CreateRegimenForm exitForm={this.toggleForm.bind(this)}/> : null}
        {this.renderRegimens()}
        {this.renderInstructions()}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { regimens: state.adminRegimens };
}

export default connect(mapStateToProps, { fetchRegimens, deleteRegimen })(RegimenList);
