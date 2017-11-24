import _ from 'lodash';
import {
  ADMIN_FETCH_RECENT_ACTIVITY } from '../actions/adminActions';

export default function(state = {}, action) {
  switch(action.type) {
    case ADMIN_FETCH_RECENT_ACTIVITY:
      return {...state, recentActivity: action.payload };
    default:
      return state;
    }
}
