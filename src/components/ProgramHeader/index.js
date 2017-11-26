import React, { Component } from 'react';
import ProgramHeaderTab from './ProgramHeaderTab';
import './programHeader.css';

class ProgramHeader extends Component {

  render() {

    return (
      <div className='program-header'>
        <div className='program-header-name'>
          <h2>{this.props.regimenName}</h2>
        </div>
        <div className='program-header-tabs'>
          <ProgramHeaderTab
            activeTab={this.props.activeTab}
            toggleTab={this.props.toggleTab}
            value='reports'
            title='Reports'/>

          <ProgramHeaderTab
            activeTab={this.props.activeTab}
            toggleTab={this.props.toggleTab}
            value='settings'
            title='Settings'/>
        </div>
      </div>
    )
  }
}


export default ProgramHeader;
