const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const API_KEY = "E735CDB5-E62D-4178-85FD-39B1D5877B35";
const BASE_URL = "https://uk.api.vehicledataglobal.com/r2/lookup";

app.post("/api/fetch-tyre-data", async (req, res) => {
  const { vrm } = req.body;
  if (!vrm) return res.status(400).json({ error: "Missing VRM" });

  const apiUrl = `${BASE_URL}?packagename=TyreData&apikey=${API_KEY}&vrm=${encodeURIComponent(vrm)}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("❌ Proxy fetch failed:", err);
    res.status(500).json({ error: "Proxy server error" });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Proxy server running on port ${PORT}`);
});
