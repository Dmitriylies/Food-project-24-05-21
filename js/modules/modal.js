function openModal(modalSelector, modalTimerId) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   document.body.style.overflow = "hidden";

   console.log(modalTimerId);
   
   if(modalTimerId) {
      clearInterval(modalTimerId);
   }
  }

  function closeModal(modalSelector) {
     const modal = document.querySelector(modalSelector);
     modal.classList.remove('show');
   modal.classList.add('hide');
   document.body.style.overflow = "";
}

function modal(triggerSelector, modalSelector, modalTimerId) {
     //modal

     const buttons = document.querySelectorAll(triggerSelector),
     modal = document.querySelector(modalSelector);

   buttons.forEach((i)=> {
      i.addEventListener('click', () => openModal(modalSelector, modalTimerId));
   });

   modal.addEventListener('click', (event) => {
      const target = event.target;
      if (target === modal || target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
      }
   });
   document.addEventListener('keydown', (event) => {
      if (event.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });
   //запуск в конц страницы
   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
         openModal(modalSelector, modalTimerId);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

window.addEventListener('scroll', showModalByScroll);
}
export default  modal;

export {closeModal};
export {openModal};
