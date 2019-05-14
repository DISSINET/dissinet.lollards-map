import * as React from "react";

type Props = {};

export default class PanelComponent extends React.Component<Props> {
  props;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="panel" data-testid="panel-wrapper">
        <h1 className="heading text-muni">Map</h1>

        <button className="primary">primary button</button>
        <button className="secondary">secondary button</button>
        <button className="danger">danger button</button>
        <button className="success">success button</button>
      </div>
    );
  }
}
