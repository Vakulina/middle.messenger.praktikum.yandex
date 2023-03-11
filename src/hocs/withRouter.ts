import { ChildrenType } from '../services/Block';
import { router } from '../services/Router';


export function withRouter(Component: any) {
  return class WithRouter extends Component<ChildrenType> {
    protected props: ChildrenType;

    constructor(props: ChildrenType) {
      const propsWithChildren = { ...props, router };
      super(propsWithChildren);
    }
  };
}

export interface PropsWithRouter {
  router: typeof router;
}
