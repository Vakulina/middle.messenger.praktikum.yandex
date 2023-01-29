import tpl from './tpl.hbs';
import s from './style.module.scss';
import styles from '../../utiles/styles';
import Block from '~src/services/Block';
/*
const fileInput = ({
  name, accept = null, fileName = 'file.jpg', id,
}) => tpl({
  name,
  fileName,
  class: s.fileInput,
  accept,
  id,
});
export default fileInput;
*/

interface FileInputProps {
  label?: string,
  stylePrefix?: string | null,
  accept: string,
  value?: string,
  events?: {
    change?: (e: InputEvent) => unknown; //произойдет при потере фокуса
    input?: (e: InputEvent) => unknown;
  }
  name?: string,
  type?:'file'
}

export class FileInput extends Block {
  constructor({
    type = 'file',
    stylePrefix=null,
    events = {
      input: (e) => {
        console.log(e.target)
      }
    },
    ...otherProps
  }: FileInputProps) {
    super('fieldset',
      {
        type,
        class: s.fileInput,
        events,
        ...otherProps
      })
  }
  protected render() {
    return this.compile(tpl, this.props);
  }
}
/*function(){
	let $files_list = $(this).closest('.input-file').next();
	$files_list.empty();
 
	for(var i = 0; i < this.files.length; i++){
		let file = this.files.item(i);
		dt.items.add(file);    
   
		let reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = function(){
			let new_file_input = '<div class="input-file-list-item">' +
				'<img class="input-file-list-img" src="' + reader.result + '">' +
				'<span class="input-file-list-name">' + file.name + '</span>' +
				'<a href="#" onclick="removeFilesItem(this); return false;" class="input-file-list-remove">x</a>' +
			'</div>';
			$files_list.append(new_file_input); 
		}
	};*/
