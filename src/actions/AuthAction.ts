import AuthAPI, { AuthApi, AuthData, RegistrationData } from '../api/Auth';
import store from '../services/Store';
import router from '../services/Router';
import { routes } from '~src/utiles/constants';

export class AuthActions {
  private readonly api: AuthApi;

  constructor() {
    this.api = AuthAPI;
  }

  async signin(data: AuthData) {
    await this.api.signin(data)
      .then(() => this.getUser())
      .then(() => router.go(routes.chats))

      .catch((err: any) => {
        if (err.status === 400) {
          this.logout()
            .then(() => {
              document.cookie = 'expires=0'
              this.signin(data)
              return null
            })
        }
        else {
          throw err
        }
      })
  }

  async signup(data: RegistrationData) {
    try {
      await this.api.signup(data);

      await this.getUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async getUser() {
    const user = await this.api.getUser();
    store.set({ user });
  }

  async logout() {
    try {
      await this.api.logout();
      router.go(routes.authorization);
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthActions();
