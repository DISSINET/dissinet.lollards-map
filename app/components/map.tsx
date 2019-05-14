import React from "react";
import L from "leaflet";
import * as d3 from "d3";

import {
  Map,
  Marker,
  TileLayer,
  LayersControl,
  LayerGroup
} from "react-leaflet";

import "leaflet.markercluster";
import "leaflet.markercluster.placementstrategies";

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
        maxClusterRadius: 70,
        firstCircleElements: 6,
        clockHelpingCircleOptions: {
          weight: 0.7,
          opacity: 1,
          color: "black",
          fillOpacity: 0,
          dashArray: "10 5",
          transform: "translateY(-10px)"
        },
        spiderfyDistanceSurplus: 35,
        zoomToBoundsOnClick: true,
        removeOutsideVisibleBounds: true,
        elementsPlacementStrategy: "clock-concentric",
        iconCreateFunction: this.clusterMarkerIcon.bind(this),
        animate: false,
        singleMarkerMode: true,
        spiderLegPolylineOptions: { weight: 0 }
      });
      this.clusters.addTo(this.mapEl);
      this.loadClusters();
    }
  }

  componentDidUpdate() {
    this.loadClusters();
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
        data: feature.properties
      }).bindPopup("<p>" + "</p>");
    });
  }

  clusterMarkerIcon(cluster) {
    const markers = cluster.getAllChildMarkers();
    const single = markers.length === 1;

    const revolt1No = markers.filter(m => m.options.data.revolt1414 === "1")
      .length;
    const revolt2No = markers.filter(m => m.options.data.revolt1431 === "1")
      .length;
    const booksNo = markers.filter(m => m.options.data.books === "1").length;

    const svgEl = document.createElement("svg");
    svgEl.setAttribute("id", "marker " + cluster._leaflet_id);

    const dFire1 =
      "m 2.9990256,270.82817 c 1.0690017,1.51304 0.2844093,2.84512 -1.1792074,5.0188 -1.46721995,2.17903 -3.1687443,7.25758 2.3157712,7.1604 7.1179906,-0.12612 6.6972696,-7.23466 -1.1365638,-12.1792 z";
    const dFire2 =
      "m 23.515284,270.81949 c -1.086021,1.51304 -0.288938,2.84512 1.19798,5.0188 1.490579,2.17903 3.219193,7.25758 -2.352639,7.1604 -7.231312,-0.12612 -6.803893,-7.23466 1.154659,-12.1792 z";
    const dBook =
      "m 26.058778,286.50967 -6.715147,2.10475 -5.34539,-1.16931 -0.133635,8.08491 5.846521,1.06907 6.381059,-1.9377 z";

    const svg = d3
      .select(svgEl)
      .attr("class", "cluster")
      .attr("width", svgSizeX)
      .attr("height", svgSizeY);

    const strokeWidth = 0.7;

    const gSymbols = svg
      .append("g")
      .style("stroke", "black")
      .attr("class", "cluster-symbols")
      .attr("transform", "translate(5 -540) scale(2 2)");

    const gText = svg
      .append("g")
      .attr("class", "cluster-texts")
      .attr("font-size", "10")
      .style("text-anchor", "middle")
      .attr("transform", "translate(25 35)");

    gSymbols
      .append("circle")
      .attr("class", "total")
      .attr("cx", "10")
      .attr("cy", "287")
      .attr("r", 8);

    if (markers.length > 1) {
      gText
        .append("text")
        .text(markers.length)
        .attr("class", "total")
        .attr("font-size", "17")
        .attr("transform", "translate(-1 5)");
    }

    if (revolt1No) {
      gSymbols
        .append("path")
        .attr("class", "revolt1")
        .attr("d", dFire1);
      if (revolt1No > 1) {
        gText
          .append("text")
          .text(revolt1No)
          .attr("class", "revolt1")
          .attr("transform", "translate(-10 -13)");
      }
    }

    if (revolt2No) {
      gSymbols
        .append("path")
        .attr("d", dFire2)
        .attr("class", "revolt2")
        .attr("transform", "translate(-7 0)");
      if (revolt2No > 1) {
        gText
          .append("text")
          .text(revolt2No)
          .attr("class", "revolt2")
          .attr("transform", "translate(10 -13)");
      }
    }

    if (booksNo) {
      gSymbols
        .append("path")
        .attr("d", dBook)
        .attr("class", "book")
        .attr("transform", "translate(-10 5)");
      if (booksNo > 1) {
        gText
          .append("text")
          .text(booksNo)
          .attr("class", "book")
          .attr("class", "cluster-text")
          .attr("transform", "translate(0 23)");
      }
    }

    /*
      <ellipse
      id="path8"
      cx="12.260988"
      cy="285.65778"
      rx="10.34879"
      ry="9.8977718"
      style="fill:none;stroke:#000000;stroke-width:0.79375;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1" />
   <path
      style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.79374999;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
      d="m 26.058778,286.50967 -6.715147,2.10475 -5.34539,-1.16931 -0.133635,8.08491 5.846521,1.06907 6.381059,-1.9377 z"
      id="path4548"
      inkscape:connector-curvature="0" />
   <path
      style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.79374999;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
      d="m 2.9990256,270.82817 c 1.0690017,1.51304 0.2844093,2.84512 -1.1792074,5.0188 -1.46721995,2.17903 -3.1687443,7.25758 2.3157712,7.1604 7.1179906,-0.12612 6.6972696,-7.23466 -1.1365638,-12.1792 z"
      id="path3715-3-7"
      inkscape:connector-curvature="0"
      sodipodi:nodetypes="cssc" />
   <path
      style="opacity:1;fill:#ffffff;fill-opacity:1;stroke:#000000;stroke-width:0.79374999;stroke-linecap:square;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1;paint-order:fill markers stroke"
      d="m 19.870467,270.88631 c 1.069002,1.51304 0.28441,2.84512 -1.179207,5.0188 -1.46722,2.17903 -3.168745,7.25758 2.315771,7.1604 7.11799,-0.12612 6.697269,-7.23466 -1.136564,-12.1792 z"
      id="path3715-3-7-5"
      inkscape:connector-curvature="0"
      sodipodi:nodetypes="cssc" />
      */

    return L.divIcon({
      html: svgEl.outerHTML,
      className: "marker-icon " + (single ? "marker-single" : "marker-cluster"),
      iconSize: L.point(radius * 2, radius * 2)
    });
  }

  handleMapMove(e) {
    if (this.mapEl) {
      this.props.handleMapMoved(e.center, e.zoom, this.mapEl.getBounds());
    }
  }

  render() {
    const icon = L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      iconSize: [25, 40],
      iconAnchor: [12, 40]
    });
    console.log(this.props);

    return (
      <div className="map" data-testid="map-wrapper">
        <Map
          center={this.props.center}
          zoom={this.props.zoom}
          maxZoom={16}
          ref={this.mapRef}
          onViewportChanged={this.handleMapMove.bind(this)}
        >
          <LayersControl position="topright">
            <LayersControl.BaseLayer
              name="OpenStreetMap.BlackAndWhite"
              checked={true}
            >
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
            <LayersControl.BaseLayer name="OpenStreetMap.Mapnik">
              <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            </LayersControl.BaseLayer>
          </LayersControl>
        </Map>
      </div>
    );
  }
}
