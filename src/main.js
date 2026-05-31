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

function shouldShowLoadMore(hitsCount, total) {
  return hitsCount === 15 && total > 15;
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

    if (shouldShowLoadMore(data.hits.length, totalHits)) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
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
  showLoader();

  try {
    const data = await getImagesByQuery(query, page);
    createGallery(data.hits);

    smoothScroll();

    const loaded = page * 15;

    if (loaded >= totalHits) {
      hideLoadMoreButton();
      iziToast.info({
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
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

