import { getRandomInteger, getRandomArrayElement, shuffleArray, createIdGenerator } from './util.js';
import {
  DESCRIPTIONS,
  MESSAGES,
  NAMES,
  PHOTO_COUNT,
  MIN_LIKES,
  MAX_LIKES,
  MIN_AVATAR_INDEX,
  MAX_AVATAR_INDEX,
  MIN_COMMENTS,
  MAX_COMMENTS,
  MIN_SENTENCES,
  MAX_SENTENCES
} from './constants.js';

const getCommentId = createIdGenerator();
const getPhotoId = createIdGenerator();

const createCommentMessage = () => shuffleArray(MESSAGES)
  .slice(0, getRandomInteger(MIN_SENTENCES, MAX_SENTENCES))
  .join(' ');

const createComment = () => {
  const avatarIndex = getRandomInteger(MIN_AVATAR_INDEX, MAX_AVATAR_INDEX);

  return {
    id: getCommentId(),
    avatar: `img/avatar-${avatarIndex}.svg`,
    message: createCommentMessage(),
    name: getRandomArrayElement(NAMES),
  };
};

const createPhotoDescription = () => {
  const photoId = getPhotoId();

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from(
      { length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) },
      createComment
    ),
  };
};

const generatePhotosData = () => Array.from({ length: PHOTO_COUNT }, createPhotoDescription);

export { generatePhotosData };
