import Store, { State, StoreEvents } from './Store';

export default function connectWithStore(Component: any, mapStateToProps:(state:State)=>Partial<State>) {
  return class extends Component {
    constructor(tag: string, props = {}) {
      super(tag, { ...props, ...mapStateToProps(Store.getState() as State) });

      Store.on(StoreEvents.Updated, () => {
        this.setProps({...mapStateToProps(Store.getState() as State )});
      });
    }
  };
}
