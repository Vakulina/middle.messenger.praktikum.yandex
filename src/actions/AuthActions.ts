import AuthAPI, { AuthApi, AuthData, RegistrationData } from '../api/AuthApi';
import { router } from '../services/Router';
import { routes } from '../utiles/constants';
import Store from '../services/Store';
import type { ErrorType } from '../services/HTTPTransport';
import { chatsActions } from './ChatsActions';

class AuthActions {
  private readonly api: AuthApi;

  constructor() {
    this.api = AuthAPI;
  }

  async signin(data: AuthData) {
    await this.api.signin(data)
      .then(() => chatsActions.getChats())
      .then(() => Store.set({ isLogin: true }))
      .then(() => Store.set({ isAuthError: null }))
      .then(() => this.getUser())
      .then(() => router.go(routes.chats))

      .catch((err: ErrorType) => {
        if (err.status === 400) {
          this.logout()
            .then(() => {
              document.cookie = 'expires=0';
              this.signin(data)
                .catch((err) => {
                  Store.set({ isAuthError: err });
                });
            });
        } else {
          Store.set({ isAuthError: err });
        }
      });
  }

  async signup(data: RegistrationData) {
    try {
      await this.api.signup(data);
      Store.set({ isRegistrationError: null });
      this.getUser();
      chatsActions.getChats();
      router.go(routes.setting);
    } catch (err: unknown) {
      Store.set({ isRegistrationError: err as ErrorType });
    }
    // await this.getUser();
  }

  async getUser() {
    try {
      const response = await this.api.getUser();
      Store.set({ user: response });
      Store.set({ avatar: `https://ya-praktikum.tech/api/v2/resources${response.avatar}` });
      return response;
    } catch (err: unknown) {
      console.error(err);
      return new Error(err as string);
    }
  }

  async logout() {
    try {
      await this.api.logout();
      Store.set({ isLogin: false });
      router.go(routes.authorization);
    } catch (e: unknown) {
      console.error(e);
    }
  }
}

export default new AuthActions();
