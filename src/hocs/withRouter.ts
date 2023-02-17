import Block, { ChildrenType} from '~src/services/Block'; 
import router from '~src/services/Router'; 

interface WithRouterProps extends ChildrenType{
  router: typeof router
}


export function withRouter(Component: any) {

  return class WithRouter extends Component<WithRouterProps>{
    protected props: WithRouterProps
    constructor(props: WithRouterProps) {
     const propsWithChildren = { ...props, router: router }
      super(propsWithChildren);
    }
  }
}

export interface PropsWithRouter {
  router: typeof router;
}
/*
export default function withRouter<P extends WithRouterProps>(WrappedBlock: typeof Block) {
  return class extends WrappedBlock {

    constructor(props: P) {
      super({ ...props, router});
    }
  } as Block;
}*/


/*
export function withRouter<T extends Block&PropsWithRouter>(Component: T) {

  return class WithRouter extends Component{
    constructor({props}: ChildrenType& PropsType) {
      super({...props, router} );
    }
  }
}
export interface PropsWithRouter {
  router: typeof router;
}
*/



