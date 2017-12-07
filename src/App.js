import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AdminMenu from './components/AdminMenu';
import UserMenu from './components/UserMenu';
import Sidebar from './components/Sidebar';
import SlimSidebar from './components/SlimSidebar';

import Welcome from './views/Welcome';
import AdminRecentEntries from './views/AdminRecentEntries';
import AdminAuthentication from './components/AdminAuthentication';
import UserAuthentication from './components/UserAuthentication';

// Admin Dashboard View
import AdminHome from './views/AdminHome';

// Admin Program View
import AdminProgram from './views/AdminProgram';

import AdminUsers from './views/AdminUsers';
import AdminPrograms from './views/AdminPrograms';
// Admin User View
import AdminUser from './views/AdminUser';

// User Program View
import UserHome from './views/UserHome';

import './styles/styles.css';

const muiTheme = getMuiTheme({
    datePicker: {
      headerColor: '#00c7a9',
      selectColor: '#00c7a9',
      underlineStyle: 'none'
    },
    flatButton: {
      buttonFilterColor: '#999999',
      textColor: '#00c7a9',
      primaryTextColor: '#00c7a9',
      secondaryTextColor: '#00c7a9'
    },
    radioButton: {
      checkedColor: '#00c7a9',
      labelColor: '#fff',
      borderColor: '#fff',
      size: '12'
    }
});

class App extends Component {

  renderMenu() {
    if (this.props.authenticated) {
      return (
        <div>
          <Sidebar/>
          <SlimSidebar/>
        </div>
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          { this.renderMenu() }
          <Switch>
            <Route exact path='/' render={props => <Welcome {...props} /> } />
            <Route exact path='/user' component={UserAuthentication(UserHome)}/>
            <Route path='/admin/program/:programId' component={AdminAuthentication(AdminProgram)}/>
            <Route exact path='/admin/program/:programId/settings' component={AdminAuthentication(AdminProgram)}/>
            <Route exact path='/admin/team' component={AdminAuthentication(AdminUsers)}/>
            <Route exact path='/admin/programs' component={AdminAuthentication(AdminPrograms)}/>
            <Route exact path='/admin/user/:userId' component={AdminAuthentication(AdminUser)}/>
            <Route path='/admin' component={AdminAuthentication(AdminRecentEntries)}/>
            <Route exact path='/admin/recent' component={AdminAuthentication(AdminRecentEntries)}/>
          </Switch>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, userType: state.auth.userType };
}

export default connect(mapStateToProps)(App);
