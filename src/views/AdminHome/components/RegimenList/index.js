import React, { Component } from 'react';
import _ from 'lodash';
import NewButton from '../../../../components/NewButton';
import CardWrapper from '../../../../components/CardWrapper';
import CautionModal from '../../../../components/CautionModal';
import CreateRegimenForm from '../CreateRegimenForm';
import RegimenItem from './RegimenItem';
import { connect } from 'react-redux';
import { fetchRegimens, deleteRegimen } from '../../../../actions/adminRegimenActions';
import './regimenList.css';

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

  toggleModal(regimenId) {
    if (this.state.showModal === false) {
      this.setState({ showModal: true });
      this.setState({ regimenId: regimenId})
    } else {
      this.setState({ showModal: false });
      this.setState({ regimenId: '' })
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
        {/* <CardWrapper color='blue' title='Programs' add={this.props.toggleRegimenForm}> */}
          {this.renderRegimens()}
        {/* </CardWrapper> */}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { regimens: state.adminRegimens.regimens };
}

export default connect(mapStateToProps, { fetchRegimens, deleteRegimen })(RegimenList);
