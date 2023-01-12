import tpl from './tpl.hbs';
import s from './style.module.scss';

export default ({ name, accept=null, fileName='file.jpg', id }) => {
	return tpl({
		name, 
		fileName,
		class: s.fileInput,
		accept, 
		id
	});
}
