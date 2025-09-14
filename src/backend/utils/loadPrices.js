const fs = require("fs");
const path = require("path");

function loadPrices() {
  const filePath = path.join(__dirname, "../assets/prices.json");
  const data = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(data);
}

module.exports = loadPrices;
