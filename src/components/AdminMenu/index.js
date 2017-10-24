import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontAwesome from 'react-fontawesome';
import Divider from 'material-ui/Divider';
import { logoutAdmin } from '../../actions/authActions';
import './adminMenu.css';

class AdminMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  logout = () => this.props.logoutAdmin();
  handleToggle = () => this.setState({open: !this.state.open});

  // <div className='menu-brand'>
  //   <img className='menu-logo' src='./img/3up-logo-black.png'/>
  //   <p>3up</p>
  // </div>

  render() {
    return (
      <div className='admin-menu'>
        <button
          className='hamburger-closed'
          onClick={this.handleToggle}>
          <FontAwesome name='bars'/>
        </button>
        <Drawer open={this.state.open} width={200}>
          <button
            className='hamburger-open'
            onClick={this.handleToggle}>
            <FontAwesome name='bars'/>
          </button>
          <div className="menu-items">
            <NavLink to='/admin'><MenuItem style={{color: '#333' }}><FontAwesome className='menu-icon' name='home'/>Home</MenuItem></NavLink>
            <MenuItem style={{color: '#333' }}><FontAwesome className='menu-icon' name='list-alt'/>Regimens</MenuItem>
            <MenuItem style={{color: '#333' }}><FontAwesome className='menu-icon' name='users'/>Team</MenuItem>
            <div className='menu-divider'><Divider/></div>
            <MenuItem onClick={this.logout} style={{color: '#333' }}>Log out</MenuItem>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default connect(null, { logoutAdmin })(AdminMenu);
