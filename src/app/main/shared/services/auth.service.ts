import {Promise} from 'q';

export class AuthService {
  isLoggedIn = false;
  isFullFillen = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    window.localStorage.clear();
  }

  fillFullProfile() {
    this.isFullFillen = true;
  }

  isAuthenticate() {
    return this.isLoggedIn;
  }

  isFilledFullProfile() {
    return this.isFullFillen;
  }

  getProfileData() {
    return JSON.parse(window.localStorage.getItem('user'));
  }

}
