import { keys, toJS, observable, action, computed } from "mobx";

export default class AppStore {
  _center;
  _zoom;
  _extent;
  _filters;
  data;

  defaultFilters = {
    revolts: [
      {
        id: "all",
        label: "no filter",
        fn: p => true,
        active: true
      },
      {
        id: "1414",
        label: "only 1414 revolt",
        fn: p => p.properties.revolt1414 === "1",
        active: false
      },
      {
        id: "1431",
        label: "only 1431 revolt",
        fn: p => p.properties.revolt1431 === "1",
        active: false
      },
      {
        id: "or",
        label: "at least one revolt",
        fn: p => p =>
          p.properties.revolt1414 === "1" || p.properties.revolt1431 === "1",
        active: false
      },
      {
        id: "both",
        label: "both revolts",
        fn: p => p =>
          p.properties.revolt1414 === "1" && p.properties.revolt1431 === "1",
        active: false
      },
      {
        id: "no",
        label: "no revolt",
        fn: p => p =>
          p.properties.revolt1414 !== "1" && p.properties.revolt1431 !== "1",
        active: false
      }
    ],
    books: [
      {
        id: "true",
        label: "with books",
        fn: p => p => p.properties.books !== "1",
        active: true
      },
      {
        id: "true",
        label: "without books",
        fn: p => p => p.properties.books !== "0",
        active: false
      },
      {
        id: "all",
        label: "no filter",
        fn: p => p => true,
        active: false
      }
    ]
  };

  constructor(data) {
    this._center = observable.box([52, -1]);
    this._zoom = observable.box(9);
    this._extent = observable.box([]);

    this._filters = observable.map(this.defaultFilters);
    this.data = data;
  }

  @computed
  get filters() {
    return toJS(this._filters);
  }

  @computed
  get center(): Array<Number> {
    return toJS(this._center);
  }

  @computed
  get zoom(): Number {
    return this._zoom.get();
  }

  @computed
  get extent(): Array<number> {
    return toJS(this._extent);
  }

  @computed
  get active(): Array<any> {
    return this.data;
  }

  @action
  mapMoved(
    newCenter: Array<Number>,
    newZoom: Number,
    newExtent: Array<Number>
  ): void {
    this._center.set(newCenter);
    this._zoom.set(newZoom);
    this._extent.set(newExtent);
  }
}
