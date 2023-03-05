import Block from './Block';
import Store, { State, StoreEvents } from './Store';

export default function connectWithStore(
  tag: string,
  Component: typeof Block,
  mapStateToProps: (state: State) => Partial<State>,
  props?: any,
) {
  class ConnectedComponent extends Component {
    constructor(tag: string, props?: object) {
      super(tag, { ...props, ...mapStateToProps(Store.getState() as State) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(Store.getState() as State) });
        this.state = { ...mapStateToProps(Store.getState() as State) };
      });
    }
  }
  return new ConnectedComponent(tag, props);
}
