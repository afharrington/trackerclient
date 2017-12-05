import _ from 'lodash';
import {
  ADMIN_FETCH_RECENT_ENTRIES } from '../actions/adminActions';

export default function(state = {}, action) {
  switch(action.type) {
    case ADMIN_FETCH_RECENT_ENTRIES:
      return {...state, recentEntries: action.payload };
    default:
      return state;
    }
}
