import _ from 'lodash';
import { ADMIN_FETCH_USER, ADMIN_UPDATE_USER, ADMIN_DELETE_USER, ADMIN_FETCH_USER_REGIMENS, ADMIN_FETCH_USER_TILE, ADMIN_FETCH_USERS, ADMIN_CREATE_USER } from '../actions/adminUserActions';

// adminUsers - convert array to an object, where keys are _id of each user
export default function(state = {}, action) {
  switch(action.type) {
    case ADMIN_FETCH_USER: // this.props.adminUsers.user
      return {...state, user: action.payload };
    case ADMIN_FETCH_USERS:
      return _.mapKeys(action.payload, '_id');
    case ADMIN_UPDATE_USER:
      return {...state, [action.payload._id]: action.payload };
    case ADMIN_DELETE_USER:
      return _.omit(state, action.payload);
    case ADMIN_FETCH_USER_REGIMENS:
      return {...state, userRegimens: action.payload };
    case ADMIN_FETCH_USER_TILE: // this.props.adminUsers.tile
      return {...state, tile: action.payload };
    case ADMIN_CREATE_USER:
      return _.mapKeys(action.payload, '_id');
    default:
      return state;
    }
}