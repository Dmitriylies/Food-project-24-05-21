<?php
$_POST = json_decode(file_get_contents("php://input"), true);
echo var_dump($_POST);

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


'use strict';

document.addEventListener('DOMContentLoaded', () => {

    const tabParent = document.querySelector('.tabheader__items'),
          tabs = tabParent.querySelectorAll('.tabheader__item');
    const tabContent = document.querySelectorAll('.tabcontent');

    function hideTabCntent() {
        tabContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabCntent(i = 0) {
        tabContent[i].classList.add('show');
        tabContent[i].classList.remove('hide');

        tabs[i].classList.add('tabheader__item_active');
    }

    hideTabCntent();
    showTabCntent();

    tabParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideTabCntent();
                    showTabCntent(i);  
                }
            });
        }
    });

    //Timer
    const time = '2021-06-05';

    function getDateRemainding(endtime) {
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
    
    function getElrmrnts(selector, endtime) {
        const timer = document.querySelector(selector);
        const days = timer.querySelector('#days'), 
              hours = timer.querySelector('#hours'), 
              minutes = timer.querySelector('#minutes'), 
              seconds = timer.querySelector('#seconds');
        const timeInterval = setInterval(setDate, 1000);

        setDate();
        function setDate() {
            const t = getDateRemainding(endtime);

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
    getElrmrnts('.timer', time);

    function getZero(num) {
        if (num >= 0 && num <10) {
            return `0${num}`;
        } else if(num < 0){
            return `00`;
        } else {
            return `0${num}`;
        }
    }
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

    const getResourse = async (url, data) => {
        const res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, satatus: ${res.status}`);
        }

        return await res.json();
    };

    // getResourse('http://localhost:3000/menu')
    //     .then(data => {
    //         data.forEach(({img, altimg, title, descr, price}) => {
    //             new CardCreator(img, altimg, title, descr, price, '.menu .container').render();
    //         });
    //     });
    axios.get('http://localhost:3000/menu')
        .then(data => {
             data.data.forEach(({img, altimg, title, descr, price}) => {
                 new CardCreator(img, altimg, title, descr, price, '.menu .container').render();
             });
            });
    

    //forms

    const forms = document.querySelectorAll('form');
    const message = {
          loading: 'img/form/spinner.svg',
          success: 'Спасибо, мы с вами скоро свяжемся!',
          failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

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
                    console.log(data);
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
        openModal();

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
            closeModal();
        }, 4000);
    }

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
//!2
     next.addEventListener('click', ()=> {

        if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) { //'500px'
            offset = 0;
        } else {
            offset += +width.slice(0, width.length - 2);
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
            offset = +width.slice(0, width.length - 2) * (slides.length - 1);
        } else {
            offset -= +width.slice(0, width.length - 2);
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
//dots
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
     console.log(indicators);
     
     indicators.forEach(dot => {
        dot.addEventListener('click', (e)=> {
            const slideTo = e.target.getAttribute('data-slide-to');
            sliderIndex = slideTo;
            console.log(slideTo);
            
            offset = +width.slice(0, width.length - 2) * (slideTo - 1);
            console.log(`offset ${offset}`);
            
            sliderTranslate();
            counterZero();
            indicatorsLight();
        });
     });    
    //  showSlides(sliderIndex);
    // if (slides.length < 10) {
    //     total.textContent = `0${slides.length}`;
    // } else {
    //     total.textContent = slides.length;
    // }
    //  function showSlides(n) {
    //     if (n > slides.length) {
    //         sliderIndex = 1;
    //     }
    //     if (n < 1) {
    //         sliderIndex = slides.length;
    //     }
    //     slides.forEach(item => item.style.display = 'none');
    //     slides[sliderIndex - 1].style.display = 'block';
    //     if (slides.length < 10) {
    //         current.textContent = `0${sliderIndex}`;
    //     } else {
    //         current.textContent = sliderIndex;
    //     }
    //  }
    // function plusSlides(n) {
    //    showSlides(sliderIndex += n);
    // }

    // prev.addEventListener('click', ()=> {
    //     plusSlides(-1);   

    // });
    // next.addEventListener('click', ()=> {
    //     plusSlides(1);
    // });
});
