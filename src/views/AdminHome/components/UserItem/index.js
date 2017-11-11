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
      <div className='user-item'>
        <div className='user-info'>
          <p className='user-name'>{user.firstName} {user.lastName}</p>
          <p className='user-regimen'>{user.activeRegimenName ? user.activeRegimenName : ''}</p>
        </div>
        <div className='user-item-icons'>
          <Link to={`/admin/user/${user._id}`}><FontAwesome name='th' /></Link>
          <FontAwesome name='cog' />
        </div>
      </div>
      )
    }
  };

  export default UserItem;
