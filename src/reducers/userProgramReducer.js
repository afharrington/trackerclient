import _ from 'lodash';
import { ADMIN_FETCH_USER_PROGRAM, ADMIN_FETCH_THIS_USER_PROGRAMS } from '../actions/adminUserActions';

// This reducer pertains to the user programs belonging to a specific user
// Keys are userProgram _id
export default function(state = {}, action) {
  switch(action.type) {
    case ADMIN_FETCH_USER_PROGRAM:
      return _.mapKeys(action.payload, '_id');
    case ADMIN_FETCH_THIS_USER_PROGRAMS:
      return _.mapKeys(action.payload, '_id');
    default:
      return state;
  }
}
