import { Form } from '../../components/form';
import image from '../../components/image';
import avatar from '../../../static/avatar.jpg';


const getAvatarTemplate = () => {
  const inputList = [
    {
      name: 'avatar', stylePrefix: 'file', type: 'file', accept: 'image/*', id: 'avatar-input',
    },
  ];

  const buttonList = [
    {
      text: 'Сохранить', stylePrefix: 'save-avatar', type: 'submit',
    },
  ];
  return new Form({
    inputList,
    buttonList,
    title: 'Аватар',
    stylePrefix: 'tabs',
    image: image({ src: avatar, alt: 'аватар', stylePrefix: 'avatar' }),
  });
};



const avatarTemplate = getAvatarTemplate();


export { registrationInfoTemplate, avatarTemplate, passwordTemplate };
