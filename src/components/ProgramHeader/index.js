import React, { Component } from 'react';
import ProgramHeaderTab from './ProgramHeaderTab';
import './programHeader.css';

class ProgramHeader extends Component {

  render() {
    // const { programName, visibleTab } = this.props;

    return (
      <div className='program-header'>
        <div className='program-header-name'>
          <h1>{this.props.regimenName}</h1>
        </div>
        <div className='program-header-tabs'>
          <ProgramHeaderTab
            activeTab={this.props.activeTab}
            toggleTab={this.props.toggleTab}
            value='players'
            title='Players'/>

          <ProgramHeaderTab
            activeTab={this.props.activeTab}
            toggleTab={this.props.toggleTab}
            value='setup'
            title='Setup'/>
        </div>
      </div>
    )
  }
}


export default ProgramHeader;
