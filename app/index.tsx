import "./styles.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import Store from "./store";

import data from "./../data/data.json";

const { version } = require('./../package.json');

window["store"] = new Store(data);
window["version"] = version;

ReactDOM.render(
  React.createElement(App, { store: window["store"] }),
  document.getElementById("app")
);
