const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const uploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const closeButton = uploadForm.querySelector('.img-upload__cancel');
const commentInput = uploadForm.querySelector('.text__description');
const hashtagsInput = uploadForm.querySelector('.text__hashtags');


const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
  live: false
});

const validateComment = (value) => value.length <= 140;

const parseHashtags = (value) => value.trim().split(/\s+/).filter((tag) => tag.length > 0);

const validateHashtagsCount = (value) => {
  const tags = parseHashtags(value);
  return tags.length <= 5;
};

const validateHashtagsUnique = (value) => {
  const tags = parseHashtags(value);
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  const uniqueTags = new Set(lowerCaseTags);
  return tags.length === uniqueTags.size;
};

const VALID_HASHTAG_REGEXP = /^#[a-zа-яё0-9]{1,19}$/i;

const validateHashtagsSyntax = (value) => {
  const tags = parseHashtags(value);
  return tags.every((tag) => VALID_HASHTAG_REGEXP.test(tag));
};

pristine.addValidator(
  commentInput,
  validateComment,
  'Длина комментария не может составлять больше 140 символов'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsCount,
  'Нельзя указывать больше 5 хештегов'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsUnique,
  'Хештеги не должны повторяться'
);

pristine.addValidator(
  hashtagsInput,
  validateHashtagsSyntax,
  'Введён невалидный хэштег (должен начинаться с #, содержать только буквы/цифры и быть не длиннее 20 символов)'
);

const openForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeForm = () => {
  uploadForm.reset();
  pristine.reset();
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape') {
    if (document.activeElement === hashtagsInput || document.activeElement === commentInput) {
      evt.stopPropagation();
      return;
    }

    evt.preventDefault();
    closeForm();
  }
}

const initUploadForm = () => {
  uploadInput.addEventListener('change', () => {
    openForm();
  });

  closeButton.addEventListener('click', () => {
    closeForm();
  });

  uploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export { initUploadForm };
