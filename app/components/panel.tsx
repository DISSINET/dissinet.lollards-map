import * as React from "react";
import { propTypes } from "mobx-react";
import Hero from "./hero";

type Props = {};

export default class PanelComponent extends React.Component<Props> {
  props;

  constructor(props) {
    super(props);
  }

  toggleCheckbox(e) {
    this.props.activateFilter(e.target.id);
  }

  renderCheckbox(data: { key; value; label; checked; event; style? }) {
    return (
      <div key={data.key} className="md:items-center ">
        <label className="block text-gray-500 font-bold">
          {data.checked ? (
            <i
              id={data.key}
              onClick={data.event.bind(this)}
              className="icon icon-check mr-2 mt-2 text-muni"
            />
          ) : (
            <i
              id={data.key}
              onClick={data.event.bind(this)}
              className="icon icon-circle mr-2 mt-2 text-black"
            />
          )}
          <span
            id={data.key}
            onClick={data.event.bind(this)}
            className="text-sm align-text-top tb-2  font-normal"
          >
            {data.label}
          </span>
        </label>
      </div>
    );
  }

  render() {
    console.log(this.props.filters);
    return (
      <div className="panel" data-testid="panel-wrapper">
        <Hero />
        <br />
        <b>revolts</b>
        {this.props.filters
          .filter(f => f.category === "revolts")
          .map(revoltFilter => {
            return this.renderCheckbox({
              key: revoltFilter.id,
              value: revoltFilter.id,
              label: revoltFilter.label,
              checked: revoltFilter.active,
              event: this.toggleCheckbox
            });
          })}

        <br />
        <b>books</b>
        {this.props.filters
          .filter(f => f.category === "books")
          .map(bookFilter => {
            return this.renderCheckbox({
              key: bookFilter.id,
              value: bookFilter.id,
              label: bookFilter.label,
              checked: bookFilter.active,
              event: this.toggleCheckbox
            });
          })}
        <div className="legend">
          <img src="data:image/gif;base64,R0lGODlhAQABAPcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAEAAP8ALAAAAAABAAEAAAgEAP8FBAA7" />
        </div>
      </div>
    );
  }
}
