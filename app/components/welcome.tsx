import * as React from "react";
import { propTypes } from "mobx-react";

type Props = {};

export default class WelcomeComponent extends React.Component<Props> {
  props;

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="welcome" data-testid="welcome-wrapper">
        <div className="content shadow-lg">
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatibus quia, nulla! Maiores et perferendis eaque,
              exercitationem praesentium nihil.
            </p>
            <button className="primary float-right text-base">close</button>
          </div>
        </div>
        <div className="background" />
      </div>
    );
  }
}
