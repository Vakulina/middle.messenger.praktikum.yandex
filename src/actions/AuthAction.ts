import AuthAPI, { AuthApi, AuthData, RegistrationData} from '../api/Auth';
import store from '../services/Store';
import router from '../services/Router';
import { routes } from '~src/utiles/constants';

export class AuthActions {
  private readonly api: AuthApi;

  constructor() {
    this.api = AuthAPI;
  }

  async signin(data: AuthData) {
    try {
      await this.api.signin(data);

      router.go(routes.chats);
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: RegistrationData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
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
