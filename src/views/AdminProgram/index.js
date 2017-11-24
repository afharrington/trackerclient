import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageWrapper from '../../components/PageWrapper';
import PlayerProgress from './subviews/PlayerProgress';
import _ from 'lodash';
import UserTilesContainer from '../../components/UserTilesContainer';
import ProgramHeader from '../../components/ProgramHeader';
import ProgramSetup from './subviews/ProgramSetup';
import { adminFetchRegimen } from '../../actions/adminRegimenActions';
import { adminFetchUserRegimens } from '../../actions/adminUserActions';
import './adminProgram.css';

class AdminProgram extends Component {
  constructor(props) {
    super(props);

    this.state = {
      regimenId: this.props.match.params.regimenId,
      activeTab: 'setup'
    }

    this.toggleTab = this.toggleTab.bind(this);
  }

  toggleTab() {
    if (this.state.activeTab == 'players') {
      this.setState({ activeTab: 'setup' });
    } else {
      this.setState({ activeTab: 'players' });
    }
  }

  componentDidMount() {
    this.props.adminFetchRegimen(this.props.match.params.regimenId);
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
    if (this.state.activeTab === 'players') {
      return <PlayerProgress
        regimenId={this.props.match.params.regimenId}
      />
    } else if (this.state.activeTab) {
      return (
        <ProgramSetup
          regimenId={this.props.match.params.regimenId}
        />
      )
    }
  }

  render() {
    if (this.props.regimen) {
      return (
        <PageWrapper textColor='white'>
          <div className='admin-program-view'>
            { this.renderHeader() }
            { this.renderView() }
          </div>
        </PageWrapper>
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
