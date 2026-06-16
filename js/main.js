import { generatePhotosData } from './data.js';
import { renderThumbnails } from './thumbnails.js';
import { openLightbox } from './lightbox.js';

const photosData = generatePhotosData();

renderThumbnails(photosData);

const picturesContainer = document.querySelector('.pictures');

picturesContainer.addEventListener('click', (evt) => {
  const targetThumbnail = evt.target.closest('[data-thumbnail-id]');

  if (!targetThumbnail) {
    return;
  }

  evt.preventDefault();

  const thumbnailId = Number(targetThumbnail.dataset.thumbnailId);
  const currentPicture = photosData.find((photo) => photo.id === thumbnailId);

  if (currentPicture) {
    openLightbox(currentPicture);
  }
});

