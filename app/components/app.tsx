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

  handleTogglePanel() {
    this.props.store.togglePanel();
  }

  render() {
    const store = this.props.store;
    return (
      <div className={store.panel ? "panel-on" : "panel-off"}>
        {store.panel ? (
          <button
            className=" m-0 panel-hider on text-base muni bg-black"
            onClick={this.handleTogglePanel.bind(this)}
            title="toggle panel"
          >
            <i className="text-bold icon icon-arrow-alt-from-left" />
          </button>
        ) : (
          <button
            className=" m-0 panel-hider off text-base muni bg-black"
            onClick={this.handleTogglePanel.bind(this)}
            title="toggle panel"
          >
            <i className="text-bold icon icon-arrow-alt-from-right" />
          </button>
        )}
        <MapComponent
          handleMapMoved={store.mapMoved.bind(store)}
          center={store.center}
          zoom={store.zoom}
          active={store.active}
        />
        {store.panel && (
          <PanelComponent
            filters={store.filters}
            activateFilter={store.activateFilter.bind(store)}
            openWelcome={store.openWelcome.bind(store)}
          />
        )}
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
