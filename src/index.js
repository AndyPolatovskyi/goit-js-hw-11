import Notiflix from 'notiflix';
import { requestServer } from './pixabay';


let page = 1;
let searchQuery = '';

const elements = {
  form: document.querySelector('.search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};
elements.form.addEventListener('submit', handlerSubmit);
elements.loadMoreBtn.addEventListener('click', handlerClick);

async function handlerSubmit(evt) {
  evt.preventDefault();
  const formData = new FormData(evt.currentTarget);
  console.log(formData.get('searchQuery'));
  searchQuery = formData.get('searchQuery');
  if (!searchQuery) {
    return;
  }

  elements.gallery.innerHTML = '';
  page = 1;
  await requestServer(searchQuery, page)
    .then(images => {
      if (images.hits.length > 0) {
        renderCards(images.hits);
        Notiflix.Notify.success(`Hooray! We found ${images.totalHits} images.`);
        elements.loadMoreBtn.classList.remove('hidden');
      } else {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      }
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
function renderCards(images) {
  images.forEach(image => {
    const htmlCard = `
            <div class="photo-card">
              <img src="${image.webformatURL}" alt="${image.tags}" loading="lazy" />
              <div class="info">
                <p class="info-item"><b>Likes:</b> ${image.likes}</p>
                <p class="info-item"><b>Views:</b> ${image.views}</p>
                <p class="info-item"><b>Comments:</b> ${image.comments}</p>
                <p class="info-item"><b>Downloads:</b> ${image.downloads}</p>
              </div>
            </div>
          `;
    elements.gallery.insertAdjacentHTML('beforeend', htmlCard);
  });
}

async function handlerClick(evt) {
  page += 1;
  await requestServer(searchQuery, page)
    .then(images => {
      if (images.hits.length > 0) {
        if (images.totalHits < page * 40) {
          elements.loadMoreBtn.classList.add('hidden');
          Notiflix.Notify.failure(
            "We're sorry, but you've reached the end of search results."
          );
        }
        renderCards(images.hits);
        Notiflix.Notify.success(`Loaded ${images.hits.length} more images.`);
      }
    })
    .catch(() => {
      Notiflix.Notify.failure(
        'Oops! Something went wrong! Try reloading the page!'
      );
    });
}
