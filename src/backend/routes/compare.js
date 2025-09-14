
const express = require("express");
const router = express.Router();
const loadPrices = require("../utils/loadPrices");

router.post("/", (req, res) => {
  const { shoppingList } = req.body; // e.g., ["Milk", "Bread"]
  const prices = loadPrices();

  let results = {};

  // Group by store
  shoppingList.forEach(item => {
    prices
      .filter(p => p.item.toLowerCase() === item.toLowerCase())
      .forEach(p => {
        if (!results[p.store]) results[p.store] = 0;
        results[p.store] += p.price;
      });
  });

  const storeTotals = Object.entries(results).map(([store, total]) => ({ store, total }));

  // Cheapest basket (one-stop shop)
  const cheapestStore = storeTotals.reduce((min, s) => (s.total < min.total ? s : min), storeTotals[0]);

  // Most expensive basket
  const expensiveStore = storeTotals.reduce((max, s) => (s.total > max.total ? s : max), storeTotals[0]);

  res.json({
    shoppingList,
    storeTotals,
    cheapestStore,
    expensiveStore,
    savings: expensiveStore.total - cheapestStore.total
  });
});

module.exports = router;