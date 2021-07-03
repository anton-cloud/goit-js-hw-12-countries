import './sass/main.scss';
import { form, result } from './js/refs.js';
import fetchCountries from './js/fetchCountries.js';
// ===========================================
import makeMarkupCountry from './templates/countryCard.hbs';
import makeMarkupCountries from './templates/countriesCard.hbs';
// ===========================================
const debounce = require('lodash.debounce');
// ===========================================
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
// ===========================================
function clearResult() {
  result.innerHTML = '';
}
// ===========================================

form.addEventListener('input', debounce(getCountries, 500));

function getCountries(e) {
  const searchQuery = e.target.value.trim();
  if (!searchQuery) {
    emptyInputMessage();
    return;
  }
  fetchCountries(searchQuery).then(data => {
    if (data.length === 1) {
      clearResult();
      renderCountry(data[0]);
    }
    if (data.length > 10) {
      clearResult();
      const myError = error({
        text: 'Too many matches found. Please enter a more specific query!',
        delay: 3000,
        maxTextHeight: null,
      });
    }
    if (data.length <= 10 && data.length >= 2) {
      clearResult();
      renderCountries(data);
    }
  });
}

function renderCountry({ name, capital, population, languages, flag }) {
  return result.insertAdjacentHTML(
    'beforeend',
    makeMarkupCountry({ name, capital, population, languages, flag }),
  );
}

function renderCountries(data) {
  return result.insertAdjacentHTML('beforeend', makeMarkupCountries(data));
}

function emptyInputMessage() {
  clearResult();
  const textError = '<p>Enter the country to search &#128578;</p>';
  result.innerHTML = textError;
}
