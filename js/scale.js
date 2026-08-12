const SCALE_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;
const DEFAULT_SCALE = 100;

const uploadOverlay = document.querySelector('.img-upload__overlay');
const smallerButton = uploadOverlay.querySelector('.scale__control--smaller');
const biggerButton = uploadOverlay.querySelector('.scale__control--bigger');
const scaleInput = uploadOverlay.querySelector('.scale__control--value');
const previewImage = uploadOverlay.querySelector('.img-upload__preview img');

const scaleImage = (value) => {
  scaleInput.value = `${value}%`;
  previewImage.style.transform = `scale(${ value / 100 })`;
};

const onSmallerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = Math.max(currentValue - SCALE_STEP, MIN_SCALE);
  scaleImage(newValue);
};

const onBiggerButtonClick = () => {
  const currentValue = parseInt(scaleInput.value, 10);
  const newValue = Math.min(currentValue + SCALE_STEP, MAX_SCALE);
  scaleImage(newValue);
};

const resetScale = () => {
  scaleImage(DEFAULT_SCALE);
};

const initScale = () => {
  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
};

export { initScale, resetScale };
