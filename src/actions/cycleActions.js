import axios from 'axios';
import uri from '../config/uri.js';

export const ADMIN_FETCH_CYCLE = 'admin_fetch_cycle';

const ROOT = uri.rootUri;

export function adminFetchCycle(cycleId) {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/cycle/${cycleId}`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_CYCLE, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
