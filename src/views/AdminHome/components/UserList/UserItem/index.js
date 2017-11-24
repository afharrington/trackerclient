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
    if (this.props.user) {
      let user = this.props.user;
      return (
        <Link to={`/admin/user/${user._id}`}>
          <div className='user-item'>
            <p className='user-name'>{user.firstName} {user.lastName}</p>
          </div>
        </Link>
        )
    } else {
      return <div></div>
    }


    }
  };

  export default UserItem;