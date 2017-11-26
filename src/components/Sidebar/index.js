import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { selectMenuItem } from '../../actions/uiActions';
import { logoutAdmin } from '../../actions/authActions';
import { fetchRegimens } from '../../actions/adminRegimenActions';
import SidebarLink from './SidebarLink';

import './sideBar.css';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = { isOpen: false };
  }

  componentDidMount() {
    this.props.fetchRegimens();
  }

  renderProgramLinks() {
    let active = this.props.activeMenuItem;

    let regimens = this.props.adminRegimens;
    if (regimens) {
      return _.map(regimens, regimen => {
        return (
          <Link key={regimen._id} to={`/admin/regimen/${regimen._id}`}><p className={ active == regimen._id ? 'sidebar-sublink active' : 'sidebar-sublink'}>{regimen.regimenName}</p></Link>
        );
      })
    }
  }

  render () {
    let active = this.props.activeMenuItem;

    return (
      <div className='sidebar' id='sidebar'>
        <Menu noOverlay left isOpen={this.state.isOpen}>
          <div className='sidebar-brand'>
            <img className='sidebar-logo' src='/img/3up-logo-white.png' alt='3up logo'/>
            <h1>3UP</h1>
          </div>

          <Link to='/admin/recent'><h3 className={ active == 'Recent Activity' ? 'sidebar-link active' : 'sidebar-link'}>Recent Activity</h3></Link>
          <h3 className='sidebar-item'>Programs</h3>
          { this.renderProgramLinks() }
          <Link to='/admin/team'><h3 className={ active == 'Team' ? 'sidebar-link active' : 'sidebar-link'}>Team</h3></Link>

          <h3 className='sidebar-logout sidebar-link' onClick={this.props.logoutAdmin}>Log out</h3>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenuItem: state.ui.activeMenuItem,
    adminRegimens: state.adminRegimens.regimens
  };
}


export default connect(mapStateToProps, { selectMenuItem, logoutAdmin, fetchRegimens })(Sidebar);
