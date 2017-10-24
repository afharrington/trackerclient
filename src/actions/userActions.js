import axios from 'axios';
import uri from '../config/uri.js';

export const USER_ERROR = 'user_error';
export const FETCH_USER = 'fetch_user';
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

export function fetchUserTile(regId, tileId) {
  return function(dispatch) {
    axios.get(`${ROOT}/user/reg/${regId}/tile/${tileId}`, {
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

export function createEntry(regId, tileId, values) {
  return function(dispatch) {
    axios.post(`${ROOT}/user/reg/${regId}/tile/${tileId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: CREATE_ENTRY, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}

export function updateEntry(regId, tileId, cycleId, entryId, values) {
  return function(dispatch) {
    axios.put(`${ROOT}/user/reg/${regId}/tile/${tileId}/cycle/${cycleId}/entry/${entryId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: UPDATE_ENTRY, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
        dispatch(userError(err));
      });
  }
}


export function deleteEntry(regId, tileId, cycleId, entryId) {
  return function(dispatch) {
    axios.delete(`${ROOT}/user/reg/${regId}/tile/${tileId}/cycle/${cycleId}/entry/${entryId}`, {
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
