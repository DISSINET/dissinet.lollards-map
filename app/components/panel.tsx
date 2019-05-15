import * as React from "react";
import { propTypes } from "mobx-react";

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
      <div className="md:flex md:items-center " key={data.key}>
        <label className="md:w-full block text-gray-500 font-bold">
          <input
            onChange={data.event.bind(this)}
            checked={data.checked}
            value={data.value}
            id={data.key}
            className="mr-2 mt-2 leading-tight"
            type="checkbox"
          />
          <span className="text-sm align-text-top tb-2  font-normal">
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
        <h1 className="heading text-muni">Lollards, 1414-1522</h1>
        <h2 className="subheading text-black font-medium">
          Places of origin of Lollards, unauthorized book owners, and
          participants in revolts related to Lollardy
        </h2>

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
      </div>
    );
  }
}
