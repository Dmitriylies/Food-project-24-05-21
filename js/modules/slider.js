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
module.exports = slider;