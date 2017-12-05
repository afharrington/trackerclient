import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import AdminPageHeader from '../../components/AdminPageHeader';
import Reports from './Reports';
import _ from 'lodash';
import ProgramHeader from '../../components/ProgramHeader';
import ProgramSetup from './ProgramSetup';
import { selectMenuItem } from '../../actions/uiActions';
import { adminFetchProgram, adminFetchProgramTiles } from '../../actions/adminProgramActions';
import { adminFetchUserPrograms } from '../../actions/adminUserActions';
import './adminProgram.css';

class AdminProgram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      programId: '',
      activeTab: 'reports'
    }

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab() {
    if (this.state.activeTab == 'reports') {
      this.setState({ activeTab: 'settings' });
    } else {
      this.setState({ activeTab: 'reports' });
    }
  }

  componentDidMount() {
    this.props.selectMenuItem(this.props.match.params.programId);
    this.setState({ programId: this.props.match.params.programId });
    this.props.adminFetchProgram(this.props.match.params.programId);
    this.props.adminFetchProgramTiles(this.props.match.params.programId)
  }

  componentWillReceiveProps(newProps) {
    let newParam = newProps.match.params.programId;
    this.setState({ programId: newParam });
    if (newParam !== this.state.programId) {
      this.props.selectMenuItem(newProps.match.params.programId);
      this.props.adminFetchProgram(newProps.match.params.programId);
      this.props.adminFetchProgramTiles(newProps.match.params.programId)
    }
  }

  renderHeader() {
    if (this.props.program) {

      return (
        <ProgramHeader
          activeTab={this.state.activeTab}
          toggleTab={this.toggleTab}
          programName={this.props.program.programName}
        />
      )
    }
  }

  renderView() {
    if (this.state.activeTab === 'reports') {
      return <Reports
        programId={this.state.programId}
      />
    } else if (this.state.activeTab) {
      return (
        <ProgramSetup
          programId={this.state.programId}
        />
      )
    }
  }

  render() {
    if (this.props.program) {
      return (
        <div className='admin-program-view'>
          <AdminPageHeader/>
          { this.renderHeader() }
          { this.renderView() }
        </div>
      )
    } else {
      return <div></div>
    }

  }
}

function mapStateToProps(state) {
  return {
    program: state.adminPrograms.program,
    tiles: state.adminPrograms.tiles,
    userPrograms: state.adminUsers.userPrograms
  };
}

export default connect(mapStateToProps, { adminFetchProgram, adminFetchUserPrograms, adminFetchProgramTiles, selectMenuItem })(AdminProgram);
