import { PageLayout } from '../../components/PageLayout';
import { AuthForm } from '../../components/AuthForm';

const form = AuthForm;
const authPage = new PageLayout({ content: form });

export const getAuthForm = () => {
  return authPage;
};
