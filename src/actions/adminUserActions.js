import axios from 'axios';
import uri from '../config/uri.js';

export const ADMIN_FETCH_USERS = 'admin_fetch_users';
export const ADMIN_FETCH_USER = 'admin_fetch_user';
export const ADMIN_UPDATE_USER = 'admin_update_user';
export const ADMIN_DELETE_USER = 'admin_delete_user';
export const ADMIN_FETCH_USER_PROGRAM = 'admin_fetch_user_program';
export const ADMIN_FETCH_USER_PROGRAM_TILES = 'admin_fetch_user_program_tiles';
export const ADMIN_FETCH_THIS_USER_PROGRAMS = 'admin_fetch_this_user_programs';
export const ADMIN_FETCH_USER_TILE = 'admin_fetch_user_tile';
export const ADMIN_FETCH_USER_PROGRAMS = 'admin_fetch_user_programs';
export const ADMIN_CREATE_USER = 'admin_create_user';
export const ADMIN_CREATE_ENTRY = 'admin_create_entry';
export const ADMIN_UPDATE_ENTRY = 'admin_update_entry';
export const ADMIN_DELETE_ENTRY = 'admin_delete_entry';
export const ADMIN_FETCH_RECENT_USER_ENTRIES = 'admin_fetch_recent_user_entries';

const ROOT = uri.rootUri;

// FETCH_USERS
export function adminFetchUsers() {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/users`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USERS, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminCreateUser(values) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/user`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_CREATE_USER, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminUpdateUser(userId, values) {
  return function(dispatch) {
    axios.put(`${ROOT}/admin/user/${userId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_UPDATE_USER, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchUser(userId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/${userId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminDeleteUser(userId) {
  return function(dispatch) {
    axios.delete(`${ROOT}/admin/user/${userId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_DELETE_USER, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchUserProgram(userProgramId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/program/${userProgramId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER_PROGRAM, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchUserProgramTiles(userProgramId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/program/${userProgramId}/tiles`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER_PROGRAM_TILES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchThisUserPrograms(userId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/${userId}/programs`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_THIS_USER_PROGRAMS, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchUserPrograms(programId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/program/${programId}/users`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER_PROGRAMS, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


export function adminFetchUserTile(userTileId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/tile/${userTileId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER_TILE, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchRecentUserEntries(userId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/${userId}/recent`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_RECENT_USER_ENTRIES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


export function adminCreateEntry(userTileId, values, callback) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/user/tile/${userTileId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_CREATE_ENTRY, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminUpdateEntry(cycleId, entryId, values, callback) {
  return function(dispatch) {
    axios.put(`${ROOT}/admin/user/cycle/${cycleId}/entry/${entryId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_UPDATE_ENTRY, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminDeleteEntry(cycleId, entryId, callback) {
  return function(dispatch) {
    axios.delete(`${ROOT}/admin/user/cycle/${cycleId}/entry/${entryId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_DELETE_ENTRY, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
      });
  }
}
