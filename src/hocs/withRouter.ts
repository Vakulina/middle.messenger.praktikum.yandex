import Block from '~src/services/Block'; 
import router from '~src/services/Router'; 

export function withRouter(component: any) {
  type Props = typeof component;

  return class WithRouter extends Block {
    constructor(propsWithChildren: Props & PropsWithRouter) {
      console.log(propsWithChildren)
      super({ ...propsWithChildren, router });
    }
  }
}

export interface PropsWithRouter {
  router: typeof router;
}
