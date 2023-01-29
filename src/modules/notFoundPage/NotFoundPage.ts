import { PageLayout } from "~src/components/pageLayout"
import {ServerError} from '../../components/serverError';
import {Link} from '../../components/link/Link';

const linkTemplate = new Link({ href: '/chats', text: 'Назад к чатам' });

const error = new ServerError({ code: '404', message: 'Не туда попали', link: linkTemplate });

export const getNotFoundPage = () => new PageLayout({content: error});

