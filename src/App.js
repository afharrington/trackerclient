import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import AdminMenu from './components/AdminMenu';
import UserMenu from './components/UserMenu';
import PageHeader from './components/PageHeader';

import Welcome from './views/Welcome';
import AdminAuthentication from './components/AdminAuthentication';
import UserAuthentication from './components/UserAuthentication';

// Admin Dashboard View
import AdminHome from './views/AdminHome';

// Admin Regimen View
import AdminRegimen from './views/AdminRegimen';
import AdminRegimenCharts from './views/AdminRegimenCharts';

// Admin User View
import AdminUserDetail from './views/AdminUserDetail';
import AdminUserEntries from './views/AdminUserEntries';

// User Regimen View
import UserHome from './views/UserHome';
import UserEntries from './views/UserEntries';

import './styles/styles.css';

const muiTheme = getMuiTheme({
    textField: {
      textColor: '#333', // dark gray
      hintColor: '#959595', // med-gray
      floatingLabelColor: '#959595', // light-gray
      disabledTextColor: '#00c7a9',
      errorColor: '#8b0000',
      focusColor: '#333',
      backgroundColor: 'transparent',
      borderColor: '#959595',
    },
    datePicker: {
      headerColor: '#00c7a9',
      selectColor: '#00c7a9'
    },
    flatButton: {
      buttonFilterColor: '#999999',
      textColor: '#00c7a9',
      primaryTextColor: '#00c7a9',
      secondaryTextColor: '#00c7a9'
    },
    slider: {
      trackSize: 2,
      trackColor: '#00c7a9',
      trackColorSelected: '#00c7a9',
      handleSize: 18,
      handleSizeDisabled: 8,
      handleSizeActive: 18,
      handleColorZero: '#00c7a9',
      handleFillColor: '#00c7a9',
      selectionColor: '#00c7a9',
      rippleColor: '#00c7a9'
    },
    radioButton: {
      checkedColor: '#00c7a9',
      labelColor: '#fff',
      borderColor: '#fff',
      size: '12'
    }
});

class App extends Component {

  renderPageHeader() {
    if (this.props.authenticated) {
      return <PageHeader/>
    }
  }

  renderMenu() {
    if (this.props.authenticated && this.props.userType === 'admin') {
      return <AdminMenu/>
    } else if (this.props.authenticated && this.props.userType === 'user') {
      return <UserMenu/>
    }
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider muiTheme={muiTheme}>
          <div>
            {this.renderPageHeader()}
            <Switch>
              <Route exact path='/' render={props => <Welcome {...props} /> } />
              <Route exact path='/admin' component={AdminAuthentication(AdminHome)}/>
              <Route exact path='/user' component={UserAuthentication(UserHome)}/>
              <Route exact path='/user/tile/:tileId' component={UserAuthentication(UserEntries)}/>
              <Route exact path='/user/reg/:regId/tile/:tileId' component={UserAuthentication(UserEntries)}/>
              <Route exact path='/admin/regimen/:regimenId' render={(props) => <AdminRegimenCharts {...props} /> }/>
              <Route exact path='/admin/regimen/:regimenId/settings' render={(props) => <AdminRegimen {...props} /> }/>
              <Route exact path='/admin/user/:userId' render={(props) => <AdminUserDetail {...props} /> }/>
              <Route exact path='/admin/user/:userId/tile/:userTileId' component={AdminUserEntries}/>
              <Route exact path='/' render={props => <Welcome {...props} /> } />
            </Switch>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  return { authenticated: state.auth.authenticated, userType: state.auth.userType };
}

export default connect(mapStateToProps)(App);
