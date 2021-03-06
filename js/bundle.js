/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const cards = __webpack_require__(/*! ./cards */ "./js/modules/cards.js");

function calc() {
    //* калькулятор

    const result = document.querySelector('.calculating__result span');
        
    let sex, height, weight, age, ratio;

    if (localStorage.getItem('sex')){
         sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', 'female');
    }

    if (localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
       localStorage.setItem('ratio', 1.375);
   }

   function initLocalSetings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.classList.remove(activeClass);
            if (elem.getAttribute('id') == localStorage.getItem('sex')){
                elem.classList.add(activeClass);
            }
            if (elem.getAttribute('data-ratio') == localStorage.getItem('ratio')){
                elem.classList.add(activeClass);
            }
        });
   }


    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio) {
            console.log(result);
            result.textContent = '____';
            return; //прервал функцию.
        }
        if (sex === 'female') {
            result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio) ;
        } else {
            result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
        }
    }

    function getStaticInformation(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(elem => {
            elem.addEventListener('click', (e)=> {
                if(e.target.getAttribute('data-ratio')) {
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', e.target.getAttribute('id'));
                }
    
                console.log(ratio, sex);
                
                elements.forEach(elem => {
                    elem.classList.remove(activeClass);
                });
                e.target.classList.add(activeClass);
                calcTotal();
            });
        });
    }

    function getDynamicImformation(selector) {
        const input = document.querySelector(selector);

        input.addEventListener('input', () =>{

            if (input.value.match(/\D/g)){
                input.style.border = '1px solid red';
            } else {
                input.style.border = 'none';
            }

            switch(input.getAttribute('id')) {
                case 'height':
                    height = +input.value;
                    break;
                case 'weight':
                    weight = +input.value;
                    break;
                case 'age':
                    age = +input.value;
                    break;
            }
            calcTotal();
        });
    }
    
    calcTotal();

    initLocalSetings('#gender div', 'calculating__choose-item_active');
    initLocalSetings('.calculating__choose_big div', 'calculating__choose-item_active');
 

    getStaticInformation('#gender div', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

    getDynamicImformation('#height');
    getDynamicImformation('#weight');
    getDynamicImformation('#age');
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");


function cards() {
    //карточки через классы
    class CardCreator{
        constructor(img, alt, title, descr, price, parent, ...classes) {
            this.img = img;
            this.alt = alt;
            this.title = title;
            this.descr = descr;
            this.price = price;
            this.parent = document.querySelector(parent);
            this.classes = classes;
        }

        render(){
            const card = document.createElement('div');
            if (this.classes.length === 0){
                this.card = 'menu__item';
                card.classList.add(this.card);
            } else {
                this.classes.forEach(className => card.classList.add(className));
            }

            card.innerHTML = `
                    <img src=${this.img} alt=${this.alt}>
                    <h3 class="menu__item-subtitle">${this.title}</h3>
                    <div class="menu__item-descr">${this.descr}</div>
                    <div class="menu__item-divider"></div>
                    <div class="menu__item-price">
                        <div class="menu__item-cost">Цена:</div>
                        <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                    </div>
            `;
            this.parent.append(card);
           //document.querySelector('.menu .container').append(card);-тоже самое
        }
    }

 

    (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getResourse)('http://localhost:3000/menu')
        .then(data => {
            data.forEach(({img, altimg, title, descr, price}) => {
                new CardCreator(img, altimg, title, descr, price, '.menu .container').render();
            });
        });
    // axios.get('http://localhost:3000/menu')
    //     .then(data => {
    //          data.data.forEach(({img, altimg, title, descr, price}) => {
    //              new CardCreator(img, altimg, title, descr, price, '.menu .container').render();
    //          });
    //         });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/forms.js":
/*!*****************************!*\
  !*** ./js/modules/forms.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../services/services */ "./js/services/services.js");



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


           (0,_services_services__WEBPACK_IMPORTED_MODULE_1__.postData)('http://localhost:3000/requests', json)
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
       (0,_modal__WEBPACK_IMPORTED_MODULE_0__.openModal)('.modal', modalTimerId);

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
           (0,_modal__WEBPACK_IMPORTED_MODULE_0__.closeModal)('.modal');
       }, 4000);
   }

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (forms);


/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "closeModal": () => (/* binding */ closeModal),
/* harmony export */   "openModal": () => (/* binding */ openModal)
/* harmony export */ });
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
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);





/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {
     
    // слайдер 

    const slides = document.querySelectorAll('.offer__slide'),
          prev = document.querySelector('.offer__slider-prev'),
          next = document.querySelector('.offer__slider-next'),
          total = document.querySelector('#total'),
          current = document.querySelector('#current'),
          slidesWrapper = document.querySelector('.offer__slider-wrapper'),
          slidesField = document.querySelector('.offer__slider-inner'),
          width = window.getComputedStyle(slidesWrapper).width;
     let sliderIndex = 1;
     let offset = 0;

     const sliderTranslate = function() {
        slidesField.style.transform = `translateX(-${offset}px)`;
    };
    function counterZero(){
        if (sliderIndex < 10) {
            current.textContent = `0${sliderIndex}`;
        } else {
            current.textContent = sliderIndex;
        }
    }
//!4 инициализалия функции счеткчика, чтобы при запуске сразу коректно отрабатывал.
     if (slides.length < 10) {
         total.textContent = `0${slides.length}`;
         current.textContent = `0${sliderIndex}`;
     } else {
         total.textContent = slides.length;
         current.textContent = sliderIndex;
     }
//!1
     slidesField.style.width = 100 * slides.length + '%';

     slidesField.style.display = 'flex';
     slidesField.style.transition = '0.5s all';

     slidesWrapper.style.overflow = 'hidden';  

     slides.forEach(slide => {
         slide.style.width = width;
     });
//! new one
function StringtoNum(string) {
    const num = +string.replace(/\D/g, '');
    return num;
 }
 //!2
     next.addEventListener('click', ()=> {

        if (offset == StringtoNum(width) * (slides.length - 1)) { //'500px'
            offset = 0;
        } else {
            offset += StringtoNum(width);
        }
        sliderTranslate();
//!</2>
//!5
         if (sliderIndex == slides.length) {
             sliderIndex = 1;
         } else {
            sliderIndex++;
         }

         counterZero();
         indicatorsLight();
    });
//!3
     prev.addEventListener('click', ()=> {
        if (offset == 0) { //'500px'
            offset = StringtoNum(width) * (slides.length - 1);
        } else {
            offset -= StringtoNum(width);
        }
        sliderTranslate();
//!<\3>
//!6
         if (sliderIndex == 1) {
            sliderIndex = slides.length;
        } else {
           sliderIndex--;
        }
        
        counterZero();
        indicatorsLight();
     });
//dots + обвернуты некоторые операции в функции.
     const dots = document.querySelector('.offer__slider');
     const dotsContainer = document.createElement('ol');  
     const indicators = [];

     function indicatorsLight(){
        indicators.forEach(dot => dot.style.opacity = '50%');
        indicators[sliderIndex - 1].style.opacity = '1';
     }

     dots.style.position = 'relative';
     dotsContainer.classList.add('carousel-indicators');
     dots.append(dotsContainer);
     for(let i = 0; i < slides.length; i++) {
        const dot = document.createElement('li');
        dot.classList.add('dot');
        dot.setAttribute('data-slide-to', i + 1);

        dotsContainer.append(dot);

        if( i == 0) {
            dot.style.opacity = '1';
        }
        indicators.push(dot);
     }
     
     indicators.forEach(dot => {
        dot.addEventListener('click', (e)=> {
            const slideTo = e.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            
            offset = StringtoNum(width) * (slideTo - 1);
            
            sliderTranslate();
            counterZero();
            indicatorsLight();
        });
     });    
     //*  версия кода из урока с прописаными стилями в js 
     // const slider = document.querySelector('.offer__slider');

//      slider.style.position = 'relative';

//      const dots = document.createElement('ol'),
//            indicators = [];

//      dots.classList.add('carousel-indicators');
//      dots.style.cssText = `
//         position: absolute;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         z-index: 15;
//         display: flex;
//         justify-content: center;
//         margin-right: 15%;
//         margin-left: 15%;
//         list-style: none;
//      `;
// slider.append(dots);

// for (let i = 0; i < slides.length; i++) {
//     const dot = document.createElement('li');
//     dot.setAttribute('data-slide-to', i + 1);
//     dot.style.cssText =`
//     box-sizing: content-box;
//     flex: 0 1 auto;
//     width: 30px;
//     height: 6px;
//     margin-right: 3px;
//     margin-left: 3px;
//     cursor: pointer;
//     background-color: #fff;
//     background-clip: padding-box;
//     border-top: 10px solid transparent;
//     border-bottom: 10px solid transparent;
//     opacity: .5;
//     transition: opacity .6s ease;
//     `;
//     if (i == 0) {
//         dot.style. opacity = '1';
//     }
//     dots.append(dot);
//     indicators.push(dot);
// }
//     // работоспособность прописана в next и prev
//     indicators.forEach(dot => {
//         dot.addEventListener('click', (e)=> {
//             const slideTo = e.target.getAttribute('data-slide-to');

//             sliderIndex = slideTo;
//            offset = +width.slice(0, width.length - 2) * (slideTo - 1);

//            slidesField.style.transform = `translateX(-${offset}px)`;

//            if (sliderIndex < 10) {
//                current.textContent = `0${sliderIndex}`;
//            } else {
//               current.textContent = sliderIndex;
//            }
//            indicators.forEach(dot => dot.style.opacity = '50%');
//            indicators[sliderIndex - 1].style.opacity = '1';
//         });
//     });
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabsSrlrctor, tabsContentSelector, tabsParentSelector, activeClass) {

    const tabParent = document.querySelector(tabsParentSelector),
          tabs = tabParent.querySelectorAll(tabsSrlrctor);
    const tabContent = document.querySelectorAll(tabsContentSelector);

    function hideTabCntent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove(activeClass);
        });
    }

    function showTabCntent(i = 0) {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');

        tabs[i].classList.add(activeClass);
    }

    hideTabCntent();
    showTabCntent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains(tabsSrlrctor.slice(1))) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabCntent();
                    showTabCntent(i);  
                }
            });
        }
    });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const modal = __webpack_require__(/*! ./modal */ "./js/modules/modal.js");

function timer(id, deadLine) {

    function getTimeRemainding(endtime) {
        const remaindDate = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(remaindDate / (1000 * 60 * 60 * 24)),
            hours = Math.floor(remaindDate / (1000 * 60 * 60)% 24),
            minutes = Math.floor(remaindDate / (1000 / 60 )% 60),
            seconds = Math.floor((remaindDate / 1000)% 60);
        
        return {
            'total': remaindDate,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else if(num < 0){
            return `00`;
        } else {
            return num;
        }
    }
    
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days'), 
            hours = timer.querySelector('#hours'), 
            minutes = timer.querySelector('#minutes'), 
            seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(updateClock, 1000);

        updateClock();

        function updateClock() {
            const t = getTimeRemainding(endtime);

            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);
            //console.log(t.total);
            
            if (t.total <= 0) {
            clearInterval(timeInterval);
            }
        }
    }
    
    setClock(id, deadLine);

}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "postData": () => (/* binding */ postData),
/* harmony export */   "getResourse": () => (/* binding */ getResourse)
/* harmony export */ });
const postData = async (url, data) => {
    const res = await fetch(url, {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: data
    });

    return await res.json();
};

const getResourse = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, satatus: ${res.status}`);
    }

    return await res.json();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
/* harmony import */ var _modules_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/forms */ "./js/modules/forms.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");











document.addEventListener('DOMContentLoaded', () => {

    //авто запуск через время 
    const modalTimerId = setTimeout(() => (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.openModal)('.modal', modalTimerId), 50000);

    (0,_modules_tabs__WEBPACK_IMPORTED_MODULE_0__.default)('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    (0,_modules_timer__WEBPACK_IMPORTED_MODULE_1__.default)('.timer', '2021-07-05');
    (0,_modules_calc__WEBPACK_IMPORTED_MODULE_2__.default)();
    (0,_modules_forms__WEBPACK_IMPORTED_MODULE_3__.default)('form', modalTimerId);
    (0,_modules_modal__WEBPACK_IMPORTED_MODULE_4__.default)('[data-modal]','.modal', modalTimerId);
    (0,_modules_slider__WEBPACK_IMPORTED_MODULE_5__.default)();
    (0,_modules_cards__WEBPACK_IMPORTED_MODULE_6__.default)();
});

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map