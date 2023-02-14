import Block from "./Block";

class Router {
  routes: Array<any>;
  history: History;
  private _currentRoute: any;
  private static __instance: Router;

  constructor() {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];
    this.history = window.history;
    this._currentRoute = null;
    Router.__instance = this;
  }

  use(pathname:string, block:Block) {
    const route = new Route(pathname, block);
    this.routes.push(route);
   return this;
}

  start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event) => {
    if(event.currentTarget)  this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  _onRoute(pathname:string) {
    const route = this.getRoute(pathname);
    if (!route) {
      return;
    }

    if (this._currentRoute) {
      this._currentRoute.leave();
    }

    route.render(route, pathname);
  }

  go(pathname:string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname:string) {
    return this.routes.find(route => route.match(pathname));
  }
}
const router = new Router();
export default router; 
