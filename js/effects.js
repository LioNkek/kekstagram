const EFFECTS = {
  none: {
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  chrome: {
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  sepia: {
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  marvin: {
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  phobos: {
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  heat: {
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
};

const uploadForm = document.querySelector('.img-upload__form');
const sliderContainer = uploadForm.querySelector('.img-upload__effect-level');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
const effectLevelInput = uploadForm.querySelector('.effect-level__value');
const previewImage = uploadForm.querySelector('.img-upload__preview img');
const effectsList = uploadForm.querySelector('.effects__list');

let chosenEffect = EFFECTS.none;

const updateSliderVisibility = () => {
  if (chosenEffect === EFFECTS.none) {
    sliderContainer.classList.add('hidden');
    previewImage.style.filter = 'none';
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const updateSliderOptions = () => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: chosenEffect.min,
      max: chosenEffect.max,
    },
    start: chosenEffect.max,
    step: chosenEffect.step,
  });
};

const onEffectsListChange = (evt) => {
  if (evt.target.classList.contains('effects__radio')) {
    const effectName = evt.target.value;
    chosenEffect = EFFECTS[effectName];

    updateSliderVisibility();
    updateSliderOptions();
  }
};

const resetEffects = () => {
  chosenEffect = EFFECTS.none;
  updateSliderVisibility();
};

const initEffects = () => {
  if (!sliderElement.noUiSlider) {
    noUiSlider.create(sliderElement, {
      range: { min: 0, max: 100 },
      start: 100,
      step: 1,
      connect: 'lower',
    });
  }

  updateSliderVisibility();

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    effectLevelInput.value = sliderValue;

    if (chosenEffect !== EFFECTS.none) {
      previewImage.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
    }
  });

  effectsList.addEventListener('change', onEffectsListChange);
};

export { initEffects, resetEffects };
