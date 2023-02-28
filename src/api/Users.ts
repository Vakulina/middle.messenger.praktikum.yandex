import { UserDTO } from './Auth';
import BaseAPI from './BaseAPI';


export type ChangePasswordType = {
  oldPassword: string,
  repeated_password: string,
  password: string
};

export class UsersApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  async updateUserProfile(data: any) {
    return this.http.put('/profile', { data }) as Promise<UserDTO>
  }
  async updatePassword(oldPassword: string, newPassword: string) {
    return this.http.put('/password', {
      data: { oldPassword, newPassword },
    });
  }
  async changeAvatar(formData: FormData) {
    return this.http.put('/profile/avatar', {
      isFormData: true,
      data: formData,
 
    }) as Promise<UserDTO>
  }
  async searchUser(login: string) {
    return this.http.post('/search', { data: { login } });
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UsersApi();
