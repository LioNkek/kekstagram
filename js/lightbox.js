const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const socialCaption = bigPictureContainer.querySelector('.social__caption');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');


const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const commentCountBlock = bigPictureContainer.querySelector('.social__comment-count');
const commentsLoaderBotton = bigPictureContainer.querySelector('.comments-loader');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const createCommentElement = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImg = commentElement.querySelector('.social__picture');

  commentImg.src = commentData.avatar;
  commentImg.alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

const renderComments = (comments) => {
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }

  const commentFragment = document.createDocumentFragment();

  comments.forEach((commentData) => {
    const commentElement = createCommentElement(commentData);
    commentFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentFragment);
};

const fillLightboxData = (picture) => {
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;

  commentTotalCount.textContent = picture.comments.length;
  commentShownCount.textContent = picture.comments.length;

  renderComments(picture.comments);
};

const openLightbox = (picture) => {
  fillLightboxData(picture);
  bigPictureContainer.classList.remove('hidden');

  commentCountBlock.classList.add('hidden');
  commentsLoaderBotton.classList.add('hidden');

  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeLightbox = () => {
  bigPictureContainer.classList.add('hidden');

  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeLightbox();
  }
}

closeButton.addEventListener('click',() => {
  closeLightbox();
});

export { openLightbox };
