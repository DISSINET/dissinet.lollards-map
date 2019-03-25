import * as lollardsJSON from "./data/lollards.json";

import "./main.scss";
import "./../node_modules/leaflet/dist/leaflet.css";
import "./../node_modules/leaflet.markercluster/dist/MarkerCluster.css";
import "./../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css";

import chroma from "chroma-js";
import L from "leaflet";
import * as d3 from "d3";
import "leaflet.markercluster";
import "leaflet.markercluster.placementstrategies";
var version = "0.0.1";

if (document.body && document.getElementById("map")) {
  document.getElementById("map").outerHTML = "";
  if (document.getElementById("welcome")) {
    document.getElementById("welcome").outerHTML = "";
  }
}

var data = [];
var map = false;

var colors = {};

var closeModal = e => {
  e.preventDefault();
  document.getElementById("welcome").outerHTML = "";
  document.getElementById("pie").innerHTML = "";
  if (document.getElementById("legend")) {
    document.getElementById("legend").innerHTML = "";
  }

  const legendEl = document.createElement("div");
  document.body.appendChild(legendEl);
  legendEl.innerHTML = legend;
};

var modal =
  '<div class="modal is-active ">' +
  '<div class="modal-background"></div>' +
  '<div class="modal-card ">' +
  '<section class="modal-card-body">' +
  '<p class="title">Lollards <span class="version">(v ' +
  version +
  ")</span></p><div class='text'>" +
  '<div class="is-pulled-right"style="margin-top: 10px"><button id="continue-button" class="button is-dark">continue</button></div>' +
  "</section>" +
  "</div>";

var legend =
  '<div class="legend">' +
  '<p class="title">Lollards <span class="version"> (v ' +
  version +
  ")</span></p><div class='text'>" +
  "</div>" +
  "</div>";

var init = () => {
  // crate map div
  const mapEl = document.createElement("div");
  mapEl.setAttribute("id", "map");
  document.body.appendChild(mapEl);

  const welcomeEl = document.createElement("div");
  welcomeEl.setAttribute("id", "welcome");
  document.body.appendChild(welcomeEl);
  welcomeEl.innerHTML = modal;
  document.getElementById("continue-button").onclick = closeModal;

  data = prepareData();
  console.log(data);
  // initialise map
  map = L.map("map", {
    center: [54, -2],
    zoom: 7,
    maxZoom: 12,
    minZoom: 0,
    maxBounds: [[38, -10], [55, 15]]
  });

  // add a awmc tilelayer
  L.tileLayer(
    "http://a.tiles.mapbox.com/v3/isawnyu.map-knmctlkh/{z}/{x}/{y}.png",
    {
      attribution: "<a href='http://awmc.unc.edu/wordpress/'>awmc</a>",
      className: "map-base-layer map-base-layer-awmc"
    }
  ).addTo(map);

  L.tileLayer(
    "https://stamen-tiles-{s}.a.ssl.fastly.net/toner-labels/{z}/{x}/{y}{r}.{ext}",
    {
      className: "map-base-layer map-base-layer-stamen",
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      subdomains: "abcd",
      minZoom: 0,
      maxZoom: 20,
      ext: "png"
    }
  ).addTo(map);

  const pie = d3.pie().value(function(d) {
    return d.number;
  });

  const arc = radius =>
    d3
      .arc()
      .outerRadius(radius)
      .innerRadius(0);

  const clusters = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderLegPolylineOptions: { opacity: 0 },
    singleMarkerMode: true,

    iconCreateFunction: cluster => {
      const children = cluster.getAllChildMarkers();
      const single = children.length === 1;

      const radius = 15;
      const m = 10;
      const svgSize = (radius + m) * 2;

      const svgEl = document.createElement("svg");
      svgEl.setAttribute("id", cluster._leaflet_id);

      const svg = d3
        .select(svgEl)
        .attr("width", svgSize)
        .attr("height", svgSize)
        .append("g")
        .attr(
          "transform",
          "translate(" + svgSize / 2 + ", " + svgSize / 2 + ")"
        );

      // main circle
      svg
        .append("circle")
        .attr("r", radius)
        .style("stroke", " black")
        .style("fill", "white")
        .style("stroke-width", 2);

      // smaller outer circle
      const outerCircleStrokeW = 2.5;
      const outerCircleMargin = 2.5;

      const oldestYear = children
        .map(m => m.options.year_oldest)
        .filter(y => y)
        .sort((m1, m2) => {
          return m1 < m2 ? -1 : 1;
        })[0];

      console.log(oldestYear);

      if (children.find(m => m.options.revolt_1414)) {
        svg
          .append("circle")
          .attr("r", radius + outerCircleMargin + outerCircleStrokeW / 2)
          .style("stroke", "green")
          .style("fill", "none")
          .style("stroke-width", outerCircleStrokeW);
      }

      // bigger outer circle
      if (children.find(m => m.options.revolt_1431)) {
        svg
          .append("circle")
          .attr("r", radius + 2 * (outerCircleMargin + outerCircleStrokeW / 2))
          .style("stroke", "red")
          .style("fill", "none")
          .style("stroke-width", outerCircleStrokeW);
      }

      // bigger outer circle
      svg
        .append("text")
        .text(children.length)
        .style("fill", "black")
        .attr("class", "cluster-text")
        .attr("dy", 4);

      return L.divIcon({
        html: svgEl.outerHTML,
        className:
          "marker-icon " + (single ? "marker-single" : "marker-cluster"),
        iconSize: L.point(radius * 2, radius * 2)
      });
    }
  });

  const createPopup = (monastery: {}) => {
    return (
      '<div class="popup">' +
      // name
      '<div class="heading">' +
      "</div>" +
      "</div>"
    );
  };

  const markers = data.map(feature => {
    return L.marker(feature.ll, feature).bindPopup(createPopup(feature));
  });
  clusters.addLayers(markers);

  clusters.addTo(map);
};

var prepareData = () => {
  return lollardsJSON.features
    .filter(
      feature =>
        feature.geometry.coordinates[1] && feature.geometry.coordinates[0]
    )
    .map(feature => {
      feature.properties.ll = [
        feature.geometry.coordinates[1],
        feature.geometry.coordinates[0]
      ];
      return feature.properties;
    });
};

init();
