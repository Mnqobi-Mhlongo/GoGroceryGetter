import { useState } from "react";

function App() {
  const [shoppingList, setShoppingList] = useState("");
  const [results, setResults] = useState(null);

  const handleCompare = async () => {
    const items = shoppingList.split(",").map((i) => i.trim());
    try {
      const response = await fetch("http://localhost:4000/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shoppingList: items }),
      });
      const data = await response.json();
      setResults(data);
    } catch (err) {
      console.error("Error fetching comparison:", err);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🛒 GoGroceryGetter</h1>
      <p>Enter your shopping items, separated by commas:</p>
      <input
        type="text"
        placeholder="e.g., Milk, Bread, Eggs"
        value={shoppingList}
        onChange={(e) => setShoppingList(e.target.value)}
        style={{ width: "300px", marginRight: "10px" }}
      />
      <button onClick={handleCompare}>Compare Prices</button>

      {results && (
        <div style={{ marginTop: "20px" }}>
          <h3>Results</h3>
          <p>
            <strong>Cheapest Store:</strong> {results.cheapestStore.store} ($
            {results.cheapestStore.total})
          </p>
          <p>
            <strong>Most Expensive Store:</strong> {results.expensiveStore.store} ($
            {results.expensiveStore.total})
          </p>
          <p>
            <strong>Savings:</strong> ${results.savings}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
// src/frontend/src/App.jsx