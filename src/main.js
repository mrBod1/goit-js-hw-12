import './css/styles.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const formEl = document.querySelector('.form');
const inputEl = formEl.elements['search-text'];
const submitBtn = formEl.querySelector('button');
const loadMoreBtn = document.querySelector('#load-more');

let query = '';
let page = 1;
let totalHits = 0;
const PER_PAGE = 15;

submitBtn.disabled = true;

inputEl.addEventListener('input', () => {
  submitBtn.disabled = inputEl.value.trim() === '';
});

formEl.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', onLoadMore);

function resetForm() {
  formEl.reset();
  submitBtn.disabled = true;
}

function smoothScroll() {
  const firstCard = document.querySelector('.gallery-item');
  if (!firstCard) return;

  const cardHeight = firstCard.getBoundingClientRect().height;

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function onFormSubmit(event) {
  event.preventDefault();

  query = inputEl.value.trim();
  if (!query) return;

  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    totalHits = data.totalHits;

    if (data.hits.length === 0) {
      iziToast.info({
        message: 'No images found. Try another query.',
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);

    // Якщо всі результати вмістилися в один запит
    if (totalHits <= PER_PAGE) {
      hideLoadMoreButton();
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton();
    }
  } catch {
    iziToast.error({
      message: 'Something went wrong. Try again later.',
      position: 'topRight',
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
    resetForm();
  }
}

async function onLoadMore() {
  page += 1;

  hideLoadMoreButton(); // ховаємо кнопку на час завантаження
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);

    // Якщо API повернув порожній масив
    if (!data.hits.length) {
      iziToast.info({
        message: "No more images available.",
        position: 'topRight',
      });
      return;
    }

    createGallery(data.hits);
    smoothScroll();

    const loaded = page * PER_PAGE;

    // Якщо досягли кінця результатів
    if (loaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "You've reached the end of search results.",
        position: 'topRight',
      });
    } else {
      showLoadMoreButton(); // показуємо знову, якщо ще є дані
    }
  } catch {
    iziToast.error({
      message: 'Error loading more images.',
      position: 'topRight',
    });
    hideLoadMoreButton();
  } finally {
    hideLoader();
  }
}
