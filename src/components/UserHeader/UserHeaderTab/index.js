import React, { Component } from 'react';
import './userHeaderTab.css';

class UserHeaderTab extends Component {

  constructor(props) {
    super(props);

  }

  componentDidMount() {
  //  this.props.setView(this.props.index);
  }

  setView() {
    this.props.setView(this.props.view);
  }

  render() {
    return (
      <div onClick={this.setView.bind(this)} className='user-header-tab'>{this.props.title}</div>
    )
  }
}

export default UserHeaderTab;
