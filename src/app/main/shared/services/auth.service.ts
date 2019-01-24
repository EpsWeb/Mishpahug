export class AuthService {
  isLoggedIn = false;

  login() {
    this.isLoggedIn = true;
  }

  logout() {
    this.isLoggedIn = false;
    window.localStorage.clear();
  }

  isAuthenticate() {
    return this.isLoggedIn;
  }
}
