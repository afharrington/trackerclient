import axios from 'axios';
import uri from '../config/uri.js';

export const USER_ERROR = 'user_error';
export const FETCH_USER = 'fetch_user';
export const UPDATE_USER = 'update_user';
export const FETCH_ACTIVE_PROGRAM_TILES = 'fetch_active_program_tiles';
export const FETCH_USER_PROGRAM = 'fetch_user_program';
export const FETCH_USER_TILE = 'fetch_user_tile';
export const CREATE_ENTRY = 'create_entry';
export const UPDATE_ENTRY = 'update_entry';
export const DELETE_ENTRY = 'delete_entry';

const ROOT = uri.rootUri;

export function userError(error) {
  return {
    type: USER_ERROR,
    payload: error
  }
}

export function fetchUser() {
  return function(dispatch) {
    axios.get(`${ROOT}/user`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: FETCH_USER, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}

export function updateUser(values) {
  return function(dispatch) {
    axios.put(`${ROOT}/user`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: UPDATE_USER, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}

export function fetchActiveProgramTiles() {
  return function(dispatch) {
    axios.get(`${ROOT}/user/tiles`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: FETCH_ACTIVE_PROGRAM_TILES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function fetchUserTile(userTileId) {
  return function(dispatch) {
    axios.get(`${ROOT}/user/tile/${userTileId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: FETCH_USER_TILE, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}

export function fetchUserProgram(userProgramId) {
  return function(dispatch) {
    axios.get(`${ROOT}/user/reg/${userProgramId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: FETCH_USER_PROGRAM, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function createEntry(userTileId, values, callback) {
  return function(dispatch) {
    axios.post(`${ROOT}/user/tile/${userTileId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: CREATE_ENTRY, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}

export function updateEntry(cycleId, entryId, values, callback) {
  return function(dispatch) {
    axios.put(`${ROOT}/user/cycle/${cycleId}/entry/${entryId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: UPDATE_ENTRY, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}


export function deleteEntry(cycleId, entryId) {
  return function(dispatch) {
    axios.delete(`${ROOT}/user/cycle/${cycleId}/entry/${entryId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DELETE_ENTRY, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}
