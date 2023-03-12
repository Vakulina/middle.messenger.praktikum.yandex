import Block from './Block';
import Store, { State, StoreEvents } from './Store';
import { isEqual } from '../utiles';

export default function connectWithStore(
  tag: string,
  Component: typeof Block,
  mapStateToProps: (state: State) => Partial<State>,
  props?: any,
) {
  class ConnectedComponent extends Component {

    constructor(tag: string, props?: object) {
      let prevState
      prevState = mapStateToProps(Store.getState() as State);

      super(tag, { ...props, ...prevState });

      Store.on(StoreEvents.Updated, () => {
        const stateProps = mapStateToProps(Store.getState() as State);

        if (isEqual(prevState, stateProps)) {
          return;
        }
        prevState = stateProps;

        this.setProps({ ...stateProps });
      });
    }
  }
  return new ConnectedComponent(tag, props);
}
