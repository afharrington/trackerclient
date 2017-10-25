import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import FontAwesome from 'react-fontawesome';
import { Link } from 'react-router-dom';

import './userItem.css';

class UserItem extends Component {

  constructor(props) {
    super(props);
    this.showEditFormWithInitialValues = this.showEditFormWithInitialValues.bind(this);
    this.showModalWithUserId = this.showModalWithUserId.bind(this);
  }

  // Pass the user back up to the parent for editing in createUserForm
  showEditFormWithInitialValues() {
    this.props.toggleEditForm(this.props.user);
  }

  showModalWithUserId() {
    this.props.toggleModal(this.props.user._id);
  }

  render() {
    let user = this.props.user;

    return (
      <div className='user-container'>
        <div className='user-image'>
          <FontAwesome name='user' />
        </div>
        <div className='user-info'>
          <p className='user-name'>{user.firstName} {user.lastName}</p>
          <p className='user-regimen'>{user.regimen ? user.regimen.regimenName : ''}</p>
        </div>

        <div className='icon-container'>
          <IconMenu
            className='menu-icon'
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
          >
            <Link to={`/admin/user/${user._id}`}>
              <MenuItem primaryText='Tiles' />
            </Link>
            <MenuItem onClick={this.showEditFormWithInitialValues} primaryText={`Edit Player`} />
            <MenuItem onClick={this.showModalWithUserId} primaryText={`Delete Player`} />
          </IconMenu>
        </div>
      </div>
      )
    }
  };

  export default UserItem;
