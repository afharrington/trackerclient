import _ from 'lodash';
import { USER_ERROR, FETCH_USER, UPDATE_USER, FETCH_ACTIVE_PROGRAM_TILES, FETCH_USER_PROGRAM, FETCH_USER_TILE, CREATE_ENTRY, UPDATE_ENTRY, DELETE_ENTRY } from '../actions/userActions';

export default function(state = {}, action) {
  switch(action.type) {
    case USER_ERROR:
      return {...state, error: action.payload };
    case FETCH_USER:
      return {...state, user: action.payload };
    case UPDATE_USER:
      return {...state, user: action.payload };
    case FETCH_ACTIVE_PROGRAM_TILES:
      return {...state, userProgramTiles: action.payload };
    case FETCH_USER_PROGRAM:
      return {...state, userProgram: action.payload };
    case FETCH_USER_TILE:
      return {...state, userTile: action.payload };
    case CREATE_ENTRY:
      return {...state, userTile: action.payload };
    case UPDATE_ENTRY:
      return {...state, userTile: action.payload };
    case DELETE_ENTRY:
      return {...state, userTile: action.payload };
  }
  return state;
}
