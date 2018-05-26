//fixer.io
//restcountries.eu

const axios = require('axios');

// const getExchangeRate = (from, to) => {
//   return axios.get(`http://api.fixer.io/latest?base=${from}`).then((response) => {
//     return response.data.rates[to];
//   });
// }
//
// const getCountries = (currencyCode) => {
//   return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//     return response.data.map((country) => {
//       return country.name;
//     });
//   });
// };

const getExchangeRate = async (from, to) => {
  try {
    const response = await axios.get(`http://api.fixer.io/latest?base=${from}`);
    const rate = response.data.rates[to];
    if (rate) {
      return rate;
    } else {
      throw new Error();
    }
  }
  catch (e) {
    throw new Error(`Unable to get exchange rate for ${from} and ${to}.`)
  }
};

const getCountries = async (currencyCode) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
    return response.data.map((country) => country.name);
  } catch (e) {
    throw new Error(`Unable to get countries that use ${currencyCode}`);
  }

};

// Without async await. Note the use extra countries variable and we are using promise chaining.
const convertCurrency = (from, to, amount) => {
  let countries;
  return getCountries(to).then((tempCountries) => {
    countries = tempCountries;
    return getExchangeRate(from, to);
  }).then((rate) => {
    const exchangedAmount = amount * rate;

    return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
  })
};

// async await

const convertCurrencyAlt = async (from, to, amount) => {
  const countries = await getCountries(to);
  const exchangeRate = await getExchangeRate(from, to);

  let exchangedAmount = amount * exchangeRate;

  return `${amount} ${from} is worth ${exchangedAmount} ${to}. ${to} can be used in the following countries: ${countries.join(', ')}`;
}
// getExchangeRate('USD', 'CAD').then((rate) => {
//   console.log(rate);
// });
//
// getCountries('USD').then((countries) => {
//   console.log(countries);
// });

// convertCurrency('CAD', 'USD', 100).then((status) => {
//   console.log(status);
// });

convertCurrencyAlt('CAD', 'USD', 100).then((status) => {
  console.log(status);
}).catch((e) => {
  console.log(e.message);
});
