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

const radius = 15;
const m = 1.5;
const svgSize = (radius + m) * 2;

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
        data: feature
      }).bindPopup("<p>" + "</p>");
    });
  }

  clusterMarkerIcon(cluster) {
    const markers = cluster.getAllChildMarkers();
    const single = markers.length === 1;

    const svgEl = document.createElement("svg");
    svgEl.setAttribute("id", "pie" + cluster._leaflet_id);

    const svg = d3
      .select(svgEl)
      .attr("width", svgSize)
      .attr("height", svgSize)
      .append("g")
      .attr("transform", "translate(" + svgSize / 2 + ", " + svgSize / 2 + ")");

    svg.append("circle").attr("r", radius + m);

    svg
      .append("text")
      .text(markers.length)
      .style("fill", "white")
      .attr("class", "cluster-text")
      .attr("dy", 4);

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
