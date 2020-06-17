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
  firstAmount.value = data.rates[currenciesList.shift()];
  secondAmount.value = data.rates[secondCurrency.value];
})

// Currency changes
firstCurrency.addEventListener('change', (event) => { compute(event.target, secondCurrency) });
secondCurrency.addEventListener('change', (event) => { compute(firstCurrency, event.target) });

// Amount changes

// Compute function
const compute = (firstCurrency, secondCurrency) => {
  fetch(`https://api.exchangerate-api.com/v4/latest/${firstCurrency.value}`)
  .then(res => res.json())
  .then(data => {
    // console.log(Object.keys(data.rates));
    const exchangeRate = data.rates[secondCurrency.value]
    console.log(exchangeRate);
    const firstAmount = document.getElementById('first-amount');
    const secondAmount = document.getElementById('second-amount');
    secondAmount.value = firstAmount.value * exchangeRate;
    console.log(`${firstAmount.value} ${firstCurrency.value} = ${secondAmount.value} ${secondCurrency.value}`);
  })
}

console.log("Goodbye from the console!");
