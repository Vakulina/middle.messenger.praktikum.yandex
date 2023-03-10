import { UserDTO } from '~src/api/AuthApi';
import { UserItem } from '../UsersItem';

export const getUsersList = (items: UserDTO[]) => {
  return items.map((item) => {
    return new UserItem(
      {
        id: item.id,
        first_name: item.first_name,
        second_name: item.second_name,
        login: item.login,
      },
    );
  });
};
