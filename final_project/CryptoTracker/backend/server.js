require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3333;

app.use(cors());

app.get("/api/crypto", async (req, res) => {
  const url =
    "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
  try {
    const response = await axios.get(url, {
      headers: {
        "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
        Accept: "application/json",
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error);
    res.status(500).send("Failed to fetch data");
  }
});

app.get("/api/news", async (req, res) => {
  const keyword = req.query.keyword || "crypto";
  const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${process.env.NEWS_API_KEY}`;

  try {
    const newsResponse = await axios.get(url);
    res.json(newsResponse.data);
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).send("Failed to fetch news data");
  }
});

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
