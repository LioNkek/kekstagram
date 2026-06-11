const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderThumbnails = (userPictures) => {
  const pictureFragment = document.createDocumentFragment();

  userPictures.forEach((pictureData) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureImg = pictureElement.querySelector('.picture__img');

    pictureImg.src = pictureData.url;
    pictureImg.alt = pictureData.description;
    pictureElement.querySelector('.picture__likes').textContent = pictureData.likes;
    pictureElement.querySelector('.picture__comments').textContent = pictureData.comments.length;

    pictureFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(pictureFragment);
};

export { renderThumbnails };
