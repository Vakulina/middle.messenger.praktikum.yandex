import { ErrorType } from '~src/services';
import UsersAPI from '../api/Users';
import Store from '../services/Store';
import AuthActions from './AuthActions';

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

  public changeAvatar() {
    const myForm = document.querySelector('form') || undefined
    const avatar = myForm!.querySelector('input')

    const form = new FormData();

    form.append('avatar', avatar!.files![0], 'avatar.png');


    //  formData.set('avatar', file);
    // console.log({ file });
    UsersAPI.changeAvatar(form);
    // console.log(response)
    //await AuthActions.getUser();
    // return response;
  }

  public searchUser(login: string) {
    return UsersAPI.searchUser(login);
  }
}

export default new UsersActions();
