import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AdminMenu from './components/AdminMenu';
import UserMenu from './components/UserMenu';
import Sidebar from './components/Sidebar';

import Welcome from './views/Welcome';
import AdminRecentActivity from './views/AdminRecentActivity';
import AdminAuthentication from './components/AdminAuthentication';
import UserAuthentication from './components/UserAuthentication';

// Admin Dashboard View
import AdminHome from './views/AdminHome';

// Admin Regimen View
import AdminProgram from './views/AdminProgram';

import AdminUsers from './views/AdminUsers';
// Admin User View
import AdminUser from './views/AdminUser';

// User Regimen View
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
    if (this.props.authenticated && this.props.userType === 'admin') {
      return <Sidebar/>
    } else if (this.props.authenticated && this.props.userType === 'user') {
      return <UserMenu/>
    }
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          { this.renderMenu() }
          <Switch>
            <Route exact path='/' render={props => <Welcome {...props} /> } />
            {/* <Route exact path='/admin' component={AdminAuthentication(AdminHome)}/> */}
            <Route exact path='/admin/recent' component={AdminAuthentication(AdminRecentActivity)}/>
            <Route exact path='/user' component={UserAuthentication(UserHome)}/>
            <Route exact path='/admin/regimen/:regimenId' component={AdminAuthentication(AdminProgram)}/>
            <Route exact path='/admin/regimen/:regimenId/settings' component={AdminAuthentication(AdminProgram)}/>
            <Route exact path='/admin/team' component={AdminAuthentication(AdminUsers)}/>
            <Route exact path='/admin/user/:userId' component={AdminAuthentication(AdminUser)}/>
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
