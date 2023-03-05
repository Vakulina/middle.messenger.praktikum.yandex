import { UserDTO } from '~src/api/AuthApi';
import { ErrorType } from '~src/services';
import UsersAPI from '../api/UsersApi';
import Store from '../services/Store';

class UsersActions {

  public async updateUserProfile(data: any) {
    await UsersAPI.updateUserProfile(data)
      .then(res => Store.set({ user: res }))
  }

  public async changePassword(oldPassword: string, newPassword: string) {
    await UsersAPI.updatePassword(oldPassword, newPassword)
      .then(() => Store.set({ isPasswordSettingsError: null }))
      .catch((err: ErrorType) => {
        Store.set({ isPasswordSettingsError: err })
      })
  }

  public async changeAvatar() {
    const form = new FormData();
    const state = Store.getState()
    if ('avatar' in state) {
      const avatar = state.avatar
      form.append('avatar', avatar, 'avatar.png');
    }
    const response = await UsersAPI.changeAvatar(form);
    Store.set({ avatarName: '' })
    Store.set({ user: response })
    Store.set({ avatar: `https://ya-praktikum.tech/api/v2/resources${response.avatar}` })
    //await AuthActions.getUser();
  }

  public async searchUsers(login: string): Promise<UserDTO[]> {
 const result =   await UsersAPI.searchUser(login)
      .then(res => {
        return res
      })
      .catch((err: ErrorType) => {
        Store.set({ isServerError: err })
        return []
      })
      return result as  Promise<UserDTO>
  }


}


export default new UsersActions();
