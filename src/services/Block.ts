import { v4 as makeUUID } from 'uuid';

import { EventBus, IEventBus } from './EventBus';

export type PropsType = Record<string, string | Record<string, Function> | boolean>;
export type ChildrenType = Record<string, Block | Block[] | any>;

abstract class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_RENDER: 'flow:render',
    FLOW_CDU: 'flow:component-did-update',
  } as const;

  private _meta: { tagName: string, propsWithChildren: PropsType };

  private _element: HTMLElement;

  protected props: Record<string, string>;

  protected eventBus: () => IEventBus;

  protected children: ChildrenType;

  public id: string = makeUUID();

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
      ((value instanceof Block) || (value instanceof Array<Block>)) ? children[key] = value : props[key] = value;
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

  getContent(): HTMLElement {
    if (this.element?.parentNode?.nodeType === Node.DOCUMENT_FRAGMENT_NODE) {
      setTimeout(() => {
        if (
          this.element?.parentNode?.nodeType !== Node.DOCUMENT_FRAGMENT_NODE
        ) {
          this.eventBus().emit(Block.EVENTS.FLOW_CDM);
        }
      }, 100);
    }

    return this.element!;
  }

  private _init() {
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
    this._element!.innerHTML = '';
    this._element!.append(fragment);
    this.addAttribute(null);
    this._addEvents();
  }

  protected render() {
    return new DocumentFragment();
  }

  _addEvents() {
    const { events = {} } = this.props as PropsType & { events: Record<string, () => void> };
    Object.keys(events).forEach((eventName) => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }

  public addAttribute(newAttr: Record<string, string> | null) {
    const attr: Record<string, string | null> | undefined = {
      type: this.props.type || null,
      class: this.props.class || null,
      href: this.props.href || null,
      active: this.props.active || null,
      autofocus: this.props.autofocus || null,
      src: this.props.src || null,
      alt: this.props.alt || null,
    };
    Object.entries({ ...attr, ...newAttr }).forEach(([key, value]) => {
      if (value) this.element!.setAttribute(key, value);
    });
  }

  _removeEventListeners() {
    const { events } = this.props as PropsType & { events: Record<string, () => void> };
    if (!events) {

    } else {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName]);
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
    if (!props.oldProps && !props.oldProps) return true;
    return false;
  }

  setProps(nextProps: PropsType) {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = { ...context };

    Object.entries(this.children).forEach(([name, component]) => {
      if (component instanceof Block) {
        contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
      if (Array.isArray(component)) {
        contextAndStubs[name] = component.map((item) => {
          return `<div data-id=${item.id}></div>`;
        });
      }
    });
    const html = template(contextAndStubs);

    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.values(this.children).forEach((component) => {
      if (Array.isArray(component)) {
        component.forEach((item) => {
          const stub = temp.content.querySelector(
            `[data-id="${item.id}"]`,
          );
          stub?.replaceWith(item.getContent());
        });
      } else {
        const stub = temp.content.querySelector(
          `[data-id="${component.id}"]`,
        );
        stub?.replaceWith(component.getContent());
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
