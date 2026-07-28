import { renderThumbnails } from './thumbnails.js';
import { shuffleArray } from './util.js';

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const filterContainer = document.querySelector('.img-filters');
const filterForm = filterContainer.querySelector('.img-filters__form');
const picturesContainer = document.querySelector('.pictures');

let currentFilter = 'default';

const getFilteredPhotos = (photos, filterType) => {
  switch (filterType) {
    case 'random': {
      const shuffled = shuffleArray(photos);
      return shuffled.slice(0, 10);
    }
    case 'discussed':
      return [...photos].sort((a, b) => b.comments.length - a.comments.length);
    default:
      return [...photos];
  }
};

const clearThumbnails = () => {
  const pictures = picturesContainer.querySelectorAll('.picture');
  pictures.forEach((picture) => picture.remove());
};

const onFilterChange = (photos) => {
  const filteredPhotos = getFilteredPhotos(photos, currentFilter);

  clearThumbnails();
  renderThumbnails(filteredPhotos);
};

const debouncedFilterChange = debounce(onFilterChange, 500);

const onFilterButtonClick = (evt, photos) => {
  const targetButton = evt.target.closest('.img-filters__button');
  if (!targetButton) {
    return;
  }

  if (targetButton.classList.contains('img-filters__button--active')) {
    return;
  }

  filterForm.querySelectorAll('.img-filters__button').forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });

  targetButton.classList.add('img-filters__button--active');

  switch (targetButton.id) {
    case 'filter-default':
      currentFilter = 'default';
      break;
    case 'filter-random':
      currentFilter = 'random';
      break;
    case 'filter-discussed':
      currentFilter = 'discussed';
      break;
  }

  debouncedFilterChange(photos);
};

const initFilters = (photos) => {
  filterContainer.classList.remove('img-filters--inactive');

  filterForm.addEventListener('click', (evt) => {
    onFilterButtonClick(evt, photos);
  });
};

export { initFilters };
