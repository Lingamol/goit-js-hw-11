import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import axios from 'axios';

const params = {
  key: '29487870-d36fe710dee1f0536a07f7119',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  per_page: 40,
};
const page = 1;
export async function axiosGet(q) {
  const url = `https://pixabay.com/api/?q=${q}&page=${page}`;

  const response = await axios.get(url, { params });

  //   await this.incrementPage();
  return response.data;
}
