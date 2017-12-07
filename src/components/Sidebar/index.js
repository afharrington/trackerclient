import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { slide as Menu } from 'react-burger-menu';
import { selectMenuItem } from '../../actions/uiActions';
import { logoutAdmin } from '../../actions/authActions';
import { fetchPrograms } from '../../actions/adminProgramActions';
import MdAccessTime from 'react-icons/lib/md/access-time';
import MdAssignment from 'react-icons/lib/md/assignment';
import MdPeople from 'react-icons/lib/md/people';
import FaSignOut from 'react-icons/lib/fa/sign-out';
import MdHome from 'react-icons/lib/md/home';
import SidebarLink from './SidebarLink';
import MdHelpOutline from 'react-icons/lib/md/help-outline';
import MdChatBubble from 'react-icons/lib/md/chat-bubble';
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

          <Link to='/'><h3 className={ active == 'Home' ? 'sidebar-link active' : 'sidebar-link'}><MdHome/> Home</h3></Link>

          { this.props.userType === 'admin' &&
            <div>
              <Link to='/admin/recent'><h3 className={ active == 'Recent Activity' ? 'sidebar-link active' : 'sidebar-link'}><MdAccessTime/> Recent Activity</h3></Link>

              <Link to='/admin/programs'><h3 className={ active == 'Programs' ? 'sidebar-link active' : 'sidebar-link'}><MdAssignment/> Programs</h3></Link>

              { this.renderProgramLinks() }

              <Link to='/admin/team'><h3 className={ active == 'Team' ? 'sidebar-link active' : 'sidebar-link'}><MdPeople/> Team</h3></Link>
            </div>
          }

          { this.props.userType === 'user' &&
            <div>
              <Link to='/'><h3 className={ active == 'Message' ? 'sidebar-link active' : 'sidebar-link'}><MdChatBubble/> Contact Coach</h3></Link>

              <Link to='/admin/programs'><h3 className={ active == 'Help' ? 'sidebar-link active' : 'sidebar-link'}><MdHelpOutline/> FAQ</h3></Link>

            </div>
          }


          <h3 className='sidebar-logout sidebar-link' onClick={this.props.logoutAdmin}><FaSignOut/> Log out</h3>
        </Menu>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    activeMenuItem: state.ui.activeMenuItem,
    adminPrograms: state.adminPrograms.programs,
    userType: state.auth.userType
  };
}


export default connect(mapStateToProps, { selectMenuItem, logoutAdmin, fetchPrograms })(Sidebar);
