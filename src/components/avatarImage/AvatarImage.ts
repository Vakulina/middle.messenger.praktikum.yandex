import tpl from './tpl.hbs';
import * as s from "./style.module.scss";
import styles from '../../utiles/styles';
import Block from '~src/services/Block';
import connectWithStore from '~src/services/connectWithStore';
import avatarBase from '../../../static/avatar.jpg';

interface ImageProps {
  avatar?: any,
  alt?: string,
  stylePrefix: string | null,
}

export class AvatarImageBase extends Block {

  constructor(tag = 'img', {
    stylePrefix = 'avatar',
    avatar,
    alt = 'аватар',
    ...otherProps
  }: ImageProps) {
    super(
      tag,
      {
        alt,
        src: avatar ? avatar : avatarBase || "",
        class: `${s.image} ${styles.getClassWithPrefix(s, 'image', stylePrefix)}`,
        ...otherProps,
      },
    );
  }

  public addAttribute(newAttr: Record<string, string> | null): void {
    super.addAttribute(newAttr)
    if (typeof this.props.avatar === 'string') {
      this.element!.setAttribute('src', this.props.avatar);
    }
    else if(typeof this.props.avatar !== 'undefined'){
      var reader = new FileReader();
      reader.readAsDataURL(this.props.avatar as Blob);
      reader.onload= () => {
        this.element!.setAttribute('src', `${reader.result}`);
      }
    }
  }

  protected render() {
    return this.compile(tpl, this.props);
  }
}

export const avatarImage = connectWithStore('img', AvatarImageBase,
  (state) => {

    const { avatar } = state;
    //  console.log(avatar)
    return { avatar }
  },
)
