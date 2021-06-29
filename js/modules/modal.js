function modal() {
     //modal

     const buttons = document.querySelectorAll('[data-modal]'),
     modal = document.querySelector('.modal');

function openModal() {
 modal.classList.add('show');
 modal.classList.remove('hide');
 document.body.style.overflow = "hidden";
 clearInterval(modalTimerId);
 
}

buttons.forEach((i)=> {
   i.addEventListener('click', openModal);
});

function closeModal() {
   modal.classList.remove('show');
   modal.classList.add('hide');
   document.body.style.overflow = "";
}

modal.addEventListener('click', (event) => {
   const target = event.target;
   if (target === modal || target.getAttribute('data-close') == '') {
       closeModal();
   }
});
document.addEventListener('keydown', (event) => {
   if (event.code === 'Escape' && modal.classList.contains('show')) {
       closeModal();
   }
});
//авто запуск через время 
const modalTimerId = setTimeout(openModal, 50000);
//запуск в конц страницы
function showModalByScroll() {
   if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
       openModal();
       window.removeEventListener('scroll', showModalByScroll);
   }
}

window.addEventListener('scroll', showModalByScroll);
}
module.exports = modal;