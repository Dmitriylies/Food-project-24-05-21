import {openModal, closeModal} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId) {
   //forms

   const forms = document.querySelectorAll(formSelector);
   const message = {
         loading: 'img/form/spinner.svg',
         success: 'Спасибо, мы с вами скоро свяжемся!',
         failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => {
       bindPostData(item);
   });



   function bindPostData(form) {
       form.addEventListener('submit', (e) => {
           e.preventDefault();

           const statusMessage = document.createElement('img');
           statusMessage.src = message.loading;
           statusMessage.style.cssText =`
               display: block;
               margin: 0 auto;
           `;
           
           form.insertAdjacentElement('afterend', statusMessage);
           
           const formData = new FormData(form);

           const object = {};
           formData.forEach(function(value, key){
               object[key] = value;
           });

           const json = JSON.stringify(Object.fromEntries(formData.entries()));


           postData('http://localhost:3000/requests', json)
               .then(data => {
                   showThanksModal(message.success);
                   statusMessage.remove();
               })
               .catch(() => {
                   showThanksModal(message.failure);
               })
               .finally(() => {
                   form.reset();
           });
       });
   }

   function showThanksModal(message) {
       const prevModalDiaog = document.querySelector('.modal__dialog');
       
       prevModalDiaog.classList.add('hide');
       prevModalDiaog.classList.remove('show');
       openModal('.modal', modalTimerId);

       const thanksModal = document.createElement('div');
       thanksModal.classList.add('modal__dialog');
       thanksModal.innerHTML = `
       <div class="modal__content">
           <div data-close class="modal__close">&times;</div>
           <div class="modal__title">${message}</div>
       </div>
       `;

       document.querySelector('.modal').append(thanksModal);
           setTimeout(() => {
           thanksModal.remove();
           prevModalDiaog.classList.add('show');
           prevModalDiaog.classList.remove('hide');
           closeModal('.modal');
       }, 4000);
   }

}
export default  forms;
