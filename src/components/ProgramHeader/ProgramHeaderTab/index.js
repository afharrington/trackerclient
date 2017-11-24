import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './programHeaderTab.css';

class ProgramHeaderTab extends Component {
  
  render() {
    let className;
    if (this.props.activeTab == this.props.value) {
      className = 'program-header-tab active'
    } else {
      className = 'program-header-tab'
    }

    return (
      <div onClick={this.props.toggleTab} className={className}>
        {this.props.title}
      </div>
    )
  }
}

export default ProgramHeaderTab;
