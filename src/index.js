import './css/styles.css';
import axios from 'axios';
import GetImages from './js/api';

const refs = {
  searchForm: document.querySelector('#search-form'),
  galleryRef: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

const getImages = new GetImages();
console.log(getImages);
function onSearch(event) {
  event.preventDefault();
  clearGallery(); 
  getImages.query = event.currentTarget.elements.searchQuery.value.trim();
  getImages.resetPage();
  getImages.fetchImages().then(hits => {
    clearGallery();
    renderContent(hits)
  });
}

function onLoadMoreBtnClick(event) {
  getImages.fetchImages().then(hits => renderContent(hits));
}

function createCard(item) {
  return `<div class="photo-card">
  <img src="${item.webformatURL}" alt="${item.tags}" loading="lazy" height="200"/>
  <div class="info">
    <p class="info-item">   
      <b>${item.likes}</b>
    </p>
    <p class="info-item">
      <b>${item.views}</b>
    </p>
    <p class="info-item">
      <b>${item.comments}</b>
    </p>
    <p class="info-item">
      <b>${item.downloads}</b>
    </p>
  </div>
</div>`;
};
  
function createGallery(array) {
  return array.reduce((acc, item) => { return acc + createCard(item); }, "" )
;
}
  
function renderContent (array) {
  const result = createGallery(array);
  refs.galleryRef.insertAdjacentHTML('beforeend', result);
};

function clearGallery() {
  refs.galleryRef.innerHTML = '';
};
