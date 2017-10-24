import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import FontAwesome from 'react-fontawesome';
import Divider from 'material-ui/Divider';
import { logoutUser } from '../../actions/authActions';
import './userMenu.scss';

class UserMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {open: false};
  }

  logout = () => this.props.logoutUser();
  handleToggle = () => this.setState({open: !this.state.open});

  render() {
    return (
      <div>
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
            <NavLink to='/user'><MenuItem style={{color: '#333' }}><FontAwesome className='menu-icon' name='home'/>Home</MenuItem></NavLink>
            <div className='menu-divider'><Divider/></div>
            <MenuItem onClick={this.logout} style={{color: '#333' }}>Log out</MenuItem>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default connect(null, { logoutUser })(UserMenu);
