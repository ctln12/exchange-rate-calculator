console.log("Hello from the console!");

// Initializing
const firstCurrency = document.getElementById('first-currency');
const secondCurrency = document.getElementById('second-currency');
const firstAmount = document.getElementById('first-amount');
const secondAmount = document.getElementById('second-amount');

fetch('https://open.exchangerate-api.com/v6/latest')
.then(res => res.json())
.then(data => {
  const currenciesList = Object.keys(data.rates);
  currenciesList.forEach(currency => {
    firstCurrency.insertAdjacentHTML('beforeend', `<option value='${currency}'>${currency}</option>`);
    secondCurrency.insertAdjacentHTML('beforeend', `<option value='${currency}'>${currency}</option>`);
  });
  secondCurrency.value = 'EUR';
  firstAmount.value = data.rates[currenciesList.shift()].toFixed(2);
  secondAmount.value = data.rates[secondCurrency.value].toFixed(2);
})

// Compute function
const compute = () => {
  fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency.value}`)
    .then(res => res.json())
    .then(data => {
      const exchangeRate = data.rates[secondCurrency.value]
      console.log(exchangeRate);
      secondAmount.value = (firstAmount.value * exchangeRate).toFixed(2);
      console.log(`${firstAmount.value} ${firstCurrency.value} = ${secondAmount.value} ${secondCurrency.value}`);
    })
}

// Currency changes
firstCurrency.addEventListener('change', compute);
secondCurrency.addEventListener('change', compute);

// Amount changes
firstAmount.addEventListener('input', compute);
secondAmount.addEventListener('input', compute);
