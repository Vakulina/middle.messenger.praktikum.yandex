import AuthAPI, { AuthApi, AuthData, RegistrationData } from '../api/Auth';
import router from '../services/Router';
import { routes } from '~src/utiles/constants';
import Store from '../services/Store';
import { ErrorType } from '~src/services';

class AuthActions {
  private readonly api: AuthApi;

  constructor() {
    this.api = AuthAPI;
  }

  async signin(data: AuthData) {
    await this.api.signin(data)
      .then(() => Store.set({ isLogin: true }))
      .then(() => Store.set({ isAuthError: null }))
      .then(() => this.getUser())
      .then(() => router.go(routes.chats))

      .catch((err: ErrorType) => {
        if (err.status === 400) {
          this.logout()
            .then(() => {
              document.cookie = 'expires=0'

              this.signin(data)
                .catch((err) => {
                  //установить ошибку authForm
                  Store.set({ isAuthError: err })
                })
            })
        }
        else {
          //установить ошибку authForm
          Store.set({ isAuthError: err })
        }
      })
  }

  async signup(data: RegistrationData) {
    await this.api.signup(data)
      .then(() => Store.set({ isRegistrationError: null }))
     .then(() => this.getUser())
      .then(()=>router.go(routes.setting))
      .catch((err: ErrorType) => {
        Store.set({ isRegistrationError: err })
      })

   // await this.getUser();


  }

  async getUser() {
    await this.api.getUser()
    .then(res => Store.set({ user: res }))   
  }

  async logout() {
    await this.api.logout()
      .then((res) => Store.set({ isLogin: false }))
      .then((res) => router.go(routes.authorization))
      .catch((e: any) => {
        console.error(e.message);
      })
  }
}

export default new AuthActions();
