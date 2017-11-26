export const SELECT_MENU_ITEM = 'select_menu';

export function selectMenuItem(name) {
  return {
    type: SELECT_MENU_ITEM,
    payload: name
  }
}
