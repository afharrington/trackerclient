import React, { Component } from 'react';
import PageWrapper from '../../components/PageWrapper';
import CardWrapper from '../../components/CardWrapper';
import RegimenList from './components/RegimenList';
import UserList from './components/UserList';
import RecentActivity from './components/RecentActivity';
import CreateRegimenForm from './components/CreateRegimenForm';
import CreateUserForm from './components/CreateUserForm';

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

  toggleRegimenForm() {
    this.setState({ showRegimenForm: !this.state.showRegimenForm});
  }

  toggleUserForm() {
    this.setState({ showUserForm: !this.state.showUserForm});
  }

  render() {
    return (
      <PageWrapper>
        <div className='admin-home'>
          { this.state.showRegimenForm ? <CreateRegimenForm exit={this.toggleRegimenForm}/> : null }
          { this.state.showUserForm ? <CreateUserForm exit={this.toggleUserForm}/> : null }

          <div className='regimens-card'><RegimenList toggleRegimenForm={this.toggleRegimenForm} /></div>

          <div className='players-card'><UserList toggleUserForm={this.toggleUserForm}/></div>

          <div className='activity-card'><RecentActivity/></div>

        </div>
      </PageWrapper>
    )
  }
}

export default AdminHome;
