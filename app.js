console.log("Hello from the console!");

// Initializing
const firstCurrencySelect = document.getElementById('first-currency');
const secondCurrencySelect = document.getElementById('second-currency');

const firstCurrencyAmount = document.getElementById('first-amount');
firstCurrencyAmount.value = 1;

fetch('https://open.exchangerate-api.com/v6/latest')
.then(res => res.json())
.then(data => {
  const currenciesList = Object.keys(data.rates);
  currenciesList.forEach(currency => {
    firstCurrencySelect.insertAdjacentHTML('beforeend', `<option value='${currency}'>${currency}</option>`);
  });
  currenciesList.sort().forEach(currency => {
    secondCurrencySelect.insertAdjacentHTML('beforeend', `<option value='${currency}'>${currency}</option>`);
  });
  const secondCurrencyAmount = document.getElementById('second-amount');
  secondCurrencyAmount.value = data.rates[currenciesList.sort().shift()];
})

// Currency changes
const firstCurrency = document.getElementById('first-currency').value;
const secondCurrency = document.getElementById('first-currency').value;

// Amount changes

// Compute function
const compute = () => {
  fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency}`)
  .then(res => res.json())
  .then(data => {
    console.log(Object.keys(data.rates));
    const exchangeRate = data.rates[secondCurrency]
    console.log(exchangeRate);
    const secondCurrencyAmount = firstCurrencyAmount * exchangeRate;
    console.log(`${firstCurrencyAmount} ${firstCurrency} = ${secondCurrencyAmount} ${secondCurrency}`);
  })
}

console.log("Goodbye from the console!");
