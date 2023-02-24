import Store, { State, StoreEvents } from './Store';

export default function connectWithStore(
  tag: string,
  Component: any,
  mapStateToProps: (state: State) => Partial<State>,
  ) {
  class ConnectedComponent extends Component {

    constructor(tag: string, props = {}) {
      super(tag, { ...props, ...mapStateToProps(Store.getState() as State) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(Store.getState() as State) });
        this.state = { ...mapStateToProps(Store.getState() as State) };
      });
    }
  }
  return new ConnectedComponent(tag)
}
