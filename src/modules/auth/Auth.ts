import { PageLayout } from '~src/components/pageLayout';
import { AuthForm } from '../../components/authForm';

const form = AuthForm;
const authPage = new PageLayout({ content: form });

export const getAuthForm = () => {
  return authPage;
};
