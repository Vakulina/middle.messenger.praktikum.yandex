export const VALIDATION_REGEXES = {
  'name': [
    '[A-ZА-ЯЁ][a-zA-Zа-яА-ЯёЁ -]',
    'Значение должно начинаться с заглавной буквы, может содержать буквы и дефис'
  ],
  'login': [
    '^[a-zA-Z][a-zA-Z0-9-_]{3,20}$',
    'Логин дожен состоять из латинских букв, может содержать цифры. Длина логина от 3 до 20 символов'
  ],
  'email': [
    '^[-.\w]+@([A-z0-9][-A-z0-9]+\.)+[A-z]{2,4}$',
    'Введите корректный email'
  ],
  'password': [
    '^(?=.*[A-Z])(?=.*\d)(?=.*\d).{8,40}$',
    'Введите пароль длиной от 8 до 40 символов, содержащий хотя бы одну заглавную букву и одну цифру'
  ],
  'phone': [
    '^\+?\d{10,15}',
    'Введите телефон, длиной от 10 до 15 цифр без пробелов'
  ],
  'message':[
    '^(?!\s*$).+',
    'Сообщение не должно быть пустым!'
  ]
}
