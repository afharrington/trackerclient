import _ from 'lodash';
import {
  ADMIN_FETCH_USER,
  ADMIN_UPDATE_USER,
  ADMIN_DELETE_USER,
  ADMIN_FETCH_ACTIVE_PROGRAM_TILES,
  ADMIN_FETCH_THIS_USER_PROGRAMS,
  ADMIN_FETCH_USER_PROGRAMS,
  ADMIN_FETCH_USER_TILE,
  ADMIN_FETCH_USERS,
  ADMIN_CREATE_USER,
  ADMIN_CREATE_ENTRY,
  ADMIN_UPDATE_ENTRY,
  ADMIN_FETCH_RECENT_USER_ENTRIES,
  ADMIN_DELETE_ENTRY } from '../actions/adminUserActions';

// adminUsers - convert array to an object, where keys are _id of each user
export default function(state = {}, action) {
  switch(action.type) {
    case ADMIN_FETCH_USER: // this.props.adminUsers.user
      return {...state, user: action.payload };
    case ADMIN_FETCH_USERS:
      return {...state, users: action.payload };
      // return _.mapKeys(action.payload, '_id');
    case ADMIN_UPDATE_USER:
      return {...state, user: action.payload };
    case ADMIN_DELETE_USER:
      return {...state, users: action.payload };
    case ADMIN_FETCH_ACTIVE_PROGRAM_TILES:
      return {...state, userProgramTiles: action.payload };
    // case ADMIN_FETCH_THIS_USER_PROGRAMS:
    //   return {...state, _.mapKeys(action.payload, '_id') };
    case ADMIN_FETCH_USER_PROGRAMS:
      return {...state, allUserPrograms: action.payload };
    case ADMIN_FETCH_USER_TILE: // this.props.adminUsers.tile
      return {...state, userTile: action.payload };
    case ADMIN_CREATE_USER:
      return {...state, users: state.users.concat(action.payload)};
      // return _.mapKeys(action.payload, '_id');
    case ADMIN_CREATE_ENTRY:
      return {...state, tile: action.payload };
    case ADMIN_UPDATE_ENTRY:
      return {...state, tile: action.payload };
    case ADMIN_DELETE_ENTRY:
      return {...state, tile: action.payload };
    case ADMIN_FETCH_RECENT_USER_ENTRIES:
      return {...state, recentUserEntries: {...state.recentUserEntries, [action.payload[0].userId]: action.payload }};
    default:
      return state;
    }
}
