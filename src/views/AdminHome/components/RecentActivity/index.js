import React, { Component } from 'react';
import _ from 'lodash';
import CardWrapper from '../../../../components/CardWrapper';
import './recentActivity.css';

class RecentActivity extends Component {

  render() {
    return (
      <CardWrapper title='Recent Activity'>
        <div className='recent-activity'>
        
        </div>
      </CardWrapper>
    )
  }
};

function mapStateToProps(state) {
  return { regimens: state.adminRegimens };
}

export default RecentActivity;
