import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { selectMenuItem } from '../../actions/uiActions';
import { logoutAdmin } from '../../actions/authActions';
import { fetchPrograms } from '../../actions/adminProgramActions';
import SidebarLink from './SidebarLink';
import CreateProgramForm from '../CreateProgramForm';

import './sideBar.css';

class Sidebar extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    this.props.fetchPrograms();
  }

  renderProgramLinks() {
    let active = this.props.activeMenuItem;

    let programs = this.props.adminPrograms;
    if (programs) {
      return _.map(programs, program => {
        return (
          <Link key={program._id} to={`/admin/program/${program._id}`}><p className={ active == program._id ? 'sidebar-sublink active' : 'sidebar-sublink'}>{program.programName}</p></Link>
        );
      })
    }
  }

  render () {
    let active = this.props.activeMenuItem;

    return (
      <div className='sidebar' id='sidebar'>
        { this.state.showProgramForm ? <CreateProgramForm exit={this.toggleProgramForm}/> : null }

        <Menu noOverlay left isOpen={this.state.isOpen}>
          <div className='sidebar-brand'>
            <img className='sidebar-logo' src='/img/3up-logo-white.png' alt='3up logo'/>
            <h1>3UP</h1>
          </div>

          <Link to='/admin/recent'><h3 className={ active == 'Recent Activity' ? 'sidebar-link active' : 'sidebar-link'}>Recent Activity</h3></Link>

          <Link to='/admin/programs'><h3 className={ active == 'Programs' ? 'sidebar-link active' : 'sidebar-link'}>Programs</h3></Link>

          { this.renderProgramLinks() }
          {/* <h3 className='sidebar-button' onClick={this.toggleProgramForm}>+ New Program</h3> */}
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
    adminPrograms: state.adminPrograms.programs
  };
}


export default connect(mapStateToProps, { selectMenuItem, logoutAdmin, fetchPrograms })(Sidebar);
