import Store, { State, StoreEvents } from './Store';

export default function connectWithStore(Component: any, args: object, mapStateToProps: (state: State) => Partial<State>,) {
   class ConnectedComponent extends Component {

    constructor(tag: string, props = args||{}) {
      super(tag, { ...props, ...mapStateToProps(Store.getState() as State) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({ ...mapStateToProps(Store.getState() as State) });
        this.state={ ...mapStateToProps(Store.getState() as State) };
      });
    }
  }
  return new ConnectedComponent()
}
