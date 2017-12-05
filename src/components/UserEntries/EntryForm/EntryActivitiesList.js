import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'

const UserInfoActivitiesList = (props) => {

  function renderActivities() {

    let activities = props.userTile.activityOptions;
    if (activities) {
      return activities.sort().map(activity => {
        return (
          <option value={activity} key={activity}>
            {activity}
          </option>
        )
      });
    }
  }

  return (
    <div className='entry-form-activity'>
      <label>Activity:</label>
      <Field className='entry-form-activity-field' name='activity' component='select'>
        <option></option>
        {renderActivities()}
      </Field>
    </div>
  )
}

export default UserInfoActivitiesList;
