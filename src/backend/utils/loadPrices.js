const fs = require('fs');
const path = require('path');

function loadPrices() {
    const dataPath = path.join(__dirname, "../../..", "assets/data/prices.json");
    try {
        const rawData = fs.readFileSync(dataPath);
        return JSON.parse(rawData);
    } catch (err) {
        console.error('Error loading prices:', err);
        return null;
    }
}

module.exports = { loadPrices };