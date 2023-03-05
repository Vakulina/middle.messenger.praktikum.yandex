import { ChildrenType } from '~src/services/Block';
import router from '~src/services/Router';

interface WithRouterProps extends ChildrenType {
  router?: typeof router
}
export function withRouter(Component: any) {
  return class WithRouter extends Component<WithRouterProps> {
    protected props: WithRouterProps;

    constructor(props: WithRouterProps) {
      const propsWithChildren = { ...props, router };
      super(propsWithChildren);
    }
  };
}

export interface PropsWithRouter {
  router: typeof router;
}
