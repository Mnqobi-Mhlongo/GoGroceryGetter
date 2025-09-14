const express = require("express");
const app = express();
app.use(express.json());

const compareRoute = require("./routes/compare");
app.use("/compare", compareRoute);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));