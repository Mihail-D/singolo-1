const ready = (callback) => {
    if (document.readyState != "loading") callback();
    else document.addEventListener("DOMContentLoaded", callback);
  }


const tagActiveSet = () => {
  const tagsFromPortgolio = document.querySelectorAll('.portfolio__tag'),
        tagsWrapper = document.querySelector('.portfolio__tags-wrapper');

  tagsWrapper.addEventListener('click', (event) => {
    const target = event.target;

    if (target.classList.contains('portfolio__tag')) {
      [...tagsFromPortgolio].forEach(element => {
        element.classList.remove('portfolio__tag--active');
      })

      target.classList.add('portfolio__tag--active');
    }
  })
}

ready(() => { 
  tagActiveSet();
})