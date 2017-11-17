import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import './userHeaderTab.css';

class UserHeaderTab extends Component {

  constructor(props) {
    super(props);

    this.setVisibleUserRegimen = this.setVisibleUserRegimen.bind(this);
  }

  setVisibleUserRegimen() {
    this.props.setVisibleUserRegimen(this.props.view);
  }

  renderLabel() {
    if (this.props.title === 'Info') {
      return <FontAwesome name='cog' />
    } else {
      return this.props.title;
    }
  }

  render() {
    let className;
    if (this.props.visibleUserRegimen == this.props.view) {
      className = 'user-header-tab active'
    } else {
      className = 'user-header-tab'
    }

    return (
      <div onClick={this.setVisibleUserRegimen} className={className}>
        {this.renderLabel()}
      </div>
    )
  }
}

export default UserHeaderTab;
