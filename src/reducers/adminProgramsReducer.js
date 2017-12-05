import _ from 'lodash';
import { FETCH_PROGRAMS, ADMIN_FETCH_PROGRAM, ADMIN_FETCH_PROGRAM_TILES, ADMIN_FETCH_TILE_USER_TILES, ADMIN_FETCH_PROGRAM_USER_TILES, CREATE_PROGRAM, DELETE_PROGRAM, CREATE_TILE, UPDATE_TILE, DELETE_TILE } from '../actions/adminProgramActions';

// Program state is always an object with ALL programs, with program Ids as keys
export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_PROGRAMS:
      return { programs: _.mapKeys(action.payload, '_id') };
    case ADMIN_FETCH_PROGRAM:
      return {...state, program: action.payload };
    case ADMIN_FETCH_PROGRAM_TILES:
      return {...state, tiles: _.mapKeys(action.payload, '_id') };
    // case ADMIN_FETCH_PROGRAM_USER_TILES:
    //   return {...state, userTiles: action.payload };
    case ADMIN_FETCH_TILE_USER_TILES:
      return {...state, userTiles: {...state.userTiles, [action.payload[0].tileId]: action.payload }};
    case CREATE_PROGRAM:
      return { programs: _.mapKeys(action.payload, '_id') };
    case DELETE_PROGRAM:
      return { programs: _.omit(state, action.payload) };
    case CREATE_TILE:
      return {...state, tiles: {...state, [action.payload._id]: action.payload }};
    case UPDATE_TILE:
      return {...state, tiles: {...state, [action.payload._id]: action.payload }};
    case DELETE_TILE:
      return {...state, tiles: _.mapKeys(action.payload, '_id') };
    default:
      return state;
  }
}
