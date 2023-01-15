import tpl from './tpl.hbs';
import s from './style.module.scss';

const fileInput = ({ name, accept=null, fileName='file.jpg', id }) => {
	return tpl({
		name, 
		fileName,
		class: s.fileInput,
		accept, 
		id
	});
};
export default fileInput;
