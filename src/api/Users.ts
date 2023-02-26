import { UserDTO } from './Auth';
import BaseAPI from './BaseAPI';


export type RegistrationValuesType = {
  password: string,
  repeated_password: string,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string,
};

export class UsersApi extends BaseAPI {
  constructor() {
    super('/user');
  }

  async updateUserProfile(data: any) {
    return this.http.put('/profile', { data }) as Promise<UserDTO>
  }
  async updatePassword(prevPassword: string, newPassword: string) {
    return this.http.put('/password', {
      data: { prevPassword, newPassword },
    });
  }
  changeAvatar(formData: FormData) {
    return this.http.put('/profile/avatar', {
      data: formData,
      headers: { 'content-type': 'multipart/form-data' },
    });
  }
  searchUser(login: string) {
    return this.http.post('/search', { data: { login } });
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new UsersApi();
