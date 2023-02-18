import { routes as ROUTES } from "~src/utiles/constants";
import Block from "./Block";
import Route from "./Route";

class Router {
  routes: Array<any>;
  history: History;
  _currentRoute: any;
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

  use(pathname: string, block: Block, ) {
    const route = new Route(pathname, block);
    this.routes.unshift(route);
    return this;
  }

  public start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;
      if (target) this._onRoute(target.location.pathname);
    }
    this._onRoute(window.location.pathname);
  }


  private _onRoute(pathname: string) {
    const route = this.getRoute(pathname);
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
    return this.routes.find(route => route.match(pathname)) || this.routes.find(route => route.match(ROUTES.notFound))
  }
}
const router = new Router();
export default router; 
