import axios from 'axios';
import uri from '../config/uri.js';

export const ADMIN_FETCH_RECENT_ACTIVITY = 'admin_fetch_recent_activity';

const ROOT = uri.rootUri;

export function adminFetchRecentActivity() {
  return function(dispatch) {
    axios.get(`${ROOT}/admin/user/recent`, {
      headers: { 'Authorization': 'JWT ' + localStorage.getItem('token') }
      })
      .then(response => {
        dispatch({ type: ADMIN_FETCH_RECENT_ACTIVITY, payload: response.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
