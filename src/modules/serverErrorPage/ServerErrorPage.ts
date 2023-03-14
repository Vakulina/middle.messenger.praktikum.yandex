import { PageLayout } from '../../components/PageLayout';
import { serverError } from '../../components/ServerError';

const error = serverError({ code: '404', message: 'Не туда попали' });

const getServerErrorPage = () => new PageLayout({ content: error });
export default getServerErrorPage
