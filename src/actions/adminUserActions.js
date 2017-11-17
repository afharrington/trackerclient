import axios from 'axios';
import uri from '../config/uri.js';

export const ADMIN_FETCH_USERS = 'admin_fetch_users';
export const ADMIN_FETCH_USER = 'admin_fetch_user';
export const ADMIN_UPDATE_USER = 'admin_update_user';
export const ADMIN_DELETE_USER = 'admin_delete_user';
export const ADMIN_FETCH_USER_REGIMEN = 'admin_fetch_user_regimen';
export const ADMIN_FETCH_USER_TILE = 'admin_fetch_user_tile';
export const ADMIN_FETCH_USER_REGIMENS = 'admin_fetch_user_regimens';
export const ADMIN_CREATE_USER = 'admin_create_user';
export const ADMIN_CREATE_ENTRY = 'admin_create_entry';
export const ADMIN_UPDATE_ENTRY = 'admin_update_entry';
export const ADMIN_DELETE_ENTRY = 'admin_delete_entry';

const ROOT = uri.rootUri;

// FETCH_USERS
export function adminFetchUsers() {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        console.log(response.data);
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

export function adminFetchUserRegimen(userId, userRegimenId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/${userId}/reg/${userRegimenId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER_REGIMEN, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchUserRegimens(regimenId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/regimen/${regimenId}/users`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER_REGIMENS, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


export function adminFetchUserTile(userId, userRegId, userTileId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/${userId}/reg/${userRegId}/usertile/${userTileId}`, {
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

export function adminCreateEntry(userId, regId, tileId, values) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/user/${userId}/reg/${regId}/tile/${tileId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_CREATE_ENTRY, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminUpdateEntry(userId, regId, tileId, cycleId, entryId, values, callback) {
  return function(dispatch) {
    axios.put(`${ROOT}/admin/user/${userId}/reg/${regId}/tile/${tileId}/cycle/${cycleId}/entry/${entryId}`, values, {
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

export function adminDeleteEntry(userId, regId, tileId, cycleId, entryId, callback) {
  return function(dispatch) {
    axios.delete(`${ROOT}/admin/user/${userId}/reg/${regId}/tile/${tileId}/cycle/${cycleId}/entry/${entryId}`, {
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
