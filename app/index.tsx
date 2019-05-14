import "./styles.css";

import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app";
import Store from "./store";

import data from "./../data/data";
console.log(data);

window["store"] = new Store(data);

ReactDOM.render(
  React.createElement(App, { store: window["store"] }),
  document.getElementById("app")
);
