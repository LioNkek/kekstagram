import { generatePhotosData } from './data.js';
import { renderThumbnails } from './thumbnails.js';

const photosData = generatePhotosData();

renderThumbnails(photosData);
