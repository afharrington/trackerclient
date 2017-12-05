import axios from 'axios';
import uri from '../config/uri.js';

export const FETCH_PROGRAMS = 'fetch_programs';
export const ADMIN_FETCH_PROGRAM = 'admin_fetch_program';
export const ADMIN_FETCH_PROGRAM_TILES = 'admin_fetch_program_tiles';
export const ADMIN_FETCH_PROGRAM_USER_TILES = 'admin_fetch_program_user_tiles';
export const ADMIN_FETCH_TILE_USER_TILES = 'admin_fetch_tile_user_tiles';
export const CREATE_PROGRAM = 'create_program';
export const DELETE_PROGRAM = 'delete_program';
export const CREATE_TILE = 'create_tile';
export const UPDATE_TILE = 'update_tile'
export const DELETE_TILE = 'delete_tile';
export const ADMIN_FETCH_USER_TILES = 'admin_fetch_user_tiles';

const ROOT = uri.rootUri;

// FETCH_PROGRAMS
export function fetchPrograms() {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/programs`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: FETCH_PROGRAMS, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// CREATE_PROGRAM
export function createProgram(values, callback) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/program`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: CREATE_PROGRAM, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
      });
  }
}

// FETCH_PROGRAM
export function adminFetchProgram(programId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/program/${programId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_PROGRAM, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// FETCH_PROGRAM_TILES
export function adminFetchProgramTiles(programId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/program/${programId}/tiles`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_PROGRAM_TILES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// DELETE_PROGRAM
export function deleteProgram(programId) {
  return function(dispatch) {
    axios.delete(`${ROOT}/admin/program/${programId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: DELETE_PROGRAM, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}


// CREATE_TILE
export function createTile(programId, values, callback) {
  return function(dispatch) {
    axios.post(`${ROOT}/admin/program/${programId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: CREATE_TILE, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
      });
  }
}

// UPDATE_TILE
export function updateTile(tileId, values, callback) {
  return function(dispatch) {
    axios.put(`${ROOT}/admin/tile/${tileId}`, values, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: UPDATE_TILE, payload: response.data });
      })
      .then(() => callback())
      .catch((err) => {
        console.log(err);
      });
  }
}

// DELETE_TILE
export function deleteTile(tileId) {
  return function(dispatch) {
    axios.delete(`${ROOT}/admin/tile/${tileId}`, {
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

export function adminFetchProgramUserTiles(programId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/program/${programId}/usertiles`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_PROGRAM_USER_TILES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export function adminFetchTileUserTiles(tileId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/tile/${tileId}/usertiles`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_TILE_USER_TILES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Fetch all user tiles created with this tile
export function adminFetchUserTiles(tileId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/tile/${tileId}/users`, {
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
