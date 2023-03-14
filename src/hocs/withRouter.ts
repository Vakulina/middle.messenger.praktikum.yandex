import { ChildrenType } from '../services/Block';
import { router } from '../services/Router';

export interface PropsWithRouter {
  router: typeof router;
}

export function withRouter(Component: any) {
  type Props = any;
  return class WithRouter extends Component<ChildrenType> {
    constructor(props: Props & PropsWithRouter) {
      super({ ...props, router });
    }
  };
}
