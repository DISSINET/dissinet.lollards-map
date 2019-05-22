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
      <div className="welcome" data-testid="welcome-wrapper">
        <div className="content ">
          <Hero />
          <button
            className="text-base text-black text-2xl absolute pin-t pin-r"
            onClick={this.handleClose.bind(this)}
          >
            x
          </button>
          <div className="px-6 py-4">
            <p className="paragraph">
              This interactive map is based on the{" "}
              <strong>Lollard trials</strong>. It shows the places of origin of
              English dissidents under investigation for taking part in the
              revolts of 1414 or 1431, related to Lollardy, or holding various
              heretical opinions that are commonly referred to as Lollard, with
              overlaps between these two criteria. In addition, it shows in
              which of these places the presence of unauthorised English
              religious books was uncovered.
            </p>
            <p className="paragraph indent">
              A total of <strong>260</strong> sites were transferred from the
              Atlas zur Kirchengeschichte by Jedin et al. (data compiled by M.
              Lambert based on the trial records analysis research of J. A. F.
              Thomson and J. Fines). The map shows all sites from Jedin et al.,
              including those mentioned in the text only, but excluding three
              sites which could not be localised with enough certainty. The
              sites inform about the presence of Lollards only, not their
              numbers or importance.
            </p>
            <p className="paragraph indent">
              The period covered ranges from <strong>1414</strong> until{" "}
              <strong>1522</strong>. After this date, it becomes hard to
              distinguish between Lollardy and the various forms of Reformation
              brought from the mainland. The map considers only the cases
              brought to trial that are covered in extant records and should
              not, of course, be considered a “complete” map of Lollardy.
            </p>
            <p className="paragraph indent">
              The map can be filtered using these variables: participation in
              the <strong>Oldcastle Revolt of 1414</strong>, involvement in the
              smaller <strong>Lollard insurrection of 1431</strong> originating
              in London, and unauthorised use of{" "}
              <strong>English religious books</strong>. Unlike Lambert, we do
              not draw a clear line between Lollard and other participation in
              the revolts on the map, but this distinction is preserved in the
              dataset.
            </p>
            <p className="paragraph indent">
              The info box under each point on the map displays the place name
              and lists all the years to which evidence concerning heresy or
              participation in revolts relates. The list also includes years
              which do not appear in the sourceJedin et al.’s map and are only
              mentioned in the accompanying text.
            </p>
            <p className="my-2">
              <i className="mx-2 icon icon-book" />
              Data sources:{" "}
              <a href="https://www.zotero.org/groups/446972/david_zbiral_bibliography/items/itemKey/4Z4PVWYH/">
                Jedin et al., 1970
              </a>
              ;{" "}
              <a href="https://www.zotero.org/groups/446972/david_zbiral_bibliography/items/itemKey/6IPZEDBP/">
                Thomson, 1970
              </a>
              ;
              <a href="https://www.zotero.org/groups/446972/david_zbiral_bibliography/items/itemKey/YUYEVYKT/">
                Fines, 1964.
              </a>
            </p>
            <p className="my-2">
              <i className="mx-2 icon icon-layer-group" />
              Digitized and geocoded by Jan Král.
            </p>
            <p className="my-2">
              <i className="mx-2 icon icon-drafting-compass" />
              Map by Adam Mertel.
            </p>
            <p className="paragraph">
              <i>
                The digitization of this map is a part of the{" "}
                <a target="_blank" href="www.dissinet.cz">
                  Dissident Networks Project (DISSINET)
                </a>
                . The project received funding from the Czech Science Foundation
                (project No. GX19-26975X “Dissident Religious Cultures in
                Medieval Europe from the Perspective of Social Network Analysis
                and Geographic Information Systems”). We gratefully acknowledge
                this financial support.
              </i>
            </p>
          </div>
          <div className="footer w-100 bg-grey h-12 align-middle text-right p-4">
            MUNI
          </div>
        </div>
        <div className="background" onClick={this.handleClose.bind(this)} />
      </div>
    );
  }
}
