const express = require("express");
const router = express.Router();
const loadPrices = require("../utils/loadPrices");

router.post("/", (req, res) => {
  try {
    const { shoppingList } = req.body;
    
    if (!shoppingList || !Array.isArray(shoppingList)) {
      return res.status(400).json({ error: "Invalid shopping list" });
    }

    const prices = loadPrices();
    const storeTotals = {};

    // Calculate totals for each store
    shoppingList.forEach(item => {
      const matchingItems = prices.filter(
        p => p.item.toLowerCase() === item.toLowerCase()
      );
      
      if (matchingItems.length === 0) {
        console.warn(`Item "${item}" not found in any store`);
        return;
      }

      matchingItems.forEach(p => {
        if (!storeTotals[p.store]) storeTotals[p.store] = 0;
        storeTotals[p.store] += p.price;
      });
    });

    // Convert to array format
    const storeTotalsArray = Object.entries(storeTotals)
      .map(([store, total]) => ({ store, total: parseFloat(total.toFixed(2)) }));

    if (storeTotalsArray.length === 0) {
      return res.json({
        shoppingList,
        message: "No matching items found in price database"
      });
    }

    // Find cheapest and most expensive stores
    const cheapestStore = storeTotalsArray.reduce(
      (min, s) => (s.total < min.total ? s : min), 
      storeTotalsArray[0]
    );

    const expensiveStore = storeTotalsArray.reduce(
      (max, s) => (s.total > max.total ? s : max), 
      storeTotalsArray[0]
    );

    const savings = parseFloat((expensiveStore.total - cheapestStore.total).toFixed(2));

    // Send response
    res.json({
      shoppingList,
      storeTotals: storeTotalsArray,
      cheapestStore,
      expensiveStore,
      savings
    });
  } catch (error) {
    console.error("Error in compare route:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;