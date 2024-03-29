import * as d3 from "d3";
import L from "leaflet";
import React from "react";

import { LayerGroup, Map, ScaleControl, TileLayer } from "react-leaflet";

import "leaflet.markercluster";

type Props = {
  center: Array<Number>;
  zoom: Number;
  handleMapMoved: Function;
};

const radius = 25;
const m = 1.5;
const svgSizeX = 50;
const svgSizeY = 70;

export default class MapComponent extends React.Component<Props> {
  mapRef;
  mapEl;
  props;
  clusters;

  constructor(props) {
    super(props);

    // parcel doesnt want to load d3 without this console.log
    console.log(d3);
    this.mapRef = React.createRef();
    this.mapEl = false;
  }

  componentDidMount() {
    if (this.mapRef && this.mapRef.current) {
      this.mapEl = this.mapRef.current.leafletElement;
      setTimeout(() => {
        this.mapEl.invalidateSize();
      }, 0);

      this.clusters = L.markerClusterGroup({
        showCoverageOnHover: false,
        maxClusterRadius: 80,
        zoomToBoundsOnClick: true,
        removeOutsideVisibleBounds: true,
        iconCreateFunction: this.clusterMarkerIcon.bind(this),
        animate: false,
        singleMarkerMode: true,
      });
      this.clusters.addTo(this.mapEl);
      this.loadClusters();
    }
  }

  componentDidUpdate() {
    this.loadClusters();
    this.mapEl.invalidateSize();
  }

  loadClusters() {
    this.clusters.clearLayers();
    this.clusters.addLayers(this.points());
  }

  points() {
    return this.props.active.map((feature, ri) => {
      return L.marker(feature.geometry.coordinates, {
        fillOpacity: 1,
        weight: 0,
        radius: 10,
        data: feature.properties,
      }).bindPopup(
        "<div>[<i>" +
          feature.properties.id +
          "</i>] <strong>" +
          feature.properties.name +
          "</strong> " +
          feature.properties.yearsall +
          "</div>"
      );
    });
  }

  clusterMarkerIcon(cluster) {
    const markers = cluster.getAllChildMarkers();
    const single = markers.length === 1;

    const revolt1No = markers.filter(
      (m) => m.options.data.revolt1414 === "1"
    ).length;
    const revolt2No = markers.filter(
      (m) => m.options.data.revolt1431 === "1"
    ).length;
    const booksNo = markers.filter((m) => m.options.data.books === "1").length;

    const svgEl = document.createElement("svg");
    svgEl.setAttribute("id", "marker " + cluster._leaflet_id);

    const dFire =
      "m 11,296 c 0,0 -9,-0 -9,-7 -0,-7 7,-12 9,-19 2,11 13,12 13,19 -0,6 -10,7 -10,7 0,0 6,-1 6,-5 0,-3 -3,-4 -4,-6 -1,2 -2,3 -3,3 -1,0 -2,-3 -3,-6 -1,4 -3,6 -3,8 -0,4 5,5 5,5 z";
    const dBook = `
    <g
      style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.6;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
      transform="translate(0,-160) scale(0.6 0.6)">
     <path style="fill:none" d="m 24,290 -16,0 0,3 16,-0" />
     <path d="m 8,294 -5.5,-15.5 -0.05,-3 5.5,15.5 0.1,3" />
     <path d="m 2,275 16,0 6,15 H 8 Z" />
     <path style="fill:#ffffff;stroke:none" d="m 19,277 -6,0 1,2 6,-0.011 z" />
     <path style="fill:#ffffff;stroke:none" d="m 23,285 -6.5,0 1,2 6.5,-0 z" />
     <path style="fill:none;stroke:#ffffff" d="m 4,277 4,12" />
   </g>`;

    const svg = d3
      .select(svgEl)
      .attr("class", "cluster")
      .attr("width", svgSizeX)
      .attr("height", svgSizeY);

    const gSymbols = svg
      .append("g")
      .style("stroke", "black")
      .attr("class", "cluster-symbols")
      .attr(
        "transform",
        "translate(" + svgSizeX / 2 + " " + svgSizeY / 2 + ") "
      );

    // /*
    // const gText = svg
    //   .append("g")
    //   .attr("class", "cluster-texts")
    //   .attr("font-size", "10")
    //   .style("text-anchor", "middle")
    //   .attr("transform", "translate(25 35)");
    //   */

    const r = markers.length > 1 ? 16 : 10;

    gSymbols
      .append("circle")
      .attr("class", "circle circle-main")
      .attr("x", svgSizeX / 2)
      .attr("y", svgSizeY / 2)
      .attr("r", r);

    const revoltY = -12;
    if (revolt1No) {
      gSymbols
        .append("circle")
        .attr("class", "circle circle-revolt revolt-1")
        .attr("x", svgSizeX / 2)
        .attr("y", svgSizeY / 2)
        .attr("transform", "translate(-7 " + revoltY + ")")
        .attr("r", 8);
      gSymbols
        .append("path")
        .attr("class", "path path-revolt revolt-1")
        .attr("d", dFire)
        .attr(
          "transform",
          "scale(0.40 0.40) translate(-30 " + (revoltY - 300) + ")"
        );
    }

    if (revolt2No) {
      gSymbols
        .append("circle")
        .attr("class", "circle circle-revolt revolt-2")
        .attr("x", svgSizeX / 2)
        .attr("y", svgSizeY / 2)
        .attr("transform", "translate(8 " + revoltY + ")")
        .attr("r", 8);
      gSymbols
        .append("path")
        .attr("d", dFire)
        .attr("class", "path path-revolt revolt-2")
        .attr(
          "transform",
          "scale(0.40 0.40) translate(7 " + (revoltY - 300) + ")"
        );
    }

    if (booksNo) {
      gSymbols
        .append("circle")
        .attr("class", "circle circle-book book")
        .attr("x", svgSizeX / 2)
        .attr("y", svgSizeY / 2)
        .attr("transform", "translate(8 10)")
        .attr("r", 10);

      gSymbols
        .append(() => {
          var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
          g.innerHTML = dBook;
          return g;
        })
        .attr("class", "path path-book book");
    }

    return L.divIcon({
      html: svgEl.outerHTML,
      className: "marker-icon " + (single ? "marker-single" : "marker-cluster"),
      iconSize: L.point(radius * 2, radius * 2),
    });
  }

  handleMapMove(e) {
    if (this.mapEl) {
      this.props.handleMapMoved(e.center, e.zoom, this.mapEl.getBounds());
    }
  }

  render() {
    L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      iconSize: [25, 40],
      iconAnchor: [12, 40],
    });

    return (
      <div className="map" data-testid="map-wrapper">
        <Map
          center={this.props.center}
          zoom={this.props.zoom}
          maxZoom={16}
          minZoom={7}
          ref={this.mapRef}
          onViewportChanged={this.handleMapMove.bind(this)}
        >
          <ScaleControl />

          <LayerGroup className="osm">
            <TileLayer
              attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
              url="https://a.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
            />
          </LayerGroup>
        </Map>
      </div>
    );
  }
}
