import Block from './Block';

export function render(pageTemplate: Block, rootQuery:string) {
  const root = document.getElementById(rootQuery);
  root!.innerHTML = '';
  root!.appendChild(pageTemplate.getContent()!);
}

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
