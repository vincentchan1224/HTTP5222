const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "pug");
app.set("views", "./views");
app.use(express.static("public"));

// Fetching a limited number of news for the main page
async function fetchInitialNews() {
  const response = await axios.get(
    `https://newsapi.org/v2/everything?q=crypto&apiKey=${process.env.NEWS_API_KEY}`
  );
  return response.data.articles.slice(0, 3); // Get only the first 3 articles
}

// Route for fetching cryptocurrency data
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

// Route for fetching and displaying news with infinite scroll and search
app.get("/news", async (req, res) => {
  const keyword = req.query.keyword || "crypto";
  const page = req.query.page || 1;
  const pageSize = 10; // News per page
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(keyword)}&apiKey=${process.env.NEWS_API_KEY}&page=${page}&pageSize=${pageSize}`
    );
    const articles = response.data.articles;
    res.render("news", { articles, keyword });
  } catch (error) {
    console.error("Error fetching news data:", error);
    res.status(500).send("Failed to fetch news data");
  }
});

// Main route that renders the index page with sorted cryptocurrency data and initial news
app.get("/", async (req, res) => {
  try {
    // Fetch cryptocurrency data
    const cryptoResponse = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
          Accept: "application/json",
        },
      }
    );

    // Fetch initial news data
    const newsArticles = await fetchInitialNews();

    const coins = cryptoResponse.data.data;
    const hot = coins
      .sort((a, b) => b.quote.USD.volume_24h - a.quote.USD.volume_24h)
      .slice(0, 5);
    const newListings = coins
      .sort((a, b) => new Date(b.date_added) - new Date(a.date_added))
      .slice(0, 5);
    const topGainers = coins
      .sort(
        (a, b) =>
          b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
      )
      .slice(0, 5);
    const allCrypto = coins.sort(
      (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap
    );

    // Render the 'index' view with the sorted data
    res.render("index", {
      hot,
      newListings,
      topGainers,
      allCrypto,
      articles: newsArticles,
    });
  } catch (error) {
    console.error("Failed to fetch or process data:", error);
    res.status(500).send("Failed to fetch data");
  }
});

// Markets page showing top 100 cryptocurrencies by market cap
app.get("/markets", async (req, res) => {
  try {
    const response = await axios.get(
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
      {
        headers: {
          "X-CMC_PRO_API_KEY": process.env.CMC_API_KEY,
          Accept: "application/json",
        },
      }
    );

    // Sorting to get the top 100
    const top100Crypto = response.data.data
      .sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap)
      .slice(0, 100);
    res.render("markets", { cryptos: top100Crypto });
  } catch (error) {
    console.error(
      "Error fetching cryptocurrency data for markets page:",
      error
    );
    res.status(500).send("Failed to fetch data");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
