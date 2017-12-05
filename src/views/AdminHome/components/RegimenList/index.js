import React, { Component } from 'react';
import _ from 'lodash';
import NewButton from '../../../../components/NewButton';
import CardWrapper from '../../../../components/CardWrapper';
import CautionModal from '../../../../components/CautionModal';
//import CreateProgramForm from '../CreateProgramForm';
import ProgramItem from './ProgramItem';
import { connect } from 'react-redux';
import { fetchPrograms, deleteProgram } from '../../../../actions/adminProgramActions';
import './programList.css';

class ProgramList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showForm: false,
      showModal: false,
      programId: ''
    }
  }

  componentDidMount() {
    this.props.fetchPrograms();
  }

  deleteProgram() {
    this.props.deleteProgram(this.state.programId);
  }

  toggleModal(programId) {
    if (this.state.showModal === false) {
      this.setState({ showModal: true });
      this.setState({ programId: programId})
    } else {
      this.setState({ showModal: false });
      this.setState({ programId: '' })
    }
  }

  renderPrograms() {
    let programs = this.props.programs;

    if (programs) {
      return _.map(programs, program => {
        return (
          <ProgramItem
            key={program._id}
            toggleModal={this.toggleModal.bind(this)}
            program={program}
          />
        );
      })
    }
  }

  render() {
    return (
      <div className='program-list'>
        {/* <CardWrapper color='blue' title='Programs' add={this.props.toggleProgramForm}> */}
          {this.renderPrograms()}
        {/* </CardWrapper> */}
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { programs: state.adminPrograms.programs };
}

export default connect(mapStateToProps, { fetchPrograms, deleteProgram })(ProgramList);
