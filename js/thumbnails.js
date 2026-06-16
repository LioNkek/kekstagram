const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (photos) => {
  const pictureFragment = document.createDocumentFragment();

  photos.forEach((picture) => {
    const thumbnail = pictureTemplate.cloneNode(true);
    const pictureImg = thumbnail.querySelector('.picture__img');

    pictureImg.src = picture.url;
    pictureImg.alt = picture.description;
    thumbnail.querySelector('.picture__likes').textContent = picture.likes;
    thumbnail.querySelector('.picture__comments').textContent = picture.comments.length;

    thumbnail.dataset.thumbnailId = picture.id;

    pictureFragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(pictureFragment);
};

export { renderThumbnails };
