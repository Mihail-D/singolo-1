const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

const navigateSetActivity = () => {
  const header = document.querySelector('.header'),
        navigationBlock = header.querySelector('.navigation')
        navigationItemsList = navigationBlock.querySelectorAll('.navigation__link');

  const clearActivity = () => {
    [...navigationItemsList].forEach(element => {
      element.classList.remove('navigation__link--active');
    })
  };

  const slowMotion = (section) => {
    if (section) {
        section.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }
  }
  
  header.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('navigation__link')) {
      event.preventDefault();
      const blockId = target.getAttribute('href').substr(1)

      if (target.classList.contains('navigation__link')) {
        clearActivity();
        target.classList.add('navigation__link--active');
      }

      const targetSection = document.getElementById(blockId);
      slowMotion(targetSection);
      
    } else if (target.classList.contains('header__logo')) {
      event.preventDefault();
      const blockId = target.getAttribute('href').substr(1)

      clearActivity();
      const navigateHomeLink = navigationBlock.querySelector('a[href="#home"]');
      navigateHomeLink.classList.add('navigation__link--active');

      const targetSection = document.getElementById(blockId);
      slowMotion(targetSection);
    }

  });
}


const sliderStart = () => {
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

const tagActiveSet = () => {
  const tagsFromPortfolio = document.querySelectorAll('.portfolio__tag'),
        tagsWrapper = document.querySelector('.portfolio__tags-wrapper');

  tagsWrapper.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('portfolio__tag')) {
      [...tagsFromPortfolio].forEach(element => {
        element.classList.remove('portfolio__tag--active');
      })

      target.classList.add('portfolio__tag--active');
    }
  })
}


ready(() => { 
  navigateSetActivity();
  sliderStart();
  tagActiveSet();
})