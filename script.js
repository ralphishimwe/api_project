const codesUrl = `/api/codes`;
const form = document.getElementById("currency-form");
const amountInput = document.getElementById("amount");
const fromSelect = document.getElementById("from-currency");
const toSelect = document.getElementById("to-currency");
const resultDiv = document.getElementById("result");


async function loadCodesAndConvert() {
  try {
    const resp = await fetch(codesUrl);
    const data = await resp.json();

    if (data.result === "success") {
      data.supported_codes.forEach(([code, name]) => {
        const optionText = `${code} – ${name}`;
        const opt1 = document.createElement("option");
        opt1.value = code;
        opt1.text = optionText;
        const opt2 = opt1.cloneNode(true);
        fromSelect.add(opt1);
        toSelect.add(opt2);
      });

      
      fromSelect.value = "USD";
      toSelect.value = "RWF";
      amountInput.value = 1;

      
      convertCurrency();
    } else {
      throw new Error("Failed to fetch currency codes");
    }
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p id="error">Unable to load currency list.</p>`;
  }
}


async function convertCurrency() {
  resultDiv.textContent = "";

  const amountVal = parseFloat(amountInput.value);
  const fromCur = fromSelect.value;
  const toCur = toSelect.value;

  
  if (!amountInput.value || isNaN(amountVal) || amountVal < 1) {
    resultDiv.innerHTML = `<p id="error">Please enter a valid amount (≥ 1).</p>`;
    return;
  }

  if (!fromCur || !toCur) {
    resultDiv.innerHTML = `<p id="error">Please select both currencies.</p>`;
    return;
  }

  if (fromCur === toCur) {
    resultDiv.innerHTML = `<p id="error">Please choose two different currencies.</p>`;
    return;
  }

  try {
    const resp = await fetch(`/api/rates/${fromCur}`);
    const data = await resp.json();

    if (data.result !== "success") {
      throw new Error("API returned failure");
    }

    const rates = data.conversion_rates;

    if (!(toCur in rates)) {
      throw new Error("Rate not found");
    }

    const rate = rates[toCur];
    const converted = (amountVal * rate).toFixed(2);
    const oneConverted = (1 * rate).toFixed(4);

    const fromText = fromSelect.options[fromSelect.selectedIndex].text;
    const toText = toSelect.options[toSelect.selectedIndex].text;

    resultDiv.innerHTML = `
      <p>${amountVal} ${fromText} = ${converted} ${toText}</p>
      <p>1 ${fromCur} = ${oneConverted} ${toCur}</p>
    `;
  } catch (err) {
    console.error(err);
    resultDiv.innerHTML = `<p id="error">Error fetching rates. Please try again.</p>`;
  }
}


window.addEventListener("load", loadCodesAndConvert);


form.addEventListener("submit", async e => {
  e.preventDefault();
  convertCurrency();
});
