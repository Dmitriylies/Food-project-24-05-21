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

            days.innerHTML = t.days;
            hours.innerHTML = t.hours;
            minutes.innerHTML = t.minutes;
            seconds.innerHTML = t.seconds;
            console.log(t.total);
            
            if (t.total <= 0) {
            clearInterval(timeInterval);
            }
        }
    }
    getElrmrnts('.timer', time);

    //modal

    const buttons = document.querySelectorAll('[data-modal]'),
          exit = document.querySelector('[data-close]'),
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
        if (target === modal || target === exit) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (event) => {
        if (event.code === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });
//авто запуск через время 
    const modalTimerId = setTimeout(openModal, 9000);

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

    const newCard = new CardCreator(
        '"img/tabs/vegy.jpg"',
        '"vegy"',
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        229,
        '.menu .container'
    ).render();

    const newCard1 = new CardCreator(
        '"img/tabs/elite.jpg"',
        '"elite"',
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        550,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    const newCard2 = new CardCreator(
        '"img/tabs/post.jpg"',
        '"post"',
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        430,
        '.menu .container',
        'menu__item',
        'big'
    ).render();

    //forms

    const forms = document.querySelectorAll('form');

    function postData(form) {
        form.addEventListener('sibmit', (e) => {
            e.prevenDefault();

            const request = new XMLHttpRequest();
            request.open('POST', 'server.php');

            request.setRequestHeader('Content-type', 'multipart/form-data');
            const formData = new FormData(form);

            request.send(formData);

            request.addEventListener('load', () => {
                if(request.status === 200) {
                    console.log(request.response);
                    
                }
            });
        });
    }
 });


 