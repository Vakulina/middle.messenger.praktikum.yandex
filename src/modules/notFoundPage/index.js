import pageLayout from '../../components/pageLayout';
import error from '../../components/error';
import link from '../../components/link'

const linkTemplate = link({ href: '/chats', text: 'Назад к чатам' })

const errorTemplate = error({ code: '404', message: 'Не туда попали', link: linkTemplate });

export default () => {
	return pageLayout(errorTemplate);
}