import './css/styles.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { galleryItemsMarkup } from './galleryItemsMarkup';

import axios from 'axios';
const DEFAULT_CURRENT_PAGE = 1;

let query = '';
let currentPage = 1;
let totalPages = 0;

const refs = {
  inputForSearch: document.querySelector('input[name="searchQuery"]'),
  form: document.querySelector('#search-form'),
  gallery: document.querySelector('div.gallery'),
  btnLoadMore: document.querySelector('.load-more'),
};
var lightbox = new SimpleLightbox('.gallery a', {
  scrollZoom: false,
  captionsData: 'alt',
  captionDelay: 250,
});

refs.btnLoadMore.style.display = 'none';

const renderGallery = items => {
  refs.gallery.insertAdjacentHTML('beforeend', items);
  lightbox.refresh();
};

refs.form.addEventListener('submit', onSubmit);
refs.btnLoadMore.addEventListener('click', handleLoadMoreClick);

function onSubmit(event) {
  event.preventDefault();
  clearGallery();

  currentPage = DEFAULT_CURRENT_PAGE;
  const {
    elements: { searchQuery },
  } = event.currentTarget;
  query = searchQuery.value.trim();
  if (!query) {
    Notiflix.Notify.failure('Please fill field!');
    return;
  }
  fetchData(query);
}

const fetchData = async q => {
  const params = {
    key: '29487870-d36fe710dee1f0536a07f7119',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 40,
  };

  const url = `https://pixabay.com/api/?q=${q}&page=${currentPage}`;

  try {
    const { data } = await axios.get(url, { params });
    if (data.totalHits === 0) {
      Notiflix.Notify.warning(
        'Sorry, there are no images matching your search query. Please try again.'
      );
      return;
    } else if (currentPage === 1) {
      Notiflix.Notify.success(`Hooray! We found ${data.totalHits} images.`);
    }
    totalPages = data.totalHits / params.per_page;
    renderGallery(galleryItemsMarkup(data.hits));
    toggleLoadMoreBtn(data.totalHits);
  } catch (error) {
    if (error.response) {
      console.log(error.response.data);
    } else if (error.request) {
      console.log(error.request);
    } else {
      console.log('Error', error.message);
    }
  }
};
async function handleLoadMoreClick() {
  currentPage += 1;
  await fetchData(query);
  windowScroll();
}

function clearGallery() {
  refs.gallery.innerHTML = '';
}

function toggleLoadMoreBtn(hitsValue) {
  if (hitsValue === 0 || currentPage === totalPages) {
    refs.btnLoadMore.style.display = 'none';
  } else {
    refs.btnLoadMore.style.display = 'block';
  }
}

function windowScroll() {
  const { height: cardHeight } = document
    .querySelector('.gallery')
    .firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
