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
            className="m-0 panel-hider on text-base muni bg-muni right-96"
            onClick={this.handleTogglePanel.bind(this)}
            title="toggle panel"
          >
            <i className="text-bold icon icon-arrow-alt-from-left" />
          </button>
        ) : (
          <button
            className=" m-0 panel-hider off text-base muni bg-muni right-0"
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
          <div>
            <PanelComponent
              filters={store.filters}
              activateFilter={store.activateFilter.bind(store)}
              openWelcome={store.openWelcome.bind(store)}
            />
            <div className="panel-footer absolute right-0 bottom-0 w-100 bg-slate-300 m-0 z-20">
              <div className="text-right">
                <a target="_blank" href="https://dissinet.cz" className="float-right">
                  <svg
                    className="pin-r"
                    width="178"
                    height="68"
                    viewBox="0 0 178 68"
                    fill="black"
                    transform="scale(0.5 0.5)"
                  >
                    <path d="M-0.06,3l0,26.6l4.14,0l0,-26.6zm4.29,0l2.59,26.6l1.4,0l-2.58,-26.6zm6.73,0l-2.58,26.6l1.4,0l2.59,-26.6zm1.56,0l0,26.6l4.18,0l0,-26.6zm15.69,0l0,20.48c0,3.57,3.23,6.35,6.69,6.35c3.46,0,6.69,-2.78,6.69,-6.35l0,-20.48l-4.18,0l0,20.33c0,1.44,-1.29,2.47,-2.51,2.47c-1.22,0,-2.51,-1.03,-2.51,-2.47l0,-20.33zm26.26,0l0,26.6l4.18,0l0,-26.6zm4.33,0l3.95,26.6l1.45,0l-3.95,-26.6zm5.55,0l0,26.6l4.18,0l0,-26.6zm18.05,25.12l0,1.48l11.36,0l0,-1.48l-3.61,0l0,-23.64l3.61,0l0,-1.48l-11.36,0l0,1.48l3.57,0l0,23.64z" />
                    <path d="M6.21,41.5l-5.74,26.6l2.13,0l1.79,-8.4l7.75,0l1.82,8.4l2.13,0l-5.66,-26.6l-2.05,0l3.42,16.3l-7.07,0l3.49,-16.3zm22.72,0l0,26.6l2.06,0l0,-11.25l3.45,0l6.31,11.25l2.36,0l-6.5,-11.48c3.12,-0.26,5.59,-2.88,5.59,-6.11l0,-2.66c0,-3.46,-2.89,-6.35,-6.35,-6.35zm6.73,13.41l-4.67,0l0,-11.51l4.67,0c2.43,0,4.52,1.98,4.52,4.48l0,2.4c0,2.73,-1.97,4.63,-4.52,4.63zm24.81,-11.51l0,24.7l2.06,0l0,-24.7l7.1,0l0,-1.9l-16.26,0l0,1.9zm27.63,24.93c3.65,0,6.57,-2.59,6.57,-6.35l0,-1.63c0,-4.33,-3.64,-5.82,-6.15,-6.39c-2.32,-0.53,-4.94,-1.4,-4.94,-4.52l0,-1.78c0,-2.47,2.13,-4.41,4.52,-4.41c2.36,0,4.52,1.94,4.52,4.41l0,0.95l2.05,0l0,-0.99c0,-3.65,-2.92,-6.35,-6.57,-6.35c-3.65,0,-6.57,2.7,-6.57,6.35l0,1.82c0,4.45,3.76,5.85,6.08,6.39c2.43,0.53,5.01,1.4,5.01,4.56l0,1.55c0,2.47,-2.13,4.41,-4.48,4.41c-2.4,0,-4.56,-1.94,-4.56,-4.41l0,-0.87l-2.05,0l0,0.91c0,3.76,2.92,6.35,6.57,6.35z" />
                    <path d="M111.23,3.01l0,10.68l3.55,0c3.63,0,5.67,-1.92,5.67,-5.34c0,-3.42,-2.04,-5.34,-5.67,-5.34zm2.19,1.89l1.33,0c2.3,0,3.42,1.14,3.42,3.45c0,2.31,-1.12,3.45,-3.42,3.45l-1.33,0zm10.71,-0.09l0,-1.8l-2.1,0l0,1.8zm0,8.88l0,-7.62l-2.1,0l0,7.62zm4.87,-7.86c-1.88,0,-3.14,0.97,-3.14,2.34c0,1.77,1.36,2.07,2.64,2.4c1.18,0.31,1.75,0.45,1.75,1.11c0,0.45,-0.37,0.73,-1.11,0.73c-0.87,0,-1.33,-0.43,-1.33,-1.2l-2.13,0c0,1.85,1.3,2.72,3.41,2.72c2.07,0,3.37,-0.96,3.37,-2.39c0,-1.86,-1.5,-2.2,-2.87,-2.56c-1.15,-0.3,-1.63,-0.44,-1.63,-0.98c0,-0.43,0.35,-0.7,1.03,-0.7c0.75,0,1.2,0.33,1.2,1.11l2.01,0c0,-1.7,-1.2,-2.58,-3.2,-2.58zm7.86,0c-1.89,0,-3.14,0.97,-3.14,2.34c0,1.77,1.36,2.07,2.63,2.4c1.19,0.31,1.76,0.45,1.76,1.11c0,0.45,-0.38,0.73,-1.11,0.73c-0.87,0,-1.34,-0.43,-1.34,-1.2l-2.13,0c0,1.85,1.31,2.72,3.42,2.72c2.07,0,3.36,-0.96,3.36,-2.39c0,-1.86,-1.5,-2.2,-2.86,-2.56c-1.16,-0.3,-1.64,-0.44,-1.64,-0.98c0,-0.43,0.36,-0.7,1.04,-0.7c0.75,0,1.2,0.33,1.2,1.11l2.01,0c0,-1.7,-1.2,-2.58,-3.2,-2.58zm7.13,-1.02l0,-1.8l-2.1,0l0,1.8zm0,8.88l0,-7.62l-2.1,0l0,7.62zm8.97,0l0,-10.68l-2.1,0l0,3.97l-0.03,0c-0.47,-0.72,-1.29,-1.11,-2.16,-1.11c-1.91,0,-3.14,1.58,-3.14,4.01c0,2.43,1.25,4,3.17,4c0.88,0,1.72,-0.42,2.19,-1.2l0.03,0l0,1.01zm-3.58,-6.21c0.94,0,1.59,0.88,1.59,2.4c0,1.51,-0.65,2.4,-1.59,2.4c-1.01,0,-1.66,-0.95,-1.66,-2.4c0,-1.46,0.65,-2.4,1.66,-2.4zm8.92,4.96c-0.9,0,-1.67,-0.55,-1.73,-2.13l5.48,0c0,-0.84,-0.08,-1.42,-0.24,-1.95c-0.48,-1.54,-1.77,-2.53,-3.53,-2.53c-2.38,0,-3.78,1.74,-3.78,3.99c0,2.43,1.4,4.11,3.8,4.11c2.02,0,3.34,-1.16,3.64,-2.55l-2.14,0c-0.11,0.61,-0.66,1.06,-1.5,1.06zm-0.02,-5.13c0.85,0,1.53,0.53,1.67,1.68l-3.33,0c0.16,-1.15,0.81,-1.68,1.66,-1.68zm9.54,-1.42c-0.97,0,-1.74,0.46,-2.23,1.14l-0.03,0l0,-0.96l-1.97,0l0,7.62l2.1,0l0,-4.08c0,-1.38,0.63,-2.07,1.5,-2.07c0.83,0,1.34,0.52,1.34,1.68l0,4.47l2.1,0l0,-4.68c0,-2.07,-1.1,-3.12,-2.81,-3.12zm8.1,6.22c-0.72,0,-0.99,-0.33,-0.99,-1.17l0,-3.31l1.46,0l0,-1.56l-1.46,0l0,-1.98l-2.1,0l0,1.98l-1.23,0l0,1.56l1.23,0l0,3.69c0,1.77,0.77,2.47,2.52,2.47c0.36,0,0.83,-0.06,1.11,-0.15l0,-1.6c-0.13,0.04,-0.34,0.07,-0.54,0.07z" />
                    <path d="M120.41,31.69l0,-10.68l-2.11,0l0,4.11c0,1.54,0.04,3.09,0.11,4.63l-0.02,0c-0.61,-1.48,-1.28,-2.98,-1.95,-4.41l-2.08,-4.33l-3.13,0l0,10.68l2.11,0l0,-4.11c0,-1.55,-0.04,-3.09,-0.12,-4.63l0.03,0c0.61,1.48,1.28,2.98,1.95,4.4l2.08,4.34zm5.55,-1.25c-0.9,0,-1.66,-0.55,-1.73,-2.13l5.48,0c0,-0.84,-0.08,-1.42,-0.24,-1.95c-0.48,-1.54,-1.77,-2.53,-3.53,-2.53c-2.38,0,-3.77,1.74,-3.77,3.99c0,2.43,1.39,4.11,3.79,4.11c2.02,0,3.35,-1.16,3.64,-2.55l-2.14,0c-0.1,0.61,-0.66,1.06,-1.5,1.06zm-0.02,-5.13c0.84,0,1.53,0.53,1.67,1.68l-3.33,0c0.16,-1.15,0.81,-1.68,1.66,-1.68zm8.68,4.8c-0.72,0,-0.99,-0.33,-0.99,-1.17l0,-3.31l1.45,0l0,-1.56l-1.45,0l0,-1.98l-2.1,0l0,1.98l-1.23,0l0,1.56l1.23,0l0,3.69c0,1.77,0.76,2.47,2.52,2.47c0.36,0,0.82,-0.06,1.11,-0.15l0,-1.6c-0.14,0.04,-0.35,0.07,-0.54,0.07zm11.46,1.58l1.67,-7.62l-2.08,0l-0.57,2.94c-0.21,1.09,-0.41,2.22,-0.55,3.31l-0.03,0c-0.18,-1.09,-0.39,-2.17,-0.65,-3.28l-0.68,-2.97l-2.88,0l-0.67,2.97c-0.25,1.11,-0.46,2.19,-0.64,3.28l-0.03,0c-0.16,-1.09,-0.35,-2.22,-0.56,-3.31l-0.57,-2.94l-2.09,0l1.69,7.62l3,0l0.67,-3c0.24,-1.06,0.45,-2.16,0.63,-3.26l0.03,0c0.18,1.1,0.39,2.2,0.63,3.26l0.68,3zm6.09,-7.86c-2.39,0,-3.9,1.57,-3.9,4.05c0,2.47,1.51,4.05,3.9,4.05c2.38,0,3.89,-1.58,3.89,-4.05c0,-2.48,-1.51,-4.05,-3.89,-4.05zm0,1.62c1.03,0,1.69,0.94,1.69,2.43c0,1.48,-0.66,2.43,-1.69,2.43c-1.04,0,-1.7,-0.95,-1.7,-2.43c0,-1.49,0.66,-2.43,1.7,-2.43zm9.49,-1.5c-0.9,0,-1.57,0.37,-2.08,1.2l-0.03,0l0,-1.08l-1.94,0l0,7.62l2.1,0l0,-3.6c0,-1.5,0.69,-2.31,1.98,-2.31c0.21,0,0.42,0.03,0.66,0.07l0,-1.81c-0.21,-0.06,-0.48,-0.09,-0.69,-0.09zm9.1,7.74l-3.2,-4.11l2.89,-3.51l-2.37,0l-2.46,3.07l-0.03,0l0,-6.13l-2.1,0l0,10.68l2.1,0l0,-3.57l0.03,0l2.55,3.57zm3.33,-7.86c-1.88,0,-3.14,0.97,-3.14,2.34c0,1.77,1.36,2.07,2.64,2.4c1.18,0.31,1.75,0.45,1.75,1.11c0,0.45,-0.37,0.73,-1.11,0.73c-0.87,0,-1.33,-0.43,-1.33,-1.2l-2.13,0c0,1.85,1.3,2.72,3.42,2.72c2.06,0,3.36,-0.96,3.36,-2.39c0,-1.86,-1.5,-2.2,-2.87,-2.56c-1.15,-0.3,-1.63,-0.44,-1.63,-0.98c0,-0.43,0.36,-0.7,1.03,-0.7c0.75,0,1.2,0.33,1.2,1.11l2.01,0c0,-1.7,-1.2,-2.58,-3.2,-2.58z" />
                    <path d="M111.23,39.01l0,10.68l2.21,0l0,-3.78l1.83,0c2.59,0,3.91,-1.38,3.91,-3.45c0,-2.07,-1.32,-3.45,-3.91,-3.45zm2.21,1.83l1.53,0c1.39,0,1.96,0.61,1.96,1.62c0,1,-0.57,1.62,-1.96,1.62l-1.53,0zm11.17,1.11c-0.9,0,-1.58,0.37,-2.09,1.2l-0.03,0l0,-1.08l-1.93,0l0,7.62l2.1,0l0,-3.6c0,-1.5,0.69,-2.31,1.98,-2.31c0.21,0,0.42,0.03,0.66,0.07l0,-1.81c-0.21,-0.06,-0.48,-0.09,-0.69,-0.09zm5.05,-0.12c-2.38,0,-3.9,1.58,-3.9,4.05c0,2.47,1.52,4.05,3.9,4.05c2.39,0,3.9,-1.58,3.9,-4.05c0,-2.47,-1.51,-4.05,-3.9,-4.05zm0,1.62c1.04,0,1.7,0.94,1.7,2.43c0,1.48,-0.66,2.43,-1.7,2.43c-1.03,0,-1.69,-0.95,-1.69,-2.43c0,-1.49,0.66,-2.43,1.69,-2.43zm7.58,-2.64l0,-1.8l-2.1,0l0,1.8zm0,1.26l-2.1,0l0,7.47c0,1.09,-0.39,1.41,-1.13,1.41c-0.15,0,-0.28,-0.02,-0.4,-0.04l0,1.51c0.3,0.07,0.64,0.12,1.03,0.12c1.52,0,2.6,-0.77,2.6,-2.69zm5.34,6.38c-0.9,0,-1.67,-0.56,-1.73,-2.14l5.48,0c0,-0.84,-0.08,-1.42,-0.24,-1.95c-0.48,-1.54,-1.77,-2.53,-3.53,-2.53c-2.38,0,-3.78,1.74,-3.78,3.99c0,2.43,1.4,4.11,3.8,4.11c2.02,0,3.34,-1.16,3.64,-2.55l-2.14,0c-0.11,0.61,-0.66,1.07,-1.5,1.07zm-0.02,-5.14c0.84,0,1.53,0.53,1.67,1.68l-3.33,0c0.16,-1.15,0.81,-1.68,1.66,-1.68zm8.81,-1.48c-2.33,0,-3.84,1.59,-3.84,4.05c0,2.46,1.51,4.05,3.84,4.05c2.05,0,3.43,-1.29,3.6,-3.23l-2.21,0c-0.06,1,-0.6,1.61,-1.41,1.61c-1.02,0,-1.63,-0.93,-1.63,-2.43c0,-1.5,0.61,-2.43,1.63,-2.43c0.81,0,1.35,0.55,1.43,1.46l2.19,0c-0.17,-1.79,-1.55,-3.08,-3.6,-3.08zm8.5,6.28c-0.72,0,-0.99,-0.33,-0.99,-1.16l0,-3.32l1.46,0l0,-1.56l-1.46,0l0,-1.98l-2.1,0l0,1.98l-1.23,0l0,1.56l1.23,0l0,3.69c0,1.77,0.77,2.47,2.52,2.47c0.36,0,0.83,-0.06,1.11,-0.15l0,-1.6c-0.13,0.05,-0.34,0.07,-0.54,0.07z" />
                    <desc>Dissident Networks Project</desc>
                  </svg>
                </a>
              </div>
            </div>
          </div>
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
