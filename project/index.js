const express = require("express");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.set("view engine", "pug");
app.set("views", "./views");

// Define API options correctly
const apiOptions = {
  headers: {
    "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
  },
};

app.get("/", async (req, res) => {
  try {
    const url =
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest";
    const response = await axios.get(url, apiOptions);
    const cryptos = response.data.data;
    console.log(cryptos[0]);
    console.log(cryptos[0].quote);
    const allCryptoByMarketCap = [...cryptos]
      .sort((a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap)
      .slice(0, 10); // Ensure this is correctly sorted and sliced here

    res.render("index", {
      cryptosSortedByPrice: [...cryptos].sort((a, b) => {
        const priceA = a.quote.USD.price || 0; // Default to 0 if undefined
        const priceB = b.quote.USD.price || 0;
        return priceB - priceA;
      }),
      cryptosSortedByMarketCap: [...cryptos].sort(
        (a, b) => b.quote.USD.market_cap - a.quote.USD.market_cap
      ),
      cryptosSortedByPriceChange: [...cryptos].sort(
        (a, b) =>
          b.quote.USD.percent_change_24h - a.quote.USD.percent_change_24h
      ),
      allCryptoByMarketCap, // Make sure this variable is passed correctly
    });
  } catch (error) {
    console.error("Error fetching cryptocurrency data:", error.message);
    res.status(500).send("Error fetching data");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
