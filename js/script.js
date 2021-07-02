'use strict';

import tabs from './modules/tabs';
import timer from './modules/timer';
import calc from './modules/calc';
import forms from './modules/forms';
import modal from './modules/modal';
import slider from './modules/slider';
import cards from './modules/cards';
import {openModal} from './modules/modal';

document.addEventListener('DOMContentLoaded', () => {

    //авто запуск через время 
    const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

    tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
    timer('.timer', '2021-07-05');
    calc();
    forms('form', modalTimerId);
    modal('[data-modal]','.modal', modalTimerId);
    slider({
        container: '.offer__slider',
        slide: '.offer__slide',
        nextArrow: '.offer__slider-next',
        prevArrow: '.offer__slider-prev',
        totalCounter: '#total',
        currentCounter: '#current',
        wrapper: '.offer__slider-wrapper',
        field: '.offer__slider-inner'
    });
    cards();
});
