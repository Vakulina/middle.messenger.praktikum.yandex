import { routes as ROUTES } from "~src/utiles/constants";
import Block from "./Block";
import Route from "./Route";

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

  use(pathname: string, block: Block) {
    const route = new Route(pathname, block);
    this.routes.push(route);
    return this;
  }

  /*start() {
    // Реагируем на изменения в адресной строке и вызываем перерисовку
    window.onpopstate = (event) => {
    if(event.currentTarget)  this._onRoute((event.currentTarget as Window).location.pathname);
    };

    this._onRoute(window.location.pathname);
  }*/
  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      if (target) this._onRoute(target.location.pathname);
    }
    this._onRoute(window.location.pathname);
  }


  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
    console.log("pathname", pathname, "route", route, "this._currentRoute", this._currentRoute)
    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  go(pathname: string) {
    this.history.pushState({}, "", pathname);
    this._onRoute(pathname);
  }

  getRoute(pathname: string) {
    console.log(this.routes)
    return this.routes.find(route => route.match(pathname)) || this.routes.find(route => route.match(ROUTES.notFound))
  }
}
const router = new Router();
export default router; 
