import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegimenList from './components/RegimenList';
import UserList from './components/UserList';
import Sidebar from '../../components/Sidebar';
import CreateUserForm from './components/CreateUserForm';
import { selectMenuItem } from '../../actions/uiActions';
import { fetchRegimens } from '../../actions/adminRegimenActions';

import './adminHome.css';

class AdminHome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showRegimenForm: false,
      showUserForm: false
    }

    this.toggleRegimenForm = this.toggleRegimenForm.bind(this);
    this.toggleUserForm = this.toggleUserForm.bind(this);
  }

  componentDidMount() {
    this.props.selectMenuItem('Recent Activity');
    this.props.fetchRegimens();
  }

  toggleRegimenForm() {
    this.setState({ showRegimenForm: !this.state.showRegimenForm});
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
          <UserList toggleUserForm={this.toggleUserForm}/>
{/*
          { this.props.activeMenuItem == 'Programs' &&
            <RegimenList toggleRegimenForm={this.toggleRegimenForm} />
          } */}

          {/* { this.state.showRegimenForm ? <CreateRegimenForm exit={this.toggleRegimenForm}/> : null }
          { this.state.showUserForm ? <CreateUserForm exit={this.toggleUserForm}/> : null }

          <div className='regimens-card'><RegimenList toggleRegimenForm={this.toggleRegimenForm} /></div>

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

export default connect(mapStateToProps, { selectMenuItem, fetchRegimens })(AdminHome);
