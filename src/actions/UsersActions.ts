import UsersAPI from '../api/Users';
import Store from '../services/Store';
import AuthActions from './AuthActions';

class UsersActions {

  public async updateUserProfile(data: any) {
    await UsersAPI.updateUserProfile(data)
      .then(res => Store.set({ user: res }))
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return UsersAPI.updatePassword(oldPassword, newPassword);
  }

  public async changeAvatar(file: File) {
    const formData = new FormData();
    formData.append('avatar', file, file.name);
    console.log({ file });
    const response = await UsersAPI.changeAvatar(formData);
    await AuthActions.getUser();
    return response;
  }

  public searchUser(login: string) {
    return UsersAPI.searchUser(login);
  }
}

export default new UsersActions();
