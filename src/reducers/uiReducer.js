import { SELECT_MENU_ITEM } from '../actions/uiActions';

export default function(state = {}, action) {
  switch(action.type) {
    case SELECT_MENU_ITEM:
      return { activeMenuItem: action.payload };
    default:
      return state;
  }
}
