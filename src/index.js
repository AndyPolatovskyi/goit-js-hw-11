import Notiflix from 'notiflix';
import { requestServer } from './pixabay';

requestServer("cat",1).then((response)=>{
    console.log(response)
})

let page = 1;

const elements = {
    form: document.querySelector(".search-form"),
    gallery: document.querySelector(".gallery"),
    loadMoreBtn: document.querySelector(".load-more")
} 
elements.form.addEventListener("submit", handlerSubmit);
elements.loadMoreBtn.addEventListener("click", handlerClick);


async function handlerSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.currentTarget);
    console.log(formData.get("searchQuery"));
    const searchQuery = formData.get("searchQuery");
    if (!searchQuery) {
        return;
    }
    elements.gallery.innerHTML = "";
    // page = 1;
    await requestServer(searchQuery, page).then( images => {
        if (images.hits.length > 0) {
            renderCards(images.hits);
        }
    }).catch()
}
    function renderCards (images) {
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
    
}