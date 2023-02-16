import Block from "./Block";
import { render } from "./renderBlock";


function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

class Route {
  private _block: Block | null
  private _rootQuery: string
  constructor(private _pathname: string, private _blockClass: Block,  _rootQuery='root') {
    this._rootQuery=_rootQuery
    // this._props = props;
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
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      this._block = this._blockClass;
      console.log(this._rootQuery)
      render(this._block, this._rootQuery);
      return;
    }

  }
}
export default Route
