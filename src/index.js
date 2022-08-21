import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { fetchCountries } from './fetchCountries';
import { markupCountrys, markupCountryInfo } from './markup';
const DEBOUNCE_DELAY = 300;

const refs = {
  inputForSearch: document.querySelector('#search-box'),
  countryList: document.querySelector('ul.country-list'),
  countryInfo: document.querySelector('div.country-info'),
};

refs.inputForSearch.addEventListener(
  'input',
  debounce(handelInput, DEBOUNCE_DELAY)
);

function handelInput(e) {
  refs.countryList.innerHTML = '';
  refs.countryInfo.innerHTML = '';

  console.log(e.target.value.trim());
  if (e.target.value.trim() !== '') {
    fetchCountries(e.target.value.trim())
      .then(data => {
        if (data.length > 10) {
          Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length > 1 && data.length <= 10) {
          refs.countryList.insertAdjacentHTML(
            'beforeend',
            markupCountrys(data)
          );
        } else {
          refs.countryInfo.insertAdjacentHTML(
            'beforeend',
            markupCountryInfo(data[0])
          );
        }
      })
      .catch(error => {
        if (Number(error.message) === 404) {
          Notiflix.Notify.failure('Oops, there is no country with that name');
        } else {
          console.log('error:', error.message);
        }
      });
  }
}
