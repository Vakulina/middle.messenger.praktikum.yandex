import { v4 as makeUUID } from 'uuid';

import { EventBus, IEventBus } from "./EventBus";

export type PropsType = Record<string, string | Block>;
export type ChildrenType = Record<string, Block>;

abstract class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_RENDER: "flow:render",
    FLOW_CDU: "flow:component-did-update",
  } as const;

  private _meta: { tagName: string, propsWithChildren: PropsType };
  private _element: HTMLElement | null = null;
  protected props: Record<string, string>;
  protected eventBus: () => IEventBus;
  protected children: ChildrenType;
  public id: string = makeUUID()

  constructor(tagName = "div", propsWithChildren = {}) {
    const eventBus = new EventBus();
    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this._meta = {
      tagName,
      propsWithChildren
    };
    this.children = children
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }
  protected initChildren() { }

  private _getChildrenAndProps(propsWithChildren: PropsType): { props: Record<string, string>, children: ChildrenType } {
    const props: Record<string, string> = {};
    const children: ChildrenType = {}

    Object.entries(propsWithChildren).forEach(([key, value]) => {
      (value instanceof Block) ? children[key] = value : props[key] = value
    })
    return { props, children }
  }

  private _registerEvents(eventBus: IEventBus) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }


  private _makePropsProxy(props: Record<string, string>) {
    const checkPrivateProp: (prop: string) => boolean = prop => prop.startsWith('_');

    return new Proxy(props, {
      get(target, property: string, receiver) {
        if (checkPrivateProp(property)) {
          throw new Error("Нет прав");
        } else {
          if (property in target) {
            let value = Reflect.get(target, property, receiver);
            return typeof value == 'function' ? value.bind(target) : value;
          }
        }
      },
      set(target, property: string, value, receiver) {
        if (checkPrivateProp(property)) {
          throw new Error("Нет прав");
        } else {
          return Reflect.set(target, property, value, receiver);
        }
      },
      deleteProperty(target, property: string) {
        if (checkPrivateProp(property)) {
          throw new Error("Нет прав");
        } else {
          delete target[property];
          return true;
        }
      }
    })
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
    this._addEvents();
    this.addAttribute();
  }

  protected render() {
    return new DocumentFragment()
  }
  _addEvents() {
    const { events = {} } = this.props as PropsType & { events: Record<string, () => void> };

    Object.keys(events).forEach(eventName => {
      this._element?.addEventListener(eventName, events[eventName]);
    });
  }
  public addAttribute() {
    const attr: Record<string, string | null> | undefined = {
      type: this.props.type || null,
      class: this.props.class || null,
      href: this.props.href || null,
      active: this.props.active || null,
      autofocus: this.props.autofocus || null,
      src: this.props.src || null,
      alt: this.props.alt || null
    }
    Object.entries(attr).forEach(([key, value]) => {
      if (value) this.element!.setAttribute(key, value);
    });
  }
  _removeEventListeners() {
    const { events } = this.props as PropsType & { events: Record<string, () => void> };
    if (!events) {
      return;
    }
    else {
      Object.keys(events).forEach((eventName) => {
        this._element?.removeEventListener(eventName, events[eventName]);
      })
    }

  }

  _componentDidMount() {
    this.componentDidMount();
  }

  componentDidMount() { }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
    Object.values(this.children).forEach(child => child.dispatchComponentDidMount());
  }

  _componentDidUpdate(oldProps: PropsType, newProps: PropsType) {
    if (this.componentDidUpdate()) {
      this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
    }
  }

  componentDidUpdate() {
    return true;
  }

  setProps = (nextProps: PropsType) => {
    if (!nextProps) {
      return;
    }
    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  }

  protected compile(template: (context: any) => string, context: any) {
    const contextAndStubs = Object.assign({}, context);

    Object.entries(this.children).forEach(([name, component]) => {
      contextAndStubs[name] = `<div data-id="${component.id}"></div>`;
    });

    const html = template(contextAndStubs);
    const temp = document.createElement('template');
    temp.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      const stub = temp.content.querySelector(`[data-id="${component.id}"]`);
      if (!stub) {
        return;
      }

      component.getContent()?.append(...Array.from(stub.childNodes));
      stub.replaceWith(component.getContent()!);
    });
    return temp.content;
  }

  show() {
    if (this.getContent()) this.getContent()!.style.display = "block";
  }

  hide() {
    if (this.getContent()) this.getContent()!.style.display = "none";
  }
}
export default Block; 
