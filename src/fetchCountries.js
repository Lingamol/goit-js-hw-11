import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
const searchParams = new URLSearchParams({
  fields: ['name', 'capital', 'population', 'flags', 'languages'],
});
const URL = 'https://restcountries.com/v3.1/name/';
export function fetchCountries(name) {
  // Notiflix.Notify.info(`fetch:${name} `);
  return fetch(`${URL}${name}?${searchParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
