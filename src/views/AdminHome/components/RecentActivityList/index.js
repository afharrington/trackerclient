import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import CardWrapper from '../../../../components/CardWrapper';
import UpdateItem from './UpdateItem';
import { adminFetchRecentActivity } from '../../../../actions/adminActions';
import './recentActivityList.css';

class RecentActivity extends Component {

  componentDidMount() {
    this.props.adminFetchRecentActivity();
  }

  renderUpdates() {
    let updates = this.props.recentActivity;
    if (updates) {
      let last5updates = updates.slice(0, 5);
      return last5updates.map(update => {
        return (
          <div>
            <UpdateItem activity={update} />
          </div>
        )
      });
    }
  }

  render() {
    return (
      <CardWrapper title='Recent Activity' color='orange' title='Recent Activity'>
        <div className='recent-activity'>
          {this.renderUpdates()}
        </div>
      </CardWrapper>
    )
  }
};

function mapStateToProps(state) {
  return { recentActivity: state.admin.recentActivity };
}

export default connect(mapStateToProps, { adminFetchRecentActivity})(RecentActivity);
