import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../components/Sidebar';
import CreateUserForm from '../../components/CreateUserForm';
import { selectMenuItem } from '../../actions/uiActions';
import { fetchPrograms } from '../../actions/adminProgramActions';

import './adminHome.css';

class AdminHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showProgramForm: false,
      showUserForm: false
    }

    this.toggleProgramForm = this.toggleProgramForm.bind(this);
    this.toggleUserForm = this.toggleUserForm.bind(this);
  }

  componentDidMount() {
    this.props.selectMenuItem('Recent Activity');
    this.props.fetchPrograms();
  }

  toggleProgramForm() {
    this.setState({ showProgramForm: !this.state.showProgramForm});
  }

  toggleUserForm() {
    this.setState({ showUserForm: !this.state.showUserForm});
  }

  render() {
    const firstName = localStorage.getItem('firstName') ? localStorage.getItem('firstName') : null;
    const lastName = localStorage.getItem('lastName') ? localStorage.getItem('lastName') : null;
    return (
        <div className='admin-home'>
          <div className='admin-home-header'>
            <p className='admin-name'>{firstName} {lastName}</p>
          </div>
          
{/*
          { this.props.activeMenuItem == 'Programs' &&
            <ProgramList toggleProgramForm={this.toggleProgramForm} />
          } */}

          {/* { this.state.showProgramForm ? <CreateProgramForm exit={this.toggleProgramForm}/> : null }
          { this.state.showUserForm ? <CreateUserForm exit={this.toggleUserForm}/> : null }

          <div className='programs-card'><ProgramList toggleProgramForm={this.toggleProgramForm} /></div>

          <div className='players-card'><UserList toggleUserForm={this.toggleUserForm}/></div>

          <div className='activity-card'>
            <RecentActivityList/>
          </div> */}

        </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    activeMenuItem: state.ui.activeMenuItem };
}

export default connect(mapStateToProps, { selectMenuItem, fetchPrograms })(AdminHome);
