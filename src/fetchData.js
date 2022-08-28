import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import axios from 'axios';

const KEY = 'key=29487870-d36fe710dee1f0536a07f7119';
const URL = 'https://pixabay.com/api/';
export function fetchData(q) {
  Notiflix.Notify.info(`fetch:${q} `);
  return axios
    .get(
      `${URL}?${KEY}&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => {
      if (Number(response.status) !== 200) {
        throw new Error(response.status);
      }
      const { data } = response;
      return data;
    });
}
