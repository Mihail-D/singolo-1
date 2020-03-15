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
          isScreen = target.closest('.image__phone-wrapper');

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
  const portfolio = document.getElementById('portfolio'),
        tagsFromPortfolio = portfolio.querySelectorAll('.portfolio__tag'),
        tagsWrapper = portfolio.querySelector('.portfolio__tags-wrapper'),
        imagesWrapper = portfolio.querySelector('.portfolio__images-wrapper'),
        imagesList = portfolio.querySelectorAll('.portfolio__image');

  portfolio.addEventListener('click', event => {
    const target = event.target,
          isTargetTag = target.classList.contains('portfolio__tag'),
          isTargetImage = target.classList.contains('portfolio__image');


    if (isTargetTag) {
      [...tagsFromPortfolio].forEach(element => {
        element.classList.remove('portfolio__tag--active');
      })

      target.classList.add('portfolio__tag--active');
      const wrapperFragment = document.createDocumentFragment();

      [...imagesList].forEach(image => {
        if (image.dataset.genre === target.value) {
          wrapperFragment.prepend(image);
        } else {
          wrapperFragment.append(image);
        }
      })

      imagesWrapper.appendChild(wrapperFragment);
    }

    if (isTargetImage) {
      [...imagesList].forEach(image => {
        image.classList.remove('portfolio__image--active');
      })

      target.classList.add('portfolio__image--active');
    }
  })
}


const initSendForm = () => {
  const formSingolo = document.querySelector('.get-quote__form');
  const sendForm = new FormData(formSingolo);

  const okMessage = document.querySelector('.modal'),
        messageTopic = okMessage.querySelector('.modal__subject'),
        messageText = okMessage.querySelector('.modal__description'),
        messageButton = okMessage.querySelector('.modal__button-ok');

  this.modalClickEvent = event => {
    const target = event.target,
          isTargetModalOverlay = target.classList.contains('modal'),
          isTargetButtonOk = target.classList.contains('modal__button-ok');

    if (isTargetButtonOk || isTargetModalOverlay) {
      okMessage.classList.remove('modal--open');
      okMessage.removeEventListener('click', this.modalClickEvent);
    }
  }

  formSingolo.addEventListener('submit', (event) => {
    event.preventDefault();

    const sendForm = new FormData(formSingolo),
          subject = formSingolo.querySelector('input[name=subject]'),
          message = formSingolo.querySelector('textarea[name=message]');

    messageTopic.innerText = subject.value === '' ? 'Без темы' : `Тема: ${subject.value}`;
    messageText.innerText  = message.value === '' ? 'Без описания' : `Описание: ${message.value}`;

    okMessage.addEventListener('click', this.modalClickEvent);
    okMessage.classList.add('modal--open');
  });
}


ready(() => { 
  initiNavigateSet();
  startSlider();
  initTagFilter();
  initSendForm();
})