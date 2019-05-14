import { keys, toJS, observable, action, computed } from "mobx";

export default class AppStore {
  _center;
  _zoom;
  _extent;
  _filters;
  data;

  defaultFilters = [
    {
      category: "revolts",
      id: "revolts-all",
      label: "no filter",
      fn: p => true,
      active: true
    },
    {
      category: "revolts",
      id: "revolts-1414",
      label: "only 1414 revolt",
      fn: p => p.properties.revolt1414 === "1",
      active: false
    },
    {
      category: "revolts",
      id: "revolts-1431",
      label: "only 1431 revolt",
      fn: p => p.properties.revolt1431 === "1",
      active: false
    },
    {
      category: "revolts",
      id: "revolts-or",
      label: "at least one revolt",
      fn: p => p =>
        p.properties.revolt1414 === "1" || p.properties.revolt1431 === "1",
      active: false
    },
    {
      category: "revolts",
      id: "revolts-both",
      label: "both revolts",
      fn: p => p =>
        p.properties.revolt1414 === "1" && p.properties.revolt1431 === "1",
      active: false
    },
    {
      category: "revolts",
      id: "revolts-no",
      label: "no revolt",
      fn: p => p =>
        p.properties.revolt1414 !== "1" && p.properties.revolt1431 !== "1",
      active: false
    },
    {
      category: "books",
      id: "books-true",
      label: "with books",
      fn: p => p => p.properties.books !== "1",
      active: true
    },
    {
      category: "books",
      id: "books-false",
      label: "without books",
      fn: p => p => p.properties.books !== "0",
      active: false
    },
    {
      category: "books",
      id: "books-all",
      label: "no filter",
      fn: p => p => true,
      active: false
    }
  ];

  constructor(data) {
    this._center = observable.box([52, -1]);
    this._zoom = observable.box(9);
    this._extent = observable.box([]);

    this._filters = observable.box(this.defaultFilters);
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

  @action activateFilter(filterId) {
    const newFilters = toJS(this.filters);
    const filterToChange = newFilters.find(f => f.id === filterId);

    if (filterToChange) {
      newFilters
        .filter(f => f.category === filterToChange.category)
        .forEach(f => (f.active = false));
      filterToChange.active = true;
    }
    console.log(newFilters);
    console.log(this);

    this._filters.set(newFilters);
  }
}
