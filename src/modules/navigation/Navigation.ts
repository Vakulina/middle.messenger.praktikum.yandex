import { router } from '../../services/Router';

export const getNavigationPage = () => {
  return router.go('/messenger');
};
