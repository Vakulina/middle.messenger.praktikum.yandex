import { PageLayout } from '~src/components/pageLayout';
import { RegistrationForm } from '../../components/registrationForm';

const form = new RegistrationForm({ title: 'Регистрация', stylePrefix: 'reg' });
const registrationPage = new PageLayout({ content: form });

export const getRegistrationForm = () => {
  return registrationPage;
};
