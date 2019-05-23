import React from "react";
import L from "leaflet";
import * as d3 from "d3";

import {
  Map,
  Marker,
  TileLayer,
  LayersControl,
  LayerGroup,
  ScaleControl
} from "react-leaflet";

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
        maxClusterRadius: 50,
        zoomToBoundsOnClick: true,
        removeOutsideVisibleBounds: true,
        iconCreateFunction: this.clusterMarkerIcon.bind(this),
        animate: false,
        singleMarkerMode: true
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

    const revolt1No = markers.filter(m => m.options.data.revolt1414 === "1")
      .length;
    const revolt2No = markers.filter(m => m.options.data.revolt1431 === "1")
      .length;
    const booksNo = markers.filter(m => m.options.data.books === "1").length;

    const svgEl = document.createElement("svg");
    svgEl.setAttribute("id", "marker " + cluster._leaflet_id);

    const dFire =
      "m 10.859695,296.52825 c 0,0 -8.9449934,-0.43314 -9.0537544,-6.94902 -0.1086139,-6.50707 7.3176902,-11.6259 9.2542064,-18.57522 1.569022,10.55683 12.932719,11.69244 12.695304,18.90932 -0.101322,5.67974 -10.156242,6.64833 -10.156242,6.64833 0,0 6.013563,-1.43657 5.679477,-4.87767 0.03341,-2.93997 -2.639287,-3.67496 -4.109269,-6.14721 -0.777706,2.01011 -2.037931,3.14042 -2.80633,3.17383 -0.7684,0.0334 -1.610499,-2.60816 -2.8731476,-5.67947 -0.627883,4.11156 -3.2190346,5.71501 -3.3408692,8.15171 -0.2004518,4.00905 4.7106248,5.3454 4.7106248,5.3454 z";
    const dBook = `
    <g
      style="fill:#000000;fill-opacity:1;stroke:#000000;stroke-width:0.67237687;stroke-linecap:butt;stroke-linejoin:round;stroke-miterlimit:4;stroke-dasharray:none;stroke-opacity:1"
      transform="translate(0,-160) scale(0.6 0.6)">
     <path
        style="fill:none;stroke:#000000"
        d="m 24.114374,290.37551 -16.2169117,0.006 0.08977,3.05488 15.9959607,-0.0873"
        id="path870-2" />
     <path
        style="fill:#000000;stroke:#000000"
        d="m 7.7984524,293.43039 -5.3810214,-15.49195 -0.053384,-2.94076 5.3445284,15.37783 0.08977,3.05488"
        />
     <path
        style="fill:#000000;stroke:#000000"
        d="m 2.3640894,274.99768 15.8123126,0.01 6.109986,15.36475 H 7.7086074 Z"
         />
     <path
        style="fill:#ffffff;stroke:none"
        d="m 19.333204,276.87518 -6.289154,0.0242 0.942515,2.12141 6.266267,-0.011 z"
         />
     <path
        style="fill:#ffffff;stroke:none"
        d="m 22.662633,285.30666 -6.461403,0.0421 0.959766,2.10418 6.421339,-0.011 z"
    />
     <path
        style="fill:none;stroke:#ffffff"
        d="m 3.9152936,276.58523 4.2905132,12.23799"
  />
   </g>`;

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
      .attr(
        "transform",
        "translate(" + svgSizeX / 2 + " " + svgSizeY / 2 + ") "
      );

    const gText = svg
      .append("g")
      .attr("class", "cluster-texts")
      .attr("font-size", "10")
      .style("text-anchor", "middle")
      .attr("transform", "translate(25 35)");

    if (markers.length > 1) {
      const r = 16;
      gSymbols
        .append("circle")
        .attr("class", "total")
        .style("stroke", "white")
        .style("stroke-width", "2")
        .attr("x", svgSizeX / 2)
        .attr("y", svgSizeY / 2)
        .attr("r", r);
      /*
        gText
        .append("text")
        .text(markers.length)
        .attr("class", "total")
        .attr("font-size", "17")
        .attr("transform", "translate(-1 5)");
        */
    } else {
      const r = 10;
      gSymbols
        .append("circle")
        .style("stroke", "white")
        .style("stroke-width", "2")
        .attr("class", "total")
        .attr("x", svgSizeX / 2)
        .attr("y", svgSizeY / 2)
        .attr("r", r);
    }

    const revoltY = -12;
    if (revolt1No) {
      gSymbols
        .append("circle")
        .attr("class", "total")
        .attr("x", svgSizeX / 2)
        .style("fill", "white")
        .attr("y", svgSizeY / 2)
        .attr("transform", "translate(-8 " + revoltY + ")")
        .attr("r", 8);
      gSymbols
        .append("path")
        .attr("class", "revolt1")
        .attr("d", dFire)
        .attr(
          "transform",
          "scale(0.5 0.5) translate(-28 " + (revoltY - 296) + ")"
        );
    }

    if (revolt2No) {
      gSymbols
        .append("circle")
        .attr("class", "total")
        .attr("x", svgSizeX / 2)
        .style("fill", "white")
        .attr("y", svgSizeY / 2)
        .attr("transform", "translate(8 " + revoltY + ")")
        .attr("r", 8);
      gSymbols
        .append("path")
        .attr("d", dFire)
        .attr("class", "revolt2")
        .attr(
          "transform",
          "scale(0.5 0.5) translate(5 " + (revoltY - 296) + ")"
        );
    }

    if (booksNo) {
      gSymbols
        .append("circle")
        .attr("class", "total")
        .attr("x", svgSizeX / 2)
        .style("fill", "white")
        .attr("y", svgSizeY / 2)
        .attr("transform", "translate(8 10)")
        .attr("r", 10);

      gSymbols.append(() => {
        var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
        g.innerHTML = dBook;
        return g;
      });
    }

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
    L.icon({
      iconUrl: "https://unpkg.com/leaflet@1.5.1/dist/images/marker-icon.png",
      iconSize: [25, 40],
      iconAnchor: [12, 40]
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
