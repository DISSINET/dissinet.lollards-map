import * as React from "react";
import MapComponent from "./map";
import PanelComponent from "./panel";
import WelcomeComponent from "./welcome";
import { observer } from "mobx-react";

type Props = {
  store: any;
};
@observer
export default class App extends React.Component<Props> {
  constructor(props) {
    super(props);
  }

  render() {
    const store = this.props.store;
    return (
      <div>
        <MapComponent
          handleMapMoved={store.mapMoved.bind(store)}
          center={store.center}
          zoom={store.zoom}
          active={store.active}
        />
        <PanelComponent
          filters={store.filters}
          activateFilter={store.activateFilter.bind(store)}
          openWelcome={store.openWelcome.bind(store)}
        />
        {store.welcome && (
          <WelcomeComponent
            data={store.data}
            handleClose={store.closeWelcome.bind(store)}
          />
        )}
      </div>
    );
  }
}
