import React from 'react';
import _ from 'lodash';
import { Field, reduxForm } from 'redux-form'

const UserInfoActivitiesList = (props) => {

  function renderActivities() {

    let activities = props.tile.activityOptions;
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
    <div className='admin-entry-form-item'>
      <label>Activity:</label>
      <Field className='admin-entry-activity-field' name='activity' component='select'>
        <option></option>
        {renderActivities()}
      </Field>
    </div>
  )
}

export default UserInfoActivitiesList;
