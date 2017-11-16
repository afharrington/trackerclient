import React, { Component } from 'react';
import './userHeaderTab.css';

class UserHeaderTab extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  //  this.props.setView(this.props.index);
    console.log(this.props.activeView);
  }

  setView() {
    this.props.setView(this.props.view);
  }

  render() {
    let className;
    if (this.props.activeView == this.props.view) {

      className = 'user-header-tab active'
    } else {
      className = 'user-header-tab'
    }

    return (
      <div onClick={this.setView.bind(this)} className={className}>{this.props.title}</div>
    )
  }
}

export default UserHeaderTab;
