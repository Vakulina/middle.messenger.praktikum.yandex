import { EventBus, IEventBus } from "./EventBus";

type PropsType = Record<string, string | Block>;
type ChildrenType = Record<string, Block>;

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
  protected children: ChildrenType

  constructor(tagName = "div", propsWithChildren = {}) {
    const eventBus = new EventBus();
    this._meta = {
      tagName,
      propsWithChildren
    };

    const { props, children } = this._getChildrenAndProps(propsWithChildren);

    this.children = children
    this.props = this._makePropsProxy(props);
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  private _getChildrenAndProps(propsWithChildren: PropsType): { props: Record<string, string>, children: ChildrenType } {
    const props: Record<string, string> = {};
    const children: ChildrenType = {}
    Object.entries(propsWithChildren).forEach(([key, value]) => {
      (value instanceof Block) ? children[key] = value : props[key] = value
    })
    return { props, children }
  }
  /* _registerEvents(eventBus) {
     eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
     eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
     eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
     eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this));
   }
 
   _createResources() {
     const { tagName } = this.meta;
     this.element = this._createDocumentElement(tagName);
   }
 
   init() {
     this._createResources();
     this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
   }
 
   _componentDidMount() {
     this.componentDidMount();
   }
 
   // Может переопределять пользователь, необязательно трогать
   componentDidMount(oldProps) { }
 
   dispatchComponentDidMount() {
     this._componentDidMount()
   }
 
   _componentDidUpdate(oldProps, newProps) {
 
     if (oldProps !== newProps) {
       this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
     }
   }
 
   // Может переопределять пользователь, необязательно трогать
   componentDidUpdate(oldProps, newProps) {
     return true;
   }
 
   set Props = nextProps => {
     if (!nextProps) {
       return;
     }
 
     Object.assign(this.props, nextProps);
   };
 
   get Element() {
     return this.element;
   }
 
   _render() {
     const block = this.render();
     // Этот небезопасный метод для упрощения логики
     // Используйте шаблонизатор из npm или напишите свой безопасный
     // Нужно не в строку компилировать (или делать это правильно),
     // либо сразу в DOM-элементы возвращать из compile DOM-ноду
     this.element.innerHTML = block;
   }
 
   // Может переопределять пользователь, необязательно трогать
   render() { }
 
   getContent() {
     return this.element;
   }
 
   _makePropsProxy(props) {
     const checkPrivateProp = prop => prop.startsWith('_');
     return new Proxy(props, {
       get(target, property, receiver) {
         if (checkPrivateProp(property)) {
           throw new Error("Нет прав");
         } else {
           if (property in target) {
             let value = Reflect.get(target, property, receiver);
             return typeof value == 'function' ? value.bind(target) : value;
           }
         }
       },
       set(target, property, value, receiver) {
         if (checkPrivateProp(property)) {
           throw new Error("Нет прав");
         } else {
           return Reflect.set(target, property, value, receiver);
         }
       },
       deleteProperty(target, property) {
         if (checkPrivateProp(property)) {
           throw new Error("Нет прав");
         } else {
           delete target[property];
           return true;
         }
       }
     })
   }
 
   _createDocumentElement(tagName) {
     // Можно сделать метод, который через фрагменты в цикле создаёт сразу несколько блоков
     return document.createElement(tagName);
   }
   show() {
     this.getContent().style.display = "block";
   }
 
   hide() {
     this.getContent().style.display = "none";
   }*/
}
export default Block; 
