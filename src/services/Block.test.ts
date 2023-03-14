import Block from "./Block";
import { expect } from "chai";
import sinon from "sinon";

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
  off: sinon.fake(),
  listeners: {}
};


describe('Block', () => {


  const tmp = () => `<div>TEST</div>`;

  class Component extends Block {
    constructor(tagName, props) {
      super(tagName, props);

      this.eventBus = () => new class {
        emit = eventBusMock.emit;
        on = eventBusMock.on;
        off = eventBusMock.off;
        listeners: {}
      }
    }
    render() {
      return this.compile(tmp, {});
    }
  }
  const block = new Component('div', { attributes: { class: 'test-class' } });
  
  it('render() возвращает нужный фрагмент', () => {
    expect(block.element.innerHTML).to.eq('<div>TEST</div>');
  });

  it('getContent() возвращает HTMLElement', () => {
    expect(block.getContent()).to.eq(block.element);
  });

  it('setProps() устанавливает пропсы', () => {
    block.setProps({ test: 'test' });
    const props = block.props.test;
    expect(props).to.eq('test');
  });

  it('setProps() обновляет пропсы новыми значениями', () => {
    block.setProps({ test: 'test' });
    block.setProps({ test: 'testNew' });
    const props = block.props.test;
    expect(props).to.eq('testNew');
  });

  it('addAttribute() добавляет атрибут', () => {
    block.addAttribute({ 'data-attribute': 'test-attr' })
    expect(block.element.getAttribute('data-attribute')).to.eq('test-attr');
  });

  it('При добавлении пропсов срабатывает событие "flow:component-did-update"', () => {
    block.setProps({ test: 'test' });
    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(true);
  });
})
