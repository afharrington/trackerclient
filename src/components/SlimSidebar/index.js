import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { selectMenuItem } from '../../actions/uiActions';
import { logoutAdmin } from '../../actions/authActions';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdAssignment from 'react-icons/lib/md/assignment';
import MdPeople from 'react-icons/lib/md/people';
import FaSignOut from 'react-icons/lib/fa/sign-out';

import './slimSideBar.css';

class SlimSidebar extends Component {

  render () {
    let active = this.props.activeMenuItem;

    return (
      <div className='slim-sidebar'>
        <div className='slim-sidebar-links'>
          <Link to='/admin/recent'><h3 className={ active == 'Recent Activity' ? 'slim-sidebar-link-active' : 'slim-sidebar-link'}><MdAccessTime/></h3></Link>
          <Link to='/admin/programs'><h3 className={ active == 'Programs' ? 'slim-sidebar-link-active' : 'slim-sidebar-link'}><MdAssignment/></h3></Link>
          <Link to='/admin/team'><h3 className={ active == 'Team' ? 'slim-sidebar-link-active' : 'slim-sidebar-link'}><MdPeople/></h3></Link>
          <h3 className='slim-sidebar-logout slim-sidebar-link' onClick={this.props.logoutAdmin}><FaSignOut/></h3>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenuItem: state.ui.activeMenuItem
  };
}


export default connect(mapStateToProps, { selectMenuItem, logoutAdmin })(SlimSidebar);
