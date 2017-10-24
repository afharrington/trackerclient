import { USER_ERROR, FETCH_USER, FETCH_USER_TILE, CREATE_ENTRY, UPDATE_ENTRY, DELETE_ENTRY } from '../actions/userActions';

export default function(state = {}, action) {
  switch(action.type) {
    case USER_ERROR:
      return {...state, error: action.payload };
    case FETCH_USER:
      return action.payload;
    case FETCH_USER_TILE:
      return {...state, tile: action.payload };
    case CREATE_ENTRY:
      return {...state, tile: action.payload };
    case UPDATE_ENTRY:
      return {...state, tile: action.payload };
    case DELETE_ENTRY:
      return {...state, tile: action.payload };
    default:
      return state;
  }
}
