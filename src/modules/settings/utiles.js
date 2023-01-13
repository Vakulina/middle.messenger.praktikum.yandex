import form from '../../components/form';
import image from '../../components/image';
import avatar from '../../../static/avatar.jpg'

const getRegistrationInfoTemplate = () => {

    const inputList = [
        { name: 'first_name', label: 'Имя', placeholder: 'Виктория', stylePrefix: 'setting' },
        { name: 'second_name', label: 'Фамилия', placeholder: 'Яковлева', stylePrefix: 'setting' },
        { name: 'display_name', label: 'Имя в чате', placeholder: 'Вакулина', stylePrefix: 'setting' },
        { name: 'login', label: 'Логин', placeholder: 'v.yakovleva', stylePrefix: 'setting' },
        { name: 'email', label: 'Почта', placeholder: 'pochta@yandex.ru', stylePrefix: 'setting', type:'mail' },
        { name: 'phone', label: 'Телефон', placeholder: '+7(918) 5000000', stylePrefix: 'setting' },
    ];

    const buttonList = [
        { id: 'save-reg-info', text: 'Сохранить', stylePrefix: 'save', type: 'submit' }
    ];
    return form({ inputList, buttonList, title: 'Личные данные', stylePrefix: 'tabs' });
}

const getAvatarTemplate = () => {

    const inputList = [
        { name: 'avatar', stylePrefix: 'file', type:'file', accept:"image/*", id:'avatar-input' },
    ];

    const buttonList = [
        { id: 'save-avatar', text: 'Сохранить', stylePrefix: 'save-avatar', type: 'submit' }
    ];
    return form({ inputList, buttonList, title: 'Аватар', stylePrefix: 'tabs',  image: image({url:avatar, alt:'аватар', stylePrefix:'avatar'}) });
}

const getPasswordTemplate = () => {

    const inputList = [
        { name: 'old_password', label: 'Текущий пароль', placeholder: '*******', stylePrefix: 'setting', type:'password' },
        { name: 'new_password', label: 'Новый пароль', placeholder: '', stylePrefix: 'setting', type:'password' },
        { name: 'repeated_password', label: 'Повторите пароль', placeholder: '', stylePrefix: 'setting', type:'password' },
    ];

    const buttonList = [
        { id: 'save-new-password', text: 'Сохранить', stylePrefix: 'save', type: 'submit' }
    ];
    return form({ inputList, buttonList, title: 'Безопасность', stylePrefix: 'tabs' });
}

const registrationInfoTemplate = getRegistrationInfoTemplate();
const avatarTemplate = getAvatarTemplate();
const passwordTemplate = getPasswordTemplate();

export { registrationInfoTemplate, avatarTemplate, passwordTemplate }
