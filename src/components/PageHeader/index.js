import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { logoutAdmin, logoutUser } from '../../actions/authActions';

import './pageHeader.css';

class PageHeader extends Component {

  constructor(props) {
    super(props);
    this.state = {value: 1};
  }

  logoutAdmin = () => this.props.logoutAdmin();
  logoutUser = () => this.props.logoutUser();

  renderLinks() {
    let className = `page-header-link ${this.props.textColor}`;

    if (this.props.auth) {
      if (this.props.auth.userType === 'admin') {
        return (
          <div className='page-header-links'>
            <div className='page-header-img-container'>
              <NavLink to='/admin'>
                <img src='/img/3up-logo-white.png' alt='3up logo'/>
              </NavLink>
            </div>
            <div className={className} onClick={this.logoutAdmin.bind(this)}>Log out</div>
          </div>
        )
      } else if (this.props.auth.userType === 'user') {
        return (
          <div className='page-header-links'>
            <div className='page-header-img-container'>
              <NavLink to='/user'>
                <img src='./img/3up-logo-black.png' alt='3up logo'/>
              </NavLink>
            </div>
            <div className={className} onClick={this.logoutUser.bind(this)}>Log out</div>
          </div>
        )
      }
    }
  }

  render() {
    const firstName = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : null;
    const lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : null;
    let pageHeaderClassName = `page-header page-header-${this.props.auth.userType}`

    return (
      <div className={pageHeaderClassName}>
        { this.renderLinks() }
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps, { logoutUser, logoutAdmin })(PageHeader);
