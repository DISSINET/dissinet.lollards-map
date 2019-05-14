import * as React from "react";
import MapComponent from "./map";
import PanelComponent from "./panel";
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
        />
        <PanelComponent />
      </div>
    );
  }
}
