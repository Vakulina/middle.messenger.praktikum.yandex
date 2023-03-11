import tpl from './tpl.hbs';
import Block from '../../services/Block';

interface UserItemProps {
  id: string | number,
  first_name: string,
  second_name: string,
  login: string
}

export class UserItem extends Block {
  constructor(props: UserItemProps) {
    super(
      'label',
      props,
    );
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}
