import _ from 'lodash';
import { ADMIN_FETCH_USER_TILES, FETCH_REGIMENS, ADMIN_FETCH_REGIMEN, CREATE_REGIMEN, DELETE_REGIMEN, CREATE_TILE, UPDATE_TILE, DELETE_TILE } from '../actions/adminRegimenActions';

// Regimen state is always an object with ALL regimens, with regimen Ids as keys
export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_REGIMENS:
      return { regimens: _.mapKeys(action.payload, '_id') };
    case ADMIN_FETCH_REGIMEN:
      return {...state, regimen: action.payload };
    case CREATE_REGIMEN:
      return { regimens: _.mapKeys(action.payload, '_id') };
    case DELETE_REGIMEN:
      return { regimens: _.omit(state, action.payload) };
    case CREATE_TILE:
      return {...state, regimen: action.payload };
    case UPDATE_TILE:
      return {...state, regimen: action.payload };
    case DELETE_TILE:
      return {...state, regimen: action.payload };
    case ADMIN_FETCH_USER_TILES:
      return {...state, [action.payload.userTileName]: action.payload};
    default:
      return state;
  }
}
