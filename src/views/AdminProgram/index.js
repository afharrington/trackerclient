import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import AdminPageHeader from '../../components/AdminPageHeader';
import PlayerProgress from './PlayerProgress';
import _ from 'lodash';
import ProgramHeader from '../../components/ProgramHeader';
import ProgramSetup from './ProgramSetup';
import { adminFetchRegimen } from '../../actions/adminRegimenActions';
import { adminFetchUserRegimens } from '../../actions/adminUserActions';
import './adminProgram.css';

class AdminProgram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regimenId: '',
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
    let param = this.props.match.params.regimenId;
    this.setState({ regimenId: param });
    this.props.adminFetchRegimen(this.props.match.params.regimenId);
    this.props.adminFetchUserRegimens(this.props.match.params.regimenId);
  }

  componentWillReceiveProps(newProps) {
    let newParam = newProps.match.params.regimenId;
    this.setState({ regimenId: newParam });
    if (newParam !== this.state.regimenId) {
      this.props.adminFetchRegimen(newProps.match.params.regimenId);
      this.props.adminFetchUserRegimens(newProps.match.params.regimenId);
    }
  }

  renderHeader() {
    if (this.props.regimen) {

      return (
        <ProgramHeader
          activeTab={this.state.activeTab}
          toggleTab={this.toggleTab}
          regimenName={this.props.regimen.regimenName}
        />
      )
    }
  }

  renderView() {
    if (this.state.activeTab === 'reports') {
      return <PlayerProgress
        regimenId={this.state.regimenId}
      />
    } else if (this.state.activeTab) {
      return (
        <ProgramSetup
          regimenId={this.state.regimenId}
        />
      )
    }
  }

  render() {
    if (this.props.regimen) {
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
    regimen: state.adminRegimens.regimen,
    userRegimens: state.adminUsers.userRegimens
  };
}

export default connect(mapStateToProps, { adminFetchRegimen, adminFetchUserRegimens })(AdminProgram);
