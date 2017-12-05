import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux';
import { deleteTile } from '../../../../actions/adminProgramActions';
import './adminTile.css';

class AdminTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showMoreMenu: false
    }
  }

  deleteTile() {
    this.props.deleteTile(this.props.tile._id);
  }

  editTile() {
    this.props.toggleEditForm();
  }

  renderActivities() {
    if (this.props.tile.activityOptions) {
      return this.props.tile.activityOptions.map(activity => {
        return <p key={activity} className='admin-tile-activity-item'>{activity}</p>
      });
    }
  }

  render() {
    if (this.props.tile) {
      return (
        <div className='admin-tile'>
          <div className='admin-tile-name'>
            <p className='admin-tile-name'>{this.props.tile.tileName}</p>
          </div>

          <div className='admin-tile-overlay'>
            <div className='admin-tile-icons'>
              <FontAwesome onClick={this.editTile.bind(this)} name='cog'/>
              <FontAwesome onClick={this.deleteTile.bind(this)} name='trash'/>
            </div>
          </div>

          <div className='admin-tile-goal'>
            <p><span className='goal-label'>Goal: </span>{this.props.tile.goalHours} hr / {this.props.tile.goalCycle}-day cycle</p>
          </div>

          <div className='admin-tile-activities'>
            <p className='activities-label'>Activities:</p>
              <div className='admin-tile-activity-items'>
                {this.renderActivities()}
              </div>
          </div>

        </div>
      )
    } else {
      return <div></div>
    }
  }
};


export default connect(null, { deleteTile })(AdminTile);
