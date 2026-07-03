import { renderThumbnails } from './thumbnails.js';
import { openLightbox } from './lightbox.js';
import { initUploadForm } from './form.js';
import { getData } from './api.js';
import { showDataError } from './util.js';

const picturesContainer = document.querySelector('.pictures');

getData()
  .then((photosData) => {
    renderThumbnails(photosData);

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
  }).catch(() => {
    showDataError();
  });

initUploadForm();
