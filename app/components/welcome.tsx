import * as React from "react";
import { propTypes } from "mobx-react";

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
      <div className="welcome" data-testid="welcome-wrapper">
        <div className="content shadow-lg">
          <div className="px-6 py-4">
            <div className="heading font-bold text-xl mb-2 text-muni">
              Lollards, 1414-1522
            </div>
            <p className="paragraph">
              This interactive map shows the places of origin of English
              dissidents under investigation for taking part in the revolts of
              1414 or 1431, related to Lollardy, or holding various heretical
              opinions that are commonly referred to as Lollard, with overlaps
              between these two criteria. In addition, it shows in which of
              these places the presence of unauthorised English religious books
              was uncovered. A total of 260 sites were transferred from the
              Atlas zur Kirchengeschichte by Jedin et al. (data compiled by
              Malcolm Lambert based on the research of J. A. F. Thomson and J.
              Fines). The map shows all sites from Jedin et al., including those
              mentioned in the text but not included on the map, but excluding
              three sites which could not be localised with enough certainty.
            </p>
            <p className="paragraph indent">
              The period covered ranges from the Oldcastle Revolt in 1414 until
              1522. After this date, it becomes hard to distinguish between
              Lollardy and the various forms of Reformation brought from the
              mainland. The map considers only the cases brought to trial that
              are covered in extant records and should not, of course, be
              considered a “complete” map of Lollardy.
            </p>
            <p className="paragraph indent">
              The map can be filtered using these variables: participation in
              the Oldcastle Revolt of 1414, involvement in the smaller Lollard
              insurrection of 1431 originating in London, and unauthorised use
              of English religious books. Unlike Malcolm Lambert, we do not draw
              a clear line between Lollard and other participation in the
              revolts on the map, but this distinction is preserved in the
              dataset.{" "}
            </p>
            <p className="paragraph indent">
              The info box under individual points on the map displays the place
              name and lists all the years to which evidence concerning heresy
              or participation in revolts relates. The list also includes years
              which do not appear in Jedin et al.’s map and are only mentioned
              in the accompanying text.
            </p>
            <p className="paragraph indent">
              The digitization of this map is a part of the Dissident Networks
              Project (DISSINET). The project received funding from the Czech
              Science Foundation (project No. GX19-26975X “Dissident Religious
              Cultures in Medieval Europe from the Perspective of Social Network
              Analysis and Geographic Information Systems”). We gratefully
              acknowledge this financial support.
            </p>
            <p className="my-2">
              <i className="mx-2 icon icon-book" />
              Data sources: Jedin et al., 1970; Thomson, 1970; Fines, 1964.
            </p>
            <p className="my-2">
              <i className="mx-2 icon icon-layer-group" />
              Digitized and geocoded by Jan Král.
            </p>
            <p className="my-2">
              <i className="mx-2 icon icon-drafting-compass" />
              Map by Adam Mertel.
            </p>
            <button
              className="primary float-right text-base"
              onClick={this.handleClose.bind(this)}
            >
              close
            </button>
          </div>
        </div>
        <div className="background" onClick={this.handleClose.bind(this)} />
      </div>
    );
  }
}