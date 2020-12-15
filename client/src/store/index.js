import { makeAutoObservable } from 'mobx';

class Store {
  drawerIsVisible = false;
  isAuth = false;
  user = null;

  constructor() {
    makeAutoObservable(this);
  }

  setDrawerVisibility() {
    this.drawerIsVisible = !this.drawerIsVisible;
  }
  setAuth(auth) {
    this.isAuth = auth;
  }
  setUser(user) {
    if (user === undefined) {
      localStorage.removeItem('user');
      this.user = null;
      return;
    }
    localStorage.setItem('user', JSON.stringify(user));
    this.user = user;
  }
  auth() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user === null) {
      return;
    }
    this.setUser(user);
    this.setAuth(true);

  }
};

export default new Store();