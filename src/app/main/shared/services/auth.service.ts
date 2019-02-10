export class AuthService {
  isLoggedIn = false;
  isFullFillen = false;
  token = '';

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    this.isFullFillen = false;
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
