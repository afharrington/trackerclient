import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './userHeaderTab.css';

class UserHeaderTab extends Component {

  constructor(props) {
    super(props);

    this.setViewType = this.setViewType.bind(this);
  }

  setViewType() {
    this.props.setViewType(this.props.viewType);
  }

  renderLabel() {
    if (this.props.viewType === 'info') {
      return <FontAwesome name='cog' />
    } else {
      return this.props.title;
    }
  }

  render() {
    let className;
    if (this.props.viewType == this.props.currentView) {
      className = 'user-header-tab active'
    } else {
      className = 'user-header-tab'
    }

    return (
      <div onClick={this.setViewType} className={className}>
        {this.renderLabel()}
      </div>
    )
  }
}

export default UserHeaderTab;
