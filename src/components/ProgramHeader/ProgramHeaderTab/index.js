import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './programHeaderTab.css';

class ProgramHeaderTab extends Component {

  renderLabel() {
    if (this.props.title === 'Settings') {
      return <FontAwesome name='cog' />
    } else {
      return this.props.title;
    }
  }

  render() {
    let className;
    if (this.props.activeTab == this.props.value) {
      className = 'program-header-tab active'
    } else {
      className = 'program-header-tab'
    }

    return (
      <div onClick={this.props.toggleTab} className={className}>
        {this.renderLabel()}
      </div>
    )
  }
}

export default ProgramHeaderTab;
