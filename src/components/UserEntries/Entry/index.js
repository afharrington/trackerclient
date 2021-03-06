import React, { Component } from 'react';
import { connect } from 'react-redux';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import Moment from 'react-moment';
import { adminDeleteEntry, adminFetchUserTile } from '../../../actions/adminUserActions';
import { deleteEntry, fetchUserTile } from '../../../actions/userActions';

import './entry.css';

class Entry extends Component {

  constructor(props) {
    super(props);
    this.showEditFormWithInitialValues = this.showEditFormWithInitialValues.bind(this);
  }

  // Pass the entry and cycleId back up to the parent for editing in AdminEntryForm
  showEditFormWithInitialValues() {
    this.props.toggleEditForm(this.props.entry, this.props.cycleId);
  }

  deleteEntry() {
    if (this.props.userType === 'admin') {
      this.props.adminDeleteEntry(this.props.cycleId, this.props.entry._id);
    } else {
      this.props.deleteEntry(this.props.cycleId, this.props.entry._id);
    }
  }

  render() {
    let minutes = this.props.entry.minutes % 60;
    let hours = Math.floor(this.props.entry.minutes / 60);

    return (
      <div className='entry'>
        <div className='entry-date'>
          <p><Moment format='MM/DD' date={this.props.entry.entryDate}/></p>
        </div>
        <div className='entry-time'>
          <p>{hours} <span>hr</span> {minutes} <span>min</span></p>
        </div>
        <div className='entry-activity'>
          <p>{this.props.entry.activity}</p>
        </div>
        <div className='entry-notes'>
          <p>{this.props.entry.notes}</p>
        </div>
        <div>
          <IconMenu
            menuItemStyle={{ fontFamily: 'Barlow', textTransform: 'uppercase', fontSize: '12px' }}
            className='entry-menu-icon'
            iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
            anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
            targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
          >
            <MenuItem onClick={this.showEditFormWithInitialValues} primaryText="Edit" />
            <MenuItem onClick={this.deleteEntry.bind(this)} primaryText="Delete" />
          </IconMenu>
        </div>

      </div>
    )
  }
};

export default connect(null, { adminDeleteEntry, adminFetchUserTile, deleteEntry, fetchUserTile } )(Entry);
