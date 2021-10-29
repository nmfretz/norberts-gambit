import { getPrices, calculateResults } from "./calculate.js";

const form = document.querySelector("form");
const outputDiv = document.querySelector(".output");
const mainOutput = document.querySelector(".main-output");
const outputDetails = document.querySelector(".output-details");
const detailBtn = document.querySelector(".detail-button");

await getPrices();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // blank input error handled in html by 'required' attribute
  // number value requirement handled in htmk by type='number' attribute

  calculateResults();
  outputDiv.classList.remove("hide");
  mainOutput.classList.remove("hide");
});

form.addEventListener("reset", async (e) => {
  outputDiv.classList.add("hide");
  mainOutput.classList.add("hide");
  outputDetails.classList.add("hide");
  detailBtn.value = "Show Fee Details";
  await getPrices();
});

mainOutput.addEventListener("click", (e) => {
  if (!e.target.matches(".detail-button")) return;
  outputDetails.classList.toggle("hide");
  if (detailBtn.value === "Show Fee Details") {
    detailBtn.value = "Hide Fee Details";
  } else {
    detailBtn.value = "Show Fee Details";
  }
});
