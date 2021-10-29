const express = require("express");
const axios = require("axios");
require("dotenv").config();
const cors = require("cors");

const app = express();
app.use(cors());

const BASE_URL = "https://query1.finance.yahoo.com/v8/finance/chart/";
const MINUTES_TO_MILLISECONDS = 1 * 60 * 1000;

let cacheData;
let cacheTime;

app.get("/", async (req, res) => {
  // in-memory cache for 5 min
  if (cacheTime && cacheTime > Date.now() - 5 * MINUTES_TO_MILLISECONDS) {
    console.log("using cache");
    return res.json(cacheData);
  }
  try {
    // TODO - error handle for status code here
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
  return axios.get(`${BASE_URL}USDCAD=X`);
}

function getDlrToPrice() {
  return axios.get(`${BASE_URL}DLR.TO?&range=max`);
}

function getDlrToUPrice() {
  return axios.get(`${BASE_URL}DLR-U.TO?&range=max`);
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`starting server at port:${PORT}`);
});
