import axios from 'axios';
import uri from '../config/uri.js';

export const ADMIN_FETCH_RECENT_ENTRIES = 'admin_fetch_recent_entries';

const ROOT = uri.rootUri;

export function adminFetchRecentEntries() {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/recent`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_RECENT_ENTRIES, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
