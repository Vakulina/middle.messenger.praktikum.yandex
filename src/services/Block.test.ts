import Block from "./Block";
import { expect } from "chai";
import sinon from "sinon";

describe('Block', () => {

  const eventBusMock = {
    on: sinon.fake(),
    emit: sinon.fake(),
    off:sinon.fake(),
    listeners:{}
  };

  const tmp = () => `<div>TEST</div>`;

  class Component extends Block {
    constructor(tagName, props) {
      super(tagName, props);

      this.eventBus = () => eventBusMock;
    }
    render() {
      return this.compile(tmp, {});
    }
  }

  const block = new Component('div', {attributes: {class: 'test-class'}});

  it.only('render() возвращает нужный фрагмент', () => {
    expect(block.element.innerHTML).to.eq('<div>TEST</div>');
  });

})
