import { v4 as makeUUID } from 'uuid';
import { isEqual } from '../utiles';

import { EventBus, IEventBus } from './EventBus';
import { router } from './Router';
import { State } from '../utiles/types';

export type PropsType = Record<string, string | Record<string, Function> | boolean | Record<string, typeof router>>;
export type ChildrenType = Record<string, Block | Block[] | any | typeof router>;

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  } as const;

  private _meta: { tagName: string, propsWithChildren: PropsType };

  private _element: HTMLElement;

  props: Record<string, string>;

  protected eventBus: () => IEventBus;

  protected children: ChildrenType;

  public id: string = makeUUID();

  private _state: Partial<State> = {};

  constructor(tagName = 'div', propsWithChildren = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      propsWithChildren,
    };
    this.children = this._makePropsProxy(children);
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  protected initChildren() { }

  private _getChildrenAndProps(propsWithChildren: ChildrenType): { props: Record<string, string>, children: ChildrenType } {
    const props: Record<string, string> = {};
    const children: ChildrenType = {};

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      (!(value instanceof Block) && !(value instanceof Array<Block>)) ? props[key] = value : children[key] = value;
    });
    return { props, children };
  }

  private _registerEvents(eventBus: IEventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  private _makePropsProxy(props: ChildrenType): ChildrenType {
    return new Proxy<ChildrenType>(props, {
      get(target: ChildrenType, property: string): unknown {
        const value: unknown = target[property as keyof ChildrenType];
        return (typeof value === 'function') ? (value as () => void).bind(target) : value;
      },
      set: (target: ChildrenType, property: string, value: unknown): boolean => {
        Reflect.set(target, property, value);
        this.eventBus().emit(Block.EVENTS.FLOW_CDU);
        return true;
      },
      deleteProperty() {
        throw new Error('нет доступа');
      },
    });
  }

  get element() {
    return this._element;
  }

  get state() {
    return this._state;
  }

  set state(data) {
    this._state = data;
  }

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 10);
    }

    return this.element!;
  }

  _init() {
    this._createResources();
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  private _createResources() {
    this._element = this._createDocumentElement(this._meta.tagName);
  }

  private _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  private _render() {
    this.initChildren();
    const fragment = this.render();
    this._removeEventListeners();
    this._element!.innerHTML = '';
    this._element!.append(fragment);
    this.addAttribute(null);
    this.addGlobalEvents();
    this._addEvents();
  }

  protected render() {
    return new DocumentFragment();
  }

  init() {

  }

  _addEvents() {
    const { events = {} } = this.props as PropsType & {
      events: Record<string, () => void>;
    };

    if (!events) {
      return;
    }

    Object.entries(events).forEach(([event, listener]) => {
      this._element!.addEventListener(event, listener);
    });
  }

  public addAttribute(newAttr: Record<string, string | boolean | number> | null) {
    const attr: Record<string, string | null> | undefined = {
      type: this.props.type || null,
      class: this.props.class || null,
      href: this.props.href || null,
      active: this.props.active || null,
      autofocus: this.props.autofocus || null,
      src: this.props.src || null,
      alt: this.props.alt || null,
      id: this.props.id || null,
    };
    Object.entries({ ...attr, ...newAttr }).forEach(([key, value]) => {
      if (value) this.element!.setAttribute(key, value as string);
    });
  }

  public addGlobalEvents() {

  }

  _removeEventListeners() {
    const { events } = this.props as PropsType & {
      events: Record<string, () => void>;
    };
    if (!events) {

    } else {
      Object.entries(events).forEach(([event, listener]) => {
        this._element!.removeEventListener(event, listener);
      });
    }
  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach((child) => child.dispatchComponentDidMount());
  }

  _componentDidUpdate() {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate(props: { oldProps?: ChildrenType, newProps?: ChildrenType } = {}) {
    if (!props.oldProps || !props.newProps) return true;

    if (isEqual(props.oldProps, props.newProps)) {
      return false;
    }

    return true;
  }

  setProps(nextProps: ChildrenType) {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, this.children, nextProps);
    this._state = nextProps;
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((child) => `<div data-id="${child.id}"></div>`);
      } else {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(contextAndStubs);

    const temp = document.createElement('template');

    temp.innerHTML = html;

    const replaceStub = (component: Block) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);

      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));

      stub.replaceWith(component.getContent()!);
    };

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(replaceStub);
      } else {
        replaceStub(component);
      }
    });

    return temp.content;
  }

  show() {
    if (this.getContent()) this.getContent()!.style.display = 'block';
  }

  hide() {
    if (this.getContent()) this.getContent()!.style.display = 'none';
  }
}
export default Block;
