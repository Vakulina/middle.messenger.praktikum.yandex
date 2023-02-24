import BaseAPI from './BaseAPI';

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

export interface UserDTO {
  id: number;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
}   


export class AuthApi extends BaseAPI {
  constructor() {
    super('/auth');
  }

  async signin(data: AuthData) {
    return this.http.post('/signin', {data});
  }

  signup(data: RegistrationData) {
    return this.http.post('/signup', {data});
  }

  getUser(): Promise<UserDTO> {
    return this.http.get('/user') as Promise<UserDTO>;
  }

  logout() {
    return this.http.post('/logout');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
  read = undefined;
}

export default new AuthApi();
