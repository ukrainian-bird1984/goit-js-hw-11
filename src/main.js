import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
let lightBox;

hideLoader();

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    showLoader();

    gallery.innerHTML = '';

    const inputValue = e.target.elements.input.value;
    searchParams.q = inputValue;

    try {
        const images = await getPhotoByName();
        createGallery(images);
    } catch (error) {
        console.log(error);
        showToast('An error occurred while fetching images. Please try again!', 'error');
    } finally {
        e.target.reset();
        hideLoader();
    }
});

function getPhotoByName() {
    const urlParams = new URLSearchParams(searchParams);
    return fetch(`https://pixabay.com/api/?${urlParams}`).then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.status);
        }
    });
}

function createGallery(images) {
    if (images.hits.length === 0) {
        showToast('Sorry, there are no images matching your search query. Please try again!', 'warning');
    } else {
        const link = images.hits
            .map(
                (image) => `<a class="gallery-link" href="${image.largeImageURL}">
                <img class="gallery-image"
                    src="${image.webformatURL}"
                    alt="${image.tags}"
                </a>
                <div class="img-content">
                    <div>
                        <h3>Likes</h3>
                        <p>${image.likes}</p>
                    </div>
                    <div>
                        <h3>Views</h3>
                        <p>${image.views}</p>
                    </div>
                    <div>
                        <h3>Comments</h3>
                        <p>${image.comments}</p>
                    </div>
                    <div>
                        <h3>Downloads</h3>
                        <p>${image.downloads}</p>
                    </div>
                </div>`
            )
            .join('');

        gallery.innerHTML = link;

        if (lightBox) {
            lightBox.refresh();
        } else {
            lightBox = new SimpleLightbox('.gallery-link');
        }
    }
}

function showLoader() {
    loader.style.display = 'block';
}

function hideLoader() {
    loader.style.display = 'none';
}

function showToast(message, type) {
    iziToast[type]({
        title: type === 'error' ? 'Error' : null,
        message: message,
        position: 'topRight',
    });
}
