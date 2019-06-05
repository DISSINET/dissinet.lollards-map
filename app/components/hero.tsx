import * as React from "react";
import { propTypes } from "mobx-react";

import Hero from "./hero";

type Props = {};

export default class WelcomeComponent extends React.Component<Props> {
  props;

  constructor(props) {
    super(props);
  }

  handleClose() {
    console.log("closing");
    this.props.handleClose();
  }

  render() {
    return (
      <div
        className="hero font-bold text-xl pt-12 pb-4 px-4 text-white bg-cover"
        data-testid="welcome-wrapper"
        style={{
          background: " cover",
          backgroundImage: `url(
            "https://cdn.muni.cz/media/3132847/out_gradient.png?mode=crop&center=0.54,0.86&rnd=131981761180000000&width=974&heightratio=0.23715"
          )`
        }}
      >
        <h2 className="heading text-white font-bold">Lollards, 1414–1522</h2>
        <h4 className="subheading text-white font-medium">
          Places of origin of Lollards, unauthorized book owners, and
          participants in revolts related to Lollardy based on their trials
        </h4>
      </div>
    );
  }
}
