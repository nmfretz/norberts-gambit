export async function getPrices() {
  // change domain based on deployment
  const SERVER_URL = `http://localhost:5000/`;

  try {
    // TODO - update this try catch
    const response = await fetch(SERVER_URL);
    const data = await response.json();
    console.log(data);
    console.log(data[3]);

    exchangeRate.value = parseFloat(data[0]["Realtime Currency Exchange Rate"]["5. Exchange Rate"]).toFixed(6);
    dlrToPrice.value = parseFloat(data[1]["Global Quote"]["05. price"]).toFixed(2);
    dlrUToPrice.value = parseFloat(data[2]["Global Quote"]["05. price"]).toFixed(2);
  } catch (error) {
    console.log("there was an error retrieving the data");
  }
}

export function calculateResults() {
  calcSharesToBuy();
  calcUsdCommission();
  calcEcnBuyFees();
  calcEcnSellFees();
  calcConversionFees();
  calcCadConverted();
  calcUsdRecieved();
  calcPercentConversionFee();
}

function calcSharesToBuy() {
  const calcNumSharesToBuy = cadToConvert.value / dlrToPrice.value;
  numSharesToBuy.value = Math.floor(calcNumSharesToBuy);
}

function calcUsdCommission() {
  if (numSharesToBuy.value * commissionPerShare.value < minCommission.value) {
    commissionFeeUsd.value = parseFloat(minCommission.value).toFixed(2);
  } else if (numSharesToBuy.value * commissionPerShare.value < maxCommission.value) {
    commissionFeeUsd.value = (numSharesToBuy.value * commissionPerShare.value).toFixed(2);
  } else {
    commissionFeeUsd.value = parseFloat(maxCommission.value).toFixed(2);
  }
}

function calcEcnBuyFees() {
  if (incurEcnBuyFees.value === "Option 1") {
    // fees on all shares if YES
    ecnFeeFromBuying.value = (numSharesToBuy.value * ecnFeesPerShare.value).toFixed(2);
  } else {
    // fees on any shares above a multiple of 100 if NO
    ecnFeeFromBuying.value = ((numSharesToBuy.value % 100) * ecnFeesPerShare.value).toFixed(2);
  }
}

function calcEcnSellFees() {
  if (incurEcnSellFees.value === "Option 1") {
    // fees on all shares if YES
    ecnFeeFromSelling.value = (numSharesToBuy.value * ecnFeesPerShare.value).toFixed(2);
  } else {
    // fees on any shares above a multuple of 100 if NO
    ecnFeeFromSelling.value = ((numSharesToBuy.value % 100) * ecnFeesPerShare.value).toFixed(2);
  }
}

function calcConversionFees() {
  cadConversionFee.value = ecnFeeFromBuying.value;
  usdConversionFee.value = (parseFloat(ecnFeeFromSelling.value) + parseFloat(commissionFeeUsd.value)).toFixed(2);

  combinedCadConversionFee.value = (
    parseFloat(cadConversionFee.value) +
    parseFloat(usdConversionFee.value) * parseFloat(exchangeRate.value)
  ).toFixed(2);

  combinedUsdConversionFee.value = (
    parseFloat(usdConversionFee.value) +
    parseFloat(cadConversionFee.value) / parseFloat(exchangeRate.value)
  ).toFixed(2);
}

function calcCadConverted() {
  cadConverted.value = (parseFloat(numSharesToBuy.value) * parseFloat(dlrToPrice.value)).toFixed(2);
}

function calcUsdRecieved() {
  usdReceived.value = (parseFloat(numSharesToBuy.value) * parseFloat(dlrUToPrice.value)).toFixed(2);
}

function calcPercentConversionFee() {
  conversionFeePercent.value = (
    (parseFloat(combinedCadConversionFee.value) / parseFloat(cadConverted.value)) *
    100
  ).toFixed(2);
}

// input elements
const commissionPerShare = document.querySelector("#commission-per-share");
const minCommission = document.querySelector("#minimum-commission");
const maxCommission = document.querySelector("#maximum-commission");
const ecnFeesPerShare = document.querySelector("#ecn-fees-per-share");
const exchangeRate = document.querySelector("#exchange-rate");
const incurEcnBuyFees = document.querySelector("#incur-ecn-buy-fees");
const incurEcnSellFees = document.querySelector("#incur-ecn-sell-fees");
const cadToConvert = document.querySelector("#cad-to-convert");
const dlrToPrice = document.querySelector("#dlr-to-price");
const dlrUToPrice = document.querySelector("#dlr-u-to-price");

//  output elements
const numSharesToBuy = document.querySelector("#num-shares-to-buy");
const cadConverted = document.querySelector("#cad-converted");
const usdReceived = document.querySelector("#usd-received");
const conversionFeePercent = document.querySelector("#conversion-fee-percent");
const commissionFeeUsd = document.querySelector("#commission-fee-usd");
const ecnFeeFromBuying = document.querySelector("#ecn-fee-from-buying");
const ecnFeeFromSelling = document.querySelector("#ecn-fee-from-selling");
const cadConversionFee = document.querySelector("#cad-conversion-fee");
const usdConversionFee = document.querySelector("#usd-conversion-fee");
const combinedCadConversionFee = document.querySelector("#combined-cad-conversion-fee");
const combinedUsdConversionFee = document.querySelector("#combined-usd-conversion-fee");
