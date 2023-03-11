import { PageLayout } from '../../components/PageLayout';
import { ServerError } from '../../components/ServerError';

const error = new ServerError({ code: '404', message: 'Не туда попали' });

export const getNotFoundPage = () => new PageLayout({ content: error });
