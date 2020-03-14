const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }

const initiNavigateSet = () => {
  const header = document.querySelector('.header'),
        homeSection = document.getElementById('home'), 
        scrollPoint = document.getElementById('scroll-point'),
        navigationBlock = header.querySelector('.navigation'),
        navigationItemsList = navigationBlock.querySelectorAll('.navigation__link');

  const clearActivity = () => {
    [...navigationItemsList].forEach(element => {
      element.classList.remove('navigation__link--active');
    })
  };

  const slowMotion = (section) => {
    const docLength = 
    section.before(scrollPoint);

    if (section) {
        scrollPoint.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        })
      }

    homeSection.before(scrollPoint)
  }
  
  header.addEventListener('click', (event) => {
    const target = event.target;

    const isTargetLink = target.classList.contains('navigation__link'),
          isTargetLogo = target.classList.contains('header__logo')

    if (isTargetLink) {
      event.preventDefault();
      const blockId = target.getAttribute('href').substr(1)

      if (target.classList.contains('navigation__link')) {
        clearActivity();
        target.classList.add('navigation__link--active');
      }

      const targetSection = document.getElementById(blockId);
      slowMotion(targetSection);
      
    }
    
    if (isTargetLogo) {
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


const startSlider = () => {
  const slider = document.querySelector('.slider'),
        sliderScreensList = slider.querySelectorAll('.image');
  
  slider.addEventListener('click', (event) => {
    const target = event.target,
          isSliderButton = target.closest('.slider__button'),
          isScreen = target.closest('.image__screen');

    if (isSliderButton) {
      sliderScreensList.forEach(image => {
        image.classList.toggle('image--hidden');
      })

      slider.classList.toggle('slider--blue');
    }

    if (isScreen) {
      const phone = target.closest('.image__phone');
      phone.classList.toggle('image__phone--off');
    }
    
  });
}

const initTagFilter = () => {
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



const initSendForm = () => {
  const formSingolo = document.querySelector('.get-quote__form');
  const sendForm = new FormData(formSingolo);

  formSingolo.addEventListener('submit', (event) => {
    event.preventDefault();
    const sendForm = new FormData(formSingolo);

    console.log(sendForm);

    fetch('https://cors-anywhere.herokuapp.com/http://singolo.lokalin.ru/mail.php', {
      method: 'POST',
      headers: {
    	  'Content-Type': 'multipart/form-data',
      },
      body: sendForm
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
      })
  });
}


ready(() => { 
  initiNavigateSet();
  startSlider();
  initTagFilter();
  initSendForm();
})