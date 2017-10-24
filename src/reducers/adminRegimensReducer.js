import _ from 'lodash';
import { ADMIN_FETCH_USER_TILES, FETCH_REGIMENS, FETCH_REGIMEN, CREATE_REGIMEN, DELETE_REGIMEN, CREATE_TILE, UPDATE_TILE, DELETE_TILE } from '../actions/adminRegimenActions';

// Regimen state is always an object with ALL regimens, with regimen Ids as keys
export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_REGIMENS:
      return _.mapKeys(action.payload, '_id');
    case FETCH_REGIMEN:
      return action.payload;
    case CREATE_REGIMEN:
      return _.mapKeys(action.payload, '_id');
    case DELETE_REGIMEN:
      return _.omit(state, action.payload);
    case CREATE_TILE:
      return action.payload;
    case UPDATE_TILE:
      return action.payload;
    case DELETE_TILE: // check this
      return action.payload;
    case ADMIN_FETCH_USER_TILES:
      return {...state, [action.payload.userTileName]: action.payload};
    default:
      return state;
  }
}
