import React, { Component } from 'react';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import { connect } from 'react-redux';
import { deleteTile } from '../../../../actions/adminRegimenActions';
import './adminTile.scss';

class AdminTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false
    }
  }

  deleteTile() {
    this.props.deleteTile(this.props.regimenId, this.props.tile._id);
  }

  editTile() {
    this.props.toggleEditForm();
  }

  renderActivities() {
    return this.props.tile.activityOptions.map(activity => {
      return <p key={activity} className='admin-tile-activity-item'>{activity}</p>
    });
  }

  render() {
    return (
      <div className='admin-tile'>
        <div className='admin-tile-name'>
          <p className='admin-tile-name'>{this.props.tile.tileName}</p>
        </div>

        <div className='admin-tile-goal'>
          <p><span className='goal-label'>Goal: </span>{this.props.tile.goalHours} hr / {this.props.tile.goalCycle}-day</p>
        </div>

        <div className='admin-tile-activities'>
          <p className='activities-label'>Activities:</p>
            <div className='admin-tile-activity-items'>
              {this.renderActivities()}
            </div>
        </div>

        <IconMenu
          className='admin-menu-icon'
          iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
          anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
          targetOrigin={{horizontal: 'left', vertical: 'bottom'}}
        >
          <MenuItem onClick={this.editTile.bind(this)} primaryText="Edit" />
          <MenuItem onClick={this.deleteTile.bind(this)} primaryText="Delete" />
        </IconMenu>
      </div>
    )
  }
};


export default connect(null, { deleteTile })(AdminTile);
