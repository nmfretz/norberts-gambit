const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://www.alphavantage.co/query?";

const exchangeRateParams = new URLSearchParams({
  function: "CURRENCY_EXCHANGE_RATE",
  from_currency: "USD",
  to_currency: "CAD",
  apikey: process.env.ALPHA_VANTAGE_API_KEY,
});

const dlrToParams = new URLSearchParams({
  function: "GLOBAL_QUOTE",
  symbol: "DLR.TRT",
  apikey: process.env.ALPHA_VANTAGE_API_KEY,
});

const dlrUToParams = new URLSearchParams({
  function: "GLOBAL_QUOTE",
  symbol: "DLR-U.TRT",
  apikey: process.env.ALPHA_VANTAGE_API_KEY,
});

let cacheData;
let cacheTime;

app.get("/", async (req, res) => {
  // in-memory cache for 15 min
  if (cacheTime && cacheTime > Date.now() - 15 * 60 * 1000) {
    return res.json(cacheData);
  }
  try {
    const priceArr = [];

    const response = await Promise.all([getExchangeRate(), getDlrToPrice(), getDlrToUPrice()]);
    response.forEach((r) => priceArr.push(r.data));
    cacheData = priceArr;
    cacheTime = Date.now();
    priceArr.push({ cacheTime: cacheTime });
    res.json(priceArr);
  } catch (error) {
    console.error(error);
  }
});

function getExchangeRate() {
  return axios.get(`${BASE_URL}${exchangeRateParams}`);
}

function getDlrToPrice() {
  return axios.get(`${BASE_URL}${dlrToParams}`);
}

function getDlrToUPrice() {
  return axios.get(`${BASE_URL}${dlrUToParams}`);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`starting server at port:${PORT}`);
});
