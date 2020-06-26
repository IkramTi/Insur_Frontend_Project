/**
 * Account Getters & Helpers
 */

import store from '../store/configureStore';

export function getUserId() {
  const { UserId } = store.getState().userInfo;
  return UserId || 3;
}

export function getUserName() {
  const { UserName } = store.getState().userInfo;
  return UserName;
}

export function getUserProfileId() {
  const { UsersProfil } = store.getState().userInfo;
  return UsersProfil.length > 0 ? UsersProfil[0].FK_Profil_Id : -99;
}

export function isActiveModule() {
  const { ActiveModule } = store.getState().userInfo;
  return ActiveModule !== 0;
}

export function getActiveModule() {
  const { ActiveModule } = store.getState().userInfo;
  return ActiveModule;
}

export function getMenus() {
  const { menuModels } = store.getState().userInfo;
  return menuModels || [];
}

export function getActiveMenus() {
  const activeMenus = getMenus().find(e => e.Id === getActiveModule());
  return activeMenus ? activeMenus.ChildrenMenu : [];
}

export function getAccessibleMenuItems() {
  let menuItems = [];
  getActiveMenus().forEach(menu => {
    menuItems.push(...menu.MenuItemModels);
  });
  return menuItems;
}

export function availableRoute(route) {
  let menuItems = getAccessibleMenuItems();
  return menuItems.find(menuItem => '/' + menuItem.Lien.toLowerCase() === route.path.toLowerCase());
}

export function getToken() {
  const { access_token } = store.getState().userInfo;
  return access_token;
}

export function isLogged() {
  if (getToken()) {
    return true;
  }
  return false;
}

export function getLocalStorageValue(key) {
  try {
    return JSON.parse(atob(localStorage.getItem(key))) || null;
  }
  catch (e) {
    console.warn('getLocVal: exception', e, key);
  }
}

export function setLocalStorageValue(key, value) {
  try {
    localStorage.setItem(key, btoa(JSON.stringify(value)));
  }
  catch (e) {
    console.warn('setLocVal: exception', e, key);
  }
}