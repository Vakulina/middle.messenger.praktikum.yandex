import BaseAPI from './BaseApi';

export interface AuthData {
  login: string;
  password: string;
}

export interface RegistrationData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}

export type RegistrationValuesType = {
  password: string,
  repeated_password: string,
  first_name: string,
  second_name: string,
  login: string,
  email: string,
  phone: string,
};

export interface UserDTO {
  avatar?: string | File;
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
  display_name?:string
}

export class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async signin(data: AuthData) {
    return this.http.post('/signin', { data });
  }

  signup(data: RegistrationData) {
    return this.http.post('/signup', { data });
  }

  getUser(): Promise<UserDTO> {
    const res = this.http.get('/user');
    return res as Promise<UserDTO>;
  }

  logout() {
    return this.http.post('/logout');
  }

  create:any = undefined;

  update:any = undefined;

  delete:any = undefined;

  read:any = undefined;
}

export default new AuthApi();
