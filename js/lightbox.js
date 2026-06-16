const bigPictureContainer = document.querySelector('.big-picture');
const bigPictureImg = bigPictureContainer.querySelector('.big-picture__img img');
const likesCount = bigPictureContainer.querySelector('.likes-count');
const socialCaption = bigPictureContainer.querySelector('.social__caption');
const closeButton = bigPictureContainer.querySelector('.big-picture__cancel');


const commentsContainer = bigPictureContainer.querySelector('.social__comments');
const commentShownCount = bigPictureContainer.querySelector('.social__comment-shown-count');
const commentTotalCount = bigPictureContainer.querySelector('.social__comment-total-count');
const commentsLoaderBotton = bigPictureContainer.querySelector('.comments-loader');

const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

let currentComments = [];
let shownCommentsCount = 0;
const COMMENTS_PER_PORTION = 5;

const createCommentElement = (commentData) => {
  const commentElement = commentTemplate.cloneNode(true);
  const commentImg = commentElement.querySelector('.social__picture');

  commentImg.src = commentData.avatar;
  commentImg.alt = commentData.name;
  commentElement.querySelector('.social__text').textContent = commentData.message;

  return commentElement;
};

const renderNextComments = () => {
  const nextCommentsCount = Math.min(currentComments.length, shownCommentsCount + COMMENTS_PER_PORTION);
  const commentsPortion = currentComments.slice(shownCommentsCount, nextCommentsCount);
  const commentFragment = document.createDocumentFragment();

  commentsPortion.forEach((commentData) => {
    const commentElement = createCommentElement(commentData);
    commentFragment.appendChild(commentElement);
  });

  commentsContainer.appendChild(commentFragment);

  shownCommentsCount = nextCommentsCount;
  commentShownCount.textContent = shownCommentsCount;

  if (shownCommentsCount >= currentComments.length) {
    commentsLoaderBotton.classList.add('hidden');
  } else {
    commentsLoaderBotton.classList.remove('hidden');
  }
};

const fillLightboxData = (picture) => {
  bigPictureImg.src = picture.url;
  bigPictureImg.alt = picture.description;
  likesCount.textContent = picture.likes;
  socialCaption.textContent = picture.description;

  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
  shownCommentsCount = 0;
  commentTotalCount.textContent = picture.comments.length;
  currentComments = picture.comments;

  renderNextComments();
};

const openLightbox = (picture) => {
  fillLightboxData(picture);
  bigPictureContainer.classList.remove('hidden');

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

commentsLoaderBotton.addEventListener('click', () => {
  renderNextComments();
});

export { openLightbox };
