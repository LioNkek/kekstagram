const DESCRIPTIONS = [
  'Отличный день для новых начинаний!',
  'Летний вайб и ничего лишнего.',
  'Ловлю каждый момент.',
  'Красота вокруг нас, нужно только присмотреться.',
  'Мой лучший кадр за эту неделю.',
  'Просто оставлю это здесь.',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Артём',
  'Иван',
  'Мария',
  'Ксения',
  'Александр',
  'Ольга',
  'Дмитрий',
  'Елена',
  'Никита',
  'Анна'
];

const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_AVATAR_INDEX = 1;
const MAX_AVATAR_INDEX = 6;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const MIN_SENTENCES = 1;
const MAX_SENTENCES = 2;

const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(min, max));
  const upper = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;
  return () => ++lastGeneratedId;
};

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

const photosData = generatePhotosData();

console.log('Сгенерированные mock-данные (25 фото):', photosData);
