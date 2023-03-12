import Block from './Block';
import { render } from './renderBlock';

function isEqualURL(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  private _block: Block | null;

  private _rootQuery: string;

  constructor(private _pathname: string, private _blockClass: Block, _rootQuery = 'root') {
    this._rootQuery = _rootQuery;
  }

  navigate(pathname: string) {
    if (this.match(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave() {
    if (this._block) {
      this._block = null;
    }
  }

  match(pathname: string) {
    return isEqualURL(pathname, this._pathname);
  }

  render() {
    this._block = this._blockClass;
    render(this._block, this._rootQuery);
  }
}
export default Route;
