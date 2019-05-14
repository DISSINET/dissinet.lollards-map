var GoogleSpreadsheet = require("google-spreadsheet");
var turf = require("turf");
var fs = require("fs");

var readSpreadsheet = (key, next) => {
  var doc = new GoogleSpreadsheet(key);

  doc.getInfo((e, info) => {
    if (e) {
      next([]);
    }
    const worksheet = info.worksheets[0];
    worksheet.getRows((e, rows) => {
      if (e) {
        next([]);
      }
      next(
        rows.map(row => {
          delete row["_xml"];
          delete row["_links"];
          delete row["save"];
          delete row["del"];
          const o = {};
          Object.keys(row).forEach(k => (o[k] = row[k]));
          return o;
        })
      );
    });
  });
};

const points = [];
readSpreadsheet("1SUUjjtBT7HBOS9V6USNPk4eR5SFSsSrDByRxrERgg7A", rows => {
  rows
    .filter(r => r.x && r.y)
    .map(row => {
      const point = turf.point([parseFloat(row.y), parseFloat(row.x)], row);
      points.push(point);
    });

  fs.writeFile("./data/data.json", JSON.stringify(points), () => {
    console.log("data saved");
  });
});
