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
