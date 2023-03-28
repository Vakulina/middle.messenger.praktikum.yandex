import { PageLayout } from '../../components/PageLayout';
import { RegistrationForm } from '../../components/RegistrationForm';

const form = RegistrationForm;
const registrationPage = new PageLayout({ content: form });

export const getRegistrationForm = () => {
  return registrationPage;
};
