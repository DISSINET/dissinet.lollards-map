import "jest";
import * as React from "react";
import * as ReactDOM from "react-dom";

import { mount, shallow, render } from "enzyme";

import MapComponent from "./../../app/components/map";

describe("Map component", () => {
  beforeEach(async () => {});

  afterEach(async () => {});

  const mapMove = e => {};

  test("map component should load", async () => {
    const component = shallow(
      <MapComponent center={[10, 10]} zoom={7} handleMapMoved={mapMove} />
    );
    expect(component).toMatchSnapshot();
  });

  test("map component should have right center value", async () => {
    const component = shallow(
      <MapComponent center={[10, 10]} zoom={7} handleMapMoved={mapMove} />
    );
    const centerProp = component.find("Map").prop("center");
    expect(centerProp).toStrictEqual([10, 10]);
  });
});
