import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTitle from '../../components/PageTitle';
import AdminPageHeader from '../../components/AdminPageHeader';
import RecentActivityItem from './RecentActivityItem';
import { adminFetchRecentActivity } from '../../actions/adminActions';
import { selectMenuItem } from '../../actions/uiActions';
import './adminRecentActivity.css';

class AdminRecentActivity extends Component {

  componentDidMount() {
    this.props.adminFetchRecentActivity();
    this.props.selectMenuItem('Recent Activity');
  }

  renderUpdates() {
    let updates = this.props.recentActivity;
    if (updates) {
      let last50updates = updates.slice(0, 50);

      last50updates = last50updates.sort(function(a, b){
        return b.entryDate == a.entryDate ? 0 : +(b.entryDate > a.entryDate) || -1;
      });

      return last50updates.map(update => {
        return (
          <div key={update}>
            <RecentActivityItem activity={update} />
          </div>
        )
      });
    }
  }

  render() {
    return (
      <div className='admin-recent-activity'>
        <AdminPageHeader/>
        <PageTitle title='Recent Activity' color='green'/>
        <div className='admin-recent-activity-content'>
          {this.renderUpdates()}
        </div>
      </div>
    )
  }
};

function mapStateToProps(state) {
  return { recentActivity: state.admin.recentActivity };
}

export default connect(mapStateToProps, { adminFetchRecentActivity, selectMenuItem })(AdminRecentActivity);
