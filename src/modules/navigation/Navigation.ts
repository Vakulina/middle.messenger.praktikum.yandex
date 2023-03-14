import { router } from '../../services';

export const getNavigationPage = () => {
  return router.go('/messenger');
};
