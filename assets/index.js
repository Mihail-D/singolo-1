const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

const navigateSetActivity = () => {
  const navigationBlock = document.querySelector('.navigation'),
        navigationItemsList = navigationBlock.querySelectorAll('.navigation__link');

  const clearActivity = () => {
    [...navigationItemsList].forEach(element => {
      element.classList.remove('navigation__link--active');
    })
  };

  navigationBlock.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('navigation__link')) {
      clearActivity();
      target.classList.add('navigation__link--active');
    }
  });
}


const sliderGenerator = () => {
  const slider = document.querySelector('.slider'),
        imageSection = slider.querySelectorAll('.image__phone'),
        classColorScreen = ['image__phone--yellow', 'image__phone--blue'];
  
  const createNewPhons = () => {
    [...imageSection].forEach(element => {
      if (element.classList.contains('image__phone--blue')) {
        element.classList.remove('image__phone--blue');
        element.classList.add('image__phone--yellow');
      } else {
        element.classList.remove('image__phone--yellow');
        element.classList.add('image__phone--blue');
      }
      
    })
  };
  
  slider.addEventListener('click', (event) => {
    const target = event.target.closest('.slider__button');

    if (target) {
      createNewPhons();
    }
  });
}


ready(() => { 
  navigateSetActivity();
  sliderGenerator();
})