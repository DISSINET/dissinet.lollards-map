import * as monasteriesJSON from "./data/monasteries.json";
import * as ordersJSON from "./data/orders.json";

import "./main.scss";
import "./../node_modules/leaflet/dist/leaflet.css";
import "./../node_modules/leaflet.markercluster/dist/MarkerCluster.css";
import "./../node_modules/leaflet.markercluster/dist/MarkerCluster.Default.css";

import chroma from "chroma-js";
import L from "leaflet";
import * as d3 from "d3";
import "leaflet.markercluster";
import "leaflet.markercluster.placementstrategies";
var version = "1.0.0";

if (document.body && document.getElementById("map")) {
  document.getElementById("map").outerHTML = "";
  if (document.getElementById("welcome")) {
    document.getElementById("welcome").outerHTML = "";
  }
}

var data = [];
var map = false;

var colors = {
  monks: "#00B06E",
  nuns: "#BF0090",
  double: "#FFC500"
};
var colorScale = chroma.scale([colors.monks, colors.double, colors.nuns]);

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
  '<p class="title">Cistercian monasteries in France <span class="version">(v ' +
  version +
  ")</span></p><div class='text'>" +
  '<div class="is-pulled-right"style="margin-top: 10px"><button id="continue-button" class="button is-dark">continue</button></div>' +
  "</section>" +
  "</div>";

var legend =
  '<div class="legend">' +
  '<p class="title">Cistercian monasteries in France <span class="version"> (v ' +
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
  // initialise map
  map = L.map("map", {
    center: [47, 2],
    zoom: 7,
    maxZoom: 12,
    minZoom: 7,
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

    iconCreateFunction: cluster => {
      const markers = cluster.getAllChildMarkers();
      const single = markers.length === 1;

      const radius = 15;
      const m = 1.5;
      const svgSize = (radius + m) * 2;

      let genders = [
        { name: "monks", number: 0 },
        { name: "nuns", number: 0 },
        { name: "double", number: 0 }
      ];
      markers.forEach(marker => {
        const gender = genders.find(g => g.name === marker.options.gender);
        if (gender) {
          gender.number += 1;
        }
      });
      const arcs = pie(genders);

      const wrapperEl = document.getElementById("pie");
      const svgEl = document.createElement("svg");
      svgEl.setAttribute("id", "pie" + cluster._leaflet_id);
      //wrapperEl.appendChild(svgEl);

      const svg = d3
        .select(svgEl)
        .attr("width", svgSize)
        .attr("height", svgSize)
        .append("g")
        .attr(
          "transform",
          "translate(" + svgSize / 2 + ", " + svgSize / 2 + ")"
        );

      svg.append("circle").attr("r", radius + m);

      const g = svg
        .selectAll("arc")
        .data(arcs)
        .enter()
        .append("g")
        .style("fill", d => {
          return colors[d.data.name];
        })
        .attr("class", "arc");

      svg.append("circle").attr("r", 2 + (radius + m) / 2);

      g.append("path").attr("d", arc(radius));
      svg
        .append("text")
        .text(markers.length)
        .style("fill", "white")
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

  data
    .filter(monastery => monastery.valid)
    .forEach(monastery => {
      const marker = L.circleMarker(monastery.ll, {
        radius: 7,
        fillColor: colors[monastery.gender],
        fillOpacity: 1,
        stroke: true,
        color: "black",
        weight: 1.5,
        gender: monastery.gender
      }).bindPopup(createPopup(monastery));
      clusters.addLayer(marker);
    });

  clusters.addTo(map);
};

var prepareData = (): Array<Object> => {
  return [];
};

init();
