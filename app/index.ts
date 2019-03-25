import * as lollardsJSON from "./data/lollards.json";

import "./main.scss";
import "./../node_modules/leaflet/dist/leaflet.css";
import "./../node_modules/leaflet.markercluster/dist/MarkerCluster.css";
import "./../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css";

import L from "leaflet";
import * as d3 from "d3";
import "leaflet.markercluster";
import "leaflet.markercluster.placementstrategies";
var version = "0.1.0";

if (document.body && document.getElementById("map")) {
  document.getElementById("map").outerHTML = "";
  if (document.getElementById("welcome")) {
    document.getElementById("welcome").outerHTML = "";
  }
}

var data = [];
var map = false;
var mapEl;
var clusters;

var toggles = {
  revolt1414: true,
  revolt1431: true,
  book: true
};

var closeModal = () => {
  document.getElementById("welcome").outerHTML = "";
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

var checkbox = (label, symbolClass, toggle) =>
  "<div class='field is-horizontal checkbox-line'>" +
  "<div class='control'>" +
  "<label class='checkbox'>" +
  "<input type='checkbox'>" +
  label +
  "</label>" +
  '<div class="legend-symbol">' +
  '<span class="symbol-additional ' +
  symbolClass +
  '" ></span>' +
  '<span class="legend-single-marker"></span>' +
  "</div>" +
  "</div>" +
  "</div>";

var legend =
  '<div class="legend">' +
  '<p class="title">Lollards <span class="version"> (v ' +
  version +
  ")</span></p><div class='text'>" +
  "</div>" +
  checkbox("revolt 1414", "legend-revolt-1414", toggles["revolt1414"]) +
  checkbox("revolt 1431", "legend-revolt-1431", toggles["revolt1431"]) +
  checkbox("book", "legend-revolt-book", toggles["book"]) +
  "</div>";

var yearColors = [
  "#fef0d9",
  "#fdd49e",
  "#fdbb84",
  "#fc8d59",
  "#ef6548",
  "#d7301f"
];

const noYearColor = "grey";
const maxYear = 1521;
const minYear = 1415;
const getYearColor = year => {
  if (year) {
    const d = maxYear - minYear;
    const dr = (year - minYear) / d;
    const i = Math.round(dr * yearColors.length);

    return i === yearColors.length
      ? yearColors[yearColors.length - 1]
      : yearColors[i];
  } else {
    return noYearColor;
  }
};

var createPopup = feature => {
  return (
    '<div class="popup">' +
    // name
    '<div class="heading">' +
    "</div>" +
    "</div>"
  );
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

var init = () => {
  // crate map div
  mapEl = document.createElement("div");
  mapEl.setAttribute("id", "map");
  document.body.appendChild(mapEl);

  const welcomeEl = document.createElement("div");
  welcomeEl.setAttribute("id", "welcome");
  document.body.appendChild(welcomeEl);
  welcomeEl.innerHTML = modal;
  document.getElementById("continue-button").onclick = closeModal;
  closeModal();

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

  clusters = L.markerClusterGroup({
    showCoverageOnHover: false,
    spiderLegPolylineOptions: { opacity: 0 },
    singleMarkerMode: true,

    iconCreateFunction: cluster => {
      const children = cluster.getAllChildMarkers();
      const single = children.length === 1;

      const radius = 12;
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

      const oldestYear = children
        .map(m => m.options.year_oldest)
        .filter(y => y)
        .sort((m1, m2) => {
          return m1 < m2 ? -1 : 1;
        })[0];

      const fillColor = getYearColor(oldestYear);

      // main circle
      svg
        .append("circle")
        .attr("r", radius)
        .style("stroke", " black")
        .style("fill", fillColor)
        .style("fill-opacity", 1)
        .style("stroke-width", 2);

      // smaller outer circle
      const outerCircleStrokeW = 2.5;
      const outerCircleMargin = 2.5;

      if (children.find(m => m.options.revolt_1414)) {
        svg
          .append("circle")
          .attr("r", radius + outerCircleMargin + outerCircleStrokeW / 2)
          .style("stroke", "black")
          .style("fill-opacity", 1)
          .style("fill", "none")
          .style("stroke-width", outerCircleStrokeW);
      }

      // bigger outer circle
      if (children.find(m => m.options.revolt_1431)) {
        svg
          .append("circle")
          .attr("r", radius + 2 * (outerCircleMargin + outerCircleStrokeW / 2))
          .style("stroke", "black")
          .style("fill", "none")
          .style("stroke-width", outerCircleStrokeW);
      }

      if (children.find(m => m.options.books)) {
        svg
          .append("rect")
          .attr("x", 6)
          .attr("y", 6)
          .attr("width", 20)
          .attr("height", 20)
          .style("fill-opacity", 1)
          .style("fill", "black");
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

  render();
};

var render = () => {
  clusters.clearLayers();
  const markers = data.map(feature => {
    return L.marker(feature.ll, feature).bindPopup(createPopup(feature));
  });
  clusters.addLayers(markers);

  clusters.addTo(map);
};

init();
