import axios from 'axios';
import uri from '../config/uri.js';

export const FETCH_REGIMENS = 'fetch_regimens';
export const ADMIN_FETCH_REGIMEN = 'admin_fetch_regimen';
export const CREATE_REGIMEN = 'create_regimen';
export const DELETE_REGIMEN = 'delete_regimen';
export const CREATE_TILE = 'create_tile';
export const UPDATE_TILE = 'update_tile'
export const DELETE_TILE = 'delete_tile';
export const ADMIN_FETCH_USER_TILES = 'admin_fetch_user_tiles';

const ROOT = uri.rootUri;

// FETCH_REGIMENS
export function fetchRegimens() {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/regimen`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: FETCH_REGIMENS, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// CREATE_REGIMEN
export function createRegimen(value) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/regimen`, value, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: CREATE_REGIMEN, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// FETCH_REGIMEN
export function adminFetchRegimen(regimenId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/regimen/${regimenId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_REGIMEN, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


// DELETE_REGIMEN
export function deleteRegimen(regimenId) {
  return function(dispatch) {
    axios.delete(`${ROOT}/admin/regimen/${regimenId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DELETE_REGIMEN, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


// CREATE_TILE
export function createTile(regimenId, values) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/regimen/${regimenId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: CREATE_TILE, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// UPDATE_TILE
export function updateTile(regimenId, tileId, values) {
  return function(dispatch) {
    axios.put(`${ROOT}/admin/regimen/${regimenId}/tile/${tileId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: UPDATE_TILE, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// DELETE_TILE
export function deleteTile(regimenId, tileId) {
  return function(dispatch) {
    axios.delete(`${ROOT}/admin/regimen/${regimenId}/tile/${tileId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DELETE_TILE, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchUserTiles(regimenId, tileId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/regimen/${regimenId}/tile/${tileId}/users`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_USER_TILES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
